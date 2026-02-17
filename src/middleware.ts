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

    if (!sessionCookie) {
      return null;
    }

    const session = JSON.parse(Buffer.from(sessionCookie, "base64").toString());

    if (!session?.user?.id || !session?.user?.role) {
      return null;
    }

    return session as AuthSession;
  } catch (error) {
    console.error("Session parse error:", error);
    return null;
  }
}

function checkRoleAccess(pathname: string, role: Role): boolean {
  if (role === "ADMIN") {
    return true;
  }

  for (const [allowedRole, routes] of Object.entries(ROLE_ROUTES)) {
    if (role !== allowedRole) {
      if (routes.some((route) => pathname.startsWith(route))) {
        return false;
      }
    }
  }

  return true;
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
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api routes (if any)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
