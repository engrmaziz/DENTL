import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabaseServer";

interface TimeSlotResult {
  date: string;
  time: string;
  start: string; // ISO datetime
  end: string;   // ISO datetime
}

interface CalendarCheckRequest {
  date: string;   // "YYYY-MM-DD"
  time: string;   // "HH:MM" or human-readable like "9:00 AM"
}

/** Parse a time string to 24h format HH:MM */
function parseTimeTo24h(time: string): string {
  const ampmMatch = time.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (ampmMatch) {
    let hours = parseInt(ampmMatch[1]);
    const minutes = ampmMatch[2];
    const meridiem = ampmMatch[3].toUpperCase();
    if (meridiem === "PM" && hours !== 12) hours += 12;
    if (meridiem === "AM" && hours === 12) hours = 0;
    return `${hours.toString().padStart(2, "0")}:${minutes}`;
  }

  const h24Match = time.match(/^(\d{1,2}):(\d{2})$/);
  if (h24Match) {
    return `${h24Match[1].padStart(2, "0")}:${h24Match[2]}`;
  }

  // Handle ranges like "9:00 AM - 12:00 PM" - take first part
  const rangeMatch = time.match(/^(\d{1,2}:\d{2}\s*(?:AM|PM)?)/i);
  if (rangeMatch) {
    return parseTimeTo24h(rangeMatch[1].trim());
  }

  return "09:00"; // fallback
}

/** Convert date + 24h time string to ISO datetime string (no timezone suffix) */
function toISODateTime(date: string, time24h: string): string {
  return `${date}T${time24h}:00`;
}

/** Generate all 1-hour slots for a given date between open and close times */
function generateDaySlots(date: string, openTime: string, closeTime: string): TimeSlotResult[] {
  const slots: TimeSlotResult[] = [];
  const [openH, openM] = openTime.split(":").map(Number);
  const [closeH, closeM] = closeTime.split(":").map(Number);

  let currentH = openH;
  let currentM = openM;

  while (
    currentH < closeH ||
    (currentH === closeH && currentM < closeM)
  ) {
    const nextH = currentH + 1;
    const nextM = currentM;

    if (nextH > closeH || (nextH === closeH && nextM > closeM)) break;

    const startStr = `${currentH.toString().padStart(2, "0")}:${currentM.toString().padStart(2, "0")}`;
    const endStr = `${nextH.toString().padStart(2, "0")}:${nextM.toString().padStart(2, "0")}`;

    const ampm = currentH >= 12 ? "PM" : "AM";
    const h12 = currentH % 12 || 12;
    const displayTime = `${h12}:${currentM.toString().padStart(2, "0")} ${ampm}`;

    slots.push({
      date,
      time: displayTime,
      start: toISODateTime(date, startStr),
      end: toISODateTime(date, endStr),
    });

    currentH = nextH;
    currentM = nextM;
  }

  return slots;
}

/** Check Google Calendar for busy times using a Service Account JWT */
async function checkGoogleCalendarConflict(
  startISO: string,
  endISO: string,
  calendarId: string,
  serviceAccountEmail: string,
  privateKey: string
): Promise<boolean> {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const payload = {
    iss: serviceAccountEmail,
    scope: "https://www.googleapis.com/auth/calendar.readonly",
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

  if (!tokenRes.ok) {
    throw new Error("Failed to get Google access token");
  }

  const { access_token } = await tokenRes.json();

  const freeBusyRes = await fetch(
    "https://www.googleapis.com/calendar/v3/freeBusy",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        timeMin: startISO + "Z",
        timeMax: endISO + "Z",
        items: [{ id: calendarId }],
      }),
    }
  );

  if (!freeBusyRes.ok) {
    throw new Error("Failed to query Google Calendar FreeBusy");
  }

  const freeBusyData = await freeBusyRes.json();
  const busy: unknown[] = freeBusyData.calendars?.[calendarId]?.busy ?? [];
  return busy.length > 0;
}

export async function POST(request: NextRequest) {
  try {
    const body: CalendarCheckRequest = await request.json();
    const { date, time } = body;

    if (!date || !time) {
      return NextResponse.json(
        { error: "date and time are required" },
        { status: 400 }
      );
    }

    const calendarId = process.env.GOOGLE_CALENDAR_ID;
    const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;

    // Graceful degradation when Google Calendar is not configured
    if (!calendarId || !serviceAccountEmail || !privateKey) {
      return NextResponse.json({
        available: true,
        note: "Calendar integration not configured",
      });
    }

    // Fetch clinic open/close times from Supabase
    const supabaseServer = createServerSupabaseClient();
    const { data: settingsData } = await supabaseServer
      .from("clinic_settings")
      .select("key, value")
      .in("key", ["open_time", "close_time"]);

    const settingsMap: Record<string, string> = {};
    if (settingsData) {
      settingsData.forEach(({ key, value }: { key: string; value: string }) => {
        settingsMap[key] = value;
      });
    }
    const openTime = settingsMap["open_time"] || "08:00";
    const closeTime = settingsMap["close_time"] || "19:00";

    // Parse requested time to 24h and build start/end ISO strings
    const time24h = parseTimeTo24h(time);
    const startISO = toISODateTime(date, time24h);
    const [sh, sm] = time24h.split(":").map(Number);
    const endISO = toISODateTime(
      date,
      `${(sh + 1).toString().padStart(2, "0")}:${sm.toString().padStart(2, "0")}`
    );

    const hasConflict = await checkGoogleCalendarConflict(
      startISO,
      endISO,
      calendarId,
      serviceAccountEmail,
      privateKey
    );

    if (!hasConflict) {
      return NextResponse.json({ available: true });
    }

    // Find next 3 available slots across current and upcoming days
    const suggestions: TimeSlotResult[] = [];
    let checkDate = date;
    let daysChecked = 0;

    while (suggestions.length < 3 && daysChecked < 14) {
      const daySlots = generateDaySlots(checkDate, openTime, closeTime);

      for (const slot of daySlots) {
        if (suggestions.length >= 3) break;

        // Skip the originally requested (conflicting) slot
        if (checkDate === date && slot.time === time) continue;

        try {
          const slotConflict = await checkGoogleCalendarConflict(
            slot.start,
            slot.end,
            calendarId,
            serviceAccountEmail,
            privateKey
          );

          if (!slotConflict) {
            suggestions.push(slot);
          }
        } catch {
          // Skip slots that cannot be checked
        }
      }

      // Advance to next calendar day
      const nextDay = new Date(checkDate);
      nextDay.setDate(nextDay.getDate() + 1);
      checkDate = nextDay.toISOString().split("T")[0];
      daysChecked++;
    }

    return NextResponse.json(
      {
        available: false,
        conflict: true,
        requestedSlot: { date, time },
        suggestions,
      },
      { status: 409 }
    );
  } catch (error) {
    console.error("Calendar check error:", error);
    return NextResponse.json(
      { error: "Calendar check failed", available: true },
      { status: 500 }
    );
  }
}
