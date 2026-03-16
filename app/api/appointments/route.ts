import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { resend } from "@/lib/resend";
import { createGoogleCalendarEvent } from "@/lib/googleCalendar";

interface AppointmentRequest {
  name: string;
  phone: string;
  email?: string;
  preferred_date: string;
  preferred_time: string;
  reason: string;
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
    const calendarId = process.env.GOOGLE_CALENDAR_ID;
    const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;

    let googleEventId: string | null = null;
    if (calendarId && serviceAccountEmail && privateKey) {
      googleEventId = await createGoogleCalendarEvent({
        ...data,
        calendarId,
        serviceAccountEmail,
        privateKey,
      });
    }

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
