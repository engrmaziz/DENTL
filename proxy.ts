import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /admin routes (but not /admin/login)
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const allCookies = request.cookies.getAll();

    // Debug: log all cookies so we can see exactly what Next.js receives
    if (process.env.NODE_ENV !== "production") {
      console.log(
        "[proxy] Request cookies:",
        allCookies.map((c) => c.name)
      );
    }

    // Accept any cookie whose name contains 'auth-token' or 'access-token'
    const hasSession = allCookies.some(
      (c) => c.name.includes("auth-token") || c.name.includes("access-token")
    );

    // Also accept a valid Bearer token passed via the Authorization header
    const authHeaderValue = request.headers.get("authorization") ?? "";
    const hasAuthHeader =
      authHeaderValue.startsWith("Bearer ") &&
      authHeaderValue.length > "Bearer ".length;

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
