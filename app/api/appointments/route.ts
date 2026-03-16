import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { resend } from "@/lib/resend";

interface AppointmentRequest {
  name: string;
  phone: string;
  email?: string;
  preferred_date: string;
  preferred_time: string;
  reason: string;
}

/** Create a Google Calendar event using Service Account credentials. Returns the event ID or null. */
async function createGoogleCalendarEvent(appointment: AppointmentRequest): Promise<string | null> {
  const calendarId = process.env.GOOGLE_CALENDAR_ID;
  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;

  if (!calendarId || !serviceAccountEmail || !privateKey) {
    return null;
  }

  try {
    const now = Math.floor(Date.now() / 1000);
    const header = { alg: "RS256", typ: "JWT" };
    const payload = {
      iss: serviceAccountEmail,
      scope: "https://www.googleapis.com/auth/calendar",
      aud: "https://oauth2.googleapis.com/token",
      exp: now + 3600,
      iat: now,
    };

    const base64Header = Buffer.from(JSON.stringify(header)).toString("base64url");
    const base64Payload = Buffer.from(JSON.stringify(payload)).toString("base64url");
    const signingInput = `${base64Header}.${base64Payload}`;

    const { createSign } = await import("crypto");
    const sign = createSign("RSA-SHA256");
    sign.update(signingInput);
    const cleanKey = privateKey.replace(/\\n/g, "\n");
    const signature = sign.sign(cleanKey, "base64url");
    const jwt = `${signingInput}.${signature}`;

    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
        assertion: jwt,
      }),
    });

    if (!tokenRes.ok) return null;
    const { access_token } = await tokenRes.json();

    // Parse preferred_time to 24h for start/end dateTime fields
    const ampmMatch = appointment.preferred_time.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
    let startTime24h = "09:00";
    if (ampmMatch) {
      let hours = parseInt(ampmMatch[1]);
      const minutes = ampmMatch[2];
      const meridiem = ampmMatch[3].toUpperCase();
      if (meridiem === "PM" && hours !== 12) hours += 12;
      if (meridiem === "AM" && hours === 12) hours = 0;
      startTime24h = `${hours.toString().padStart(2, "0")}:${minutes}`;
    }

    const [sh, sm] = startTime24h.split(":").map(Number);
    const endTime24h = `${(sh + 1).toString().padStart(2, "0")}:${sm.toString().padStart(2, "0")}`;

    const eventRes = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          summary: `Dental Appointment - ${appointment.name}`,
          description: `Patient: ${appointment.name}\nPhone: ${appointment.phone}${appointment.email ? `\nEmail: ${appointment.email}` : ""}\nReason: ${appointment.reason}`,
          start: {
            dateTime: `${appointment.preferred_date}T${startTime24h}:00`,
            timeZone: "America/New_York",
          },
          end: {
            dateTime: `${appointment.preferred_date}T${endTime24h}:00`,
            timeZone: "America/New_York",
          },
        }),
      }
    );

    if (!eventRes.ok) return null;
    const eventData = await eventRes.json();
    return eventData.id || null;
  } catch {
    return null; // Fail silently — calendar is optional
  }
}

export async function POST(request: Request) {
  try {
    const data: AppointmentRequest = await request.json();

    // Check Google Calendar for conflicts before saving
    const calendarCheckUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/calendar/check`;
    try {
      const calendarRes = await fetch(calendarCheckUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: data.preferred_date,
          time: data.preferred_time,
        }),
      });

      if (calendarRes.status === 409) {
        const conflictData = await calendarRes.json();
        return NextResponse.json(
          {
            error: "Time slot is not available",
            conflict: true,
            suggestions: conflictData.suggestions || [],
          },
          { status: 409 }
        );
      }
    } catch {
      // Calendar check unavailable — proceed with graceful degradation
      console.warn("Calendar conflict check skipped");
    }

    // Create Google Calendar event (optional — fails silently if not configured)
    const googleEventId = await createGoogleCalendarEvent(data);

    // Insert into Supabase
    const { data: appointment, error } = await supabase
      .from("appointments")
      .insert([
        {
          name: data.name,
          phone: data.phone,
          email: data.email || null,
          preferred_date: data.preferred_date,
          preferred_time: data.preferred_time,
          reason: data.reason,
          google_event_id: googleEventId,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase Error:", error);
      return NextResponse.json({ error: "Failed to save appointment" }, { status: 500 });
    }

    // Send notification email
    try {
      await resend.emails.send({
        from: "Premium Dental <onboarding@resend.dev>",
        to: ["hello@premiumdental.example.com"],
        subject: `New Appointment Request from ${data.name}`,
        html: `
          <h2>New Appointment Request</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          <p><strong>Email:</strong> ${data.email || "Not provided"}</p>
          <p><strong>Date:</strong> ${data.preferred_date}</p>
          <p><strong>Time:</strong> ${data.preferred_time}</p>
          <p><strong>Reason:</strong> ${data.reason}</p>
          ${googleEventId ? `<p><strong>Calendar Event ID:</strong> ${googleEventId}</p>` : ""}
        `,
      });
    } catch (emailError) {
      console.warn("Email notification failed:", emailError);
    }

    return NextResponse.json({ success: true, appointment });
  } catch (error) {
    console.error("Appointment API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
