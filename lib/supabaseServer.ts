import { createClient } from "@supabase/supabase-js";

// Server-side Supabase client using service role key (bypasses RLS for admin operations)
// ONLY use in server-side code (API routes, Server Actions, Server Components)
export function createServerSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    // Return a client with placeholders during build time
    return createClient(
      supabaseUrl || "https://placeholder.supabase.co",
      supabaseServiceKey || "placeholder-service-key"
    );
  }

  return createClient(supabaseUrl, supabaseServiceKey);
}
