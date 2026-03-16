import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /admin routes (but not /admin/login)
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

    // Guard against missing environment variable to avoid crashes
    if (!supabaseUrl) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Derive the project reference from the Supabase URL
    // e.g. https://abcdefgh.supabase.co -> abcdefgh
    const projectRef = supabaseUrl.split("//")[1]?.split(".")[0] ?? "";

    // Check all known Supabase cookie name variants:
    //   sb-access-token          – legacy format
    //   sb-<ref>-auth-token       – standard v2 format
    //   sb-<ref>-auth-token.<n>   – chunked token (any number of chunks)
    const cookiePrefix = projectRef ? `sb-${projectRef}-auth-token` : "";
    const hasSession =
      request.cookies.has("sb-access-token") ||
      (cookiePrefix !== "" &&
        request.cookies.getAll().some((c) => c.name === cookiePrefix || c.name.startsWith(`${cookiePrefix}.`)));

    // Also accept a valid Bearer token passed via the Authorization header
    const authHeaderValue = request.headers.get("authorization") ?? "";
    const hasAuthHeader =
      authHeaderValue.startsWith("Bearer ") && authHeaderValue.length > "Bearer ".length;

    if (!hasSession && !hasAuthHeader) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
