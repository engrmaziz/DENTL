import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /admin routes (but not /admin/login)
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";

    // Check for auth token in cookies
    const accessToken =
      request.cookies.get("sb-access-token")?.value ||
      request.cookies.get(
        `sb-${supabaseUrl.split("//")[1]?.split(".")[0]}-auth-token`
      )?.value;

    // Also check Authorization header
    const authHeader = request.headers.get("authorization");

    if (!accessToken && !authHeader) {
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
