/**
 * Shared Google Calendar utilities: time parsing, JWT auth, and Calendar API helpers.
 * Used by both /api/calendar/check and /api/appointments.
 */

export interface TimeSlotResult {
  date: string;
  time: string;
  start: string; // ISO datetime (no TZ suffix)
  end: string;   // ISO datetime (no TZ suffix)
}

/** Parse any supported time string to 24-hour "HH:MM" format. */
export function parseTimeTo24h(time: string): string {
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

  // Handle ranges like "9:00 AM - 12:00 PM" — take the first part
  const rangeMatch = time.match(/^(\d{1,2}:\d{2}\s*(?:AM|PM)?)/i);
  if (rangeMatch) {
    return parseTimeTo24h(rangeMatch[1].trim());
  }

  return "09:00"; // fallback
}

/** Convert a date string and 24h time string to an ISO datetime string (no TZ suffix). */
export function toISODateTime(date: string, time24h: string): string {
  return `${date}T${time24h}:00`;
}

/** Generate all 1-hour slots for a given date between open and close times. */
export function generateDaySlots(
  date: string,
  openTime: string,
  closeTime: string
): TimeSlotResult[] {
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

/** Obtain a Google OAuth2 access token via Service Account JWT. */
export async function getGoogleAccessToken(
  serviceAccountEmail: string,
  privateKey: string,
  scope: string
): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const jwtPayload = {
    iss: serviceAccountEmail,
    scope,
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now,
  };

  const base64Header = Buffer.from(JSON.stringify(header)).toString("base64url");
  const base64Payload = Buffer.from(JSON.stringify(jwtPayload)).toString("base64url");
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
  return access_token as string;
}

/** Check Google Calendar FreeBusy API for conflicts in the given time window. */
export async function checkGoogleCalendarConflict(
  startISO: string,
  endISO: string,
  calendarId: string,
  serviceAccountEmail: string,
  privateKey: string
): Promise<boolean> {
  const accessToken = await getGoogleAccessToken(
    serviceAccountEmail,
    privateKey,
    "https://www.googleapis.com/auth/calendar.readonly"
  );

  const freeBusyRes = await fetch(
    "https://www.googleapis.com/calendar/v3/freeBusy",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
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

/** Create a Google Calendar event and return the event ID, or null on failure. */
export async function createGoogleCalendarEvent(params: {
  name: string;
  phone: string;
  email?: string;
  reason: string;
  preferred_date: string;
  preferred_time: string;
  calendarId: string;
  serviceAccountEmail: string;
  privateKey: string;
}): Promise<string | null> {
  try {
    const accessToken = await getGoogleAccessToken(
      params.serviceAccountEmail,
      params.privateKey,
      "https://www.googleapis.com/auth/calendar"
    );

    const startTime24h = parseTimeTo24h(params.preferred_time);
    const [sh, sm] = startTime24h.split(":").map(Number);
    const endTime24h = `${(sh + 1).toString().padStart(2, "0")}:${sm.toString().padStart(2, "0")}`;

    const eventRes = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(params.calendarId)}/events`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          summary: `Dental Appointment - ${params.name}`,
          description: `Patient: ${params.name}\nPhone: ${params.phone}${params.email ? `\nEmail: ${params.email}` : ""}\nReason: ${params.reason}`,
          start: {
            dateTime: `${params.preferred_date}T${startTime24h}:00`,
            timeZone: "America/New_York",
          },
          end: {
            dateTime: `${params.preferred_date}T${endTime24h}:00`,
            timeZone: "America/New_York",
          },
        }),
      }
    );

    if (!eventRes.ok) return null;
    const eventData = await eventRes.json();
    return (eventData.id as string) || null;
  } catch {
    return null; // Fail silently — calendar is optional
  }
}
