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

const PUBLIC_ROUTES = [
  "/",
  "/login",
  "/register",
  "/tutors",
  "/tutors/",
  "/unauthorized",
  "/api",
];

const AUTH_ROUTES = ["/login", "/register"];

const ROLE_ROUTES = {
  ADMIN: ["/admin"],
  TUTOR: ["/tutor", "/tutor/"],
  STUDENT: ["/student", "/student/", "/dashboard"], // /dashboard student এর জন্য
} as const;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.includes("/_next") ||
    pathname.includes("/favicon.ico") ||
    pathname.includes("/images") ||
    pathname.includes("/fonts")
  ) {
    return NextResponse.next();
  }

  if (PUBLIC_ROUTES.some((route) => pathname.startsWith(route))) {
    if (AUTH_ROUTES.includes(pathname)) {
      const session = getSessionFromCookie(request);
      if (session) {
        return NextResponse.redirect(
          new URL(getDashboardUrl(session.user.role), request.url),
        );
      }
    }
    return NextResponse.next();
  }

  const session = getSessionFromCookie(request);

  if (!session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const role = session.user.role;

  const hasAccess = checkRoleAccess(pathname, role);

  if (!hasAccess) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  if (pathname === "/dashboard" && role === "STUDENT") {
    return NextResponse.redirect(new URL("/student", request.url));
  }

  return NextResponse.next();
}

function getSessionFromCookie(request: NextRequest): AuthSession | null {
  try {
    const sessionCookie =
      request.cookies.get("better-auth.session")?.value ||
      request.cookies.get("__Secure-better-auth.session")?.value ||
      request.cookies.get("better-auth.session_token")?.value;

    if (!sessionCookie) return null;

    let session: AuthSession | null = null;

    try {
      const decoded = Buffer.from(sessionCookie, "base64").toString("utf-8");
      session = JSON.parse(decoded) as AuthSession;
    } catch {
      console.warn("Failed to parse session cookie, removing invalid cookie");

      const response = NextResponse.next();
      response.cookies.delete("better-auth.session");
      response.cookies.delete("__Secure-better-auth.session");
      response.cookies.delete("better-auth.session_token");
      return null;
    }

    if (!session?.user?.id || !session?.user?.role) return null;

    return session;
  } catch (err) {
    console.error("Unexpected session error:", err);
    return null;
  }
}

function checkRoleAccess(pathname: string, role: Role): boolean {
  const allowedRouters = ROLE_ROUTES[role] || [];
  return allowedRouters.some((route) => pathname.startsWith(route));
}

function getDashboardUrl(role: Role): string {
  switch (role) {
    case "ADMIN":
      return "/admin";
    case "TUTOR":
      return "/tutor";
    case "STUDENT":
      return "/student";
    default:
      return "/";
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
