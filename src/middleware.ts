import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/tutors")
  ) {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/student/:path*", "/tutor/:path*", "/admin/:path"],
};
