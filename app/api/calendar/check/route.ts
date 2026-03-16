import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabaseServer";
import {
  parseTimeTo24h,
  toISODateTime,
  generateDaySlots,
  checkGoogleCalendarConflict,
  type TimeSlotResult,
} from "@/lib/googleCalendar";

interface CalendarCheckRequest {
  date: string; // "YYYY-MM-DD"
  time: string; // "HH:MM" or human-readable like "9:00 AM"
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

    // Normalize request time to 24h for consistent comparison and API calls
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
    const nowMs = Date.now();

    while (suggestions.length < 3 && daysChecked < 14) {
      const daySlots = generateDaySlots(checkDate, openTime, closeTime);

      for (const slot of daySlots) {
        if (suggestions.length >= 3) break;

        // Skip the originally conflicting slot
        if (checkDate === date && parseTimeTo24h(slot.time) === time24h) continue;

        // Skip slots that are in the past
        const slotStartMs = new Date(slot.start + "Z").getTime();
        if (slotStartMs < nowMs) continue;

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
