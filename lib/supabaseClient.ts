import { createClient } from "@supabase/supabase-js";

// Provide safe fallbacks so Next.js static generation doesn't crash during build time
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

// 30-day session lifetime expressed as a named constant for clarity
const COOKIE_MAX_AGE_SECONDS = 30 * 24 * 60 * 60;

// Cookie options – secure is enabled in production but disabled for http://localhost
const cookieOptions = {
  name: "sb-auth-token",
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
};

// Custom storage adapter that persists the Supabase session in a browser cookie
// so that Next.js middleware (proxy.ts) can read the token on every request.
const cookieStorage = {
  getItem(key: string): string | null {
    if (typeof document === "undefined") return null;
    const encodedKey = encodeURIComponent(key);
    const match = document.cookie
      .split("; ")
      .find((c) => c.startsWith(`${encodedKey}=`));
    return match
      ? decodeURIComponent(match.split("=").slice(1).join("="))
      : null;
  },
  setItem(key: string, value: string): void {
    if (typeof document === "undefined") return;
    const secureFlag = cookieOptions.secure ? "; Secure" : "";
    document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)}; path=/; max-age=${COOKIE_MAX_AGE_SECONDS}; SameSite=${cookieOptions.sameSite}${secureFlag}`;
  },
  removeItem(key: string): void {
    if (typeof document === "undefined") return;
    document.cookie = `${encodeURIComponent(key)}=; path=/; max-age=0`;
  },
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storageKey: cookieOptions.name,
    storage: cookieStorage,
  },
});
