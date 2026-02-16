import { NextRequest, NextResponse } from "next/server";

export type Role = "STUDENT" | "TUTOR" | "ADMIN";
export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  image?: string;
  role: Role;
}

interface AuthSession {
  user: AuthUser;
  session: {
    id: string;
    token: string;
    expiresAt: string;
  };
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const publicRouters = ["/", "/login", "/register", "/tutors"];

  if (publicRouters.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  const cookie = request.cookies.get("better-auth.session")?.value;

  if (!cookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  let session: AuthSession | null = null;

  try {
    session = JSON.parse(atob(cookie)) as AuthSession;
  } catch {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const role = session?.user?.role;

  if (pathname.startsWith("/admin") && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  if (pathname.startsWith("/student") && role !== "STUDENT") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  if (pathname.startsWith("/tutor") && role !== "TUTOR") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/student/:path*", "/tutor/:path*", "/admin/:path*"],
};
