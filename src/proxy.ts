import { NextRequest, NextResponse } from "next/server";
import { Role } from "./features/auth/types/auth.types";
import { getSessionFromCookie } from "./lib/auth";

const PUBLIC_ROUTES = [
  "/",
  "/login",
  "/register",
  "/tutors",
  "/unauthorized",
  "/verify-email",
];

const AUTH_ROUTES = ["/login", "/register"];

const ROLE_ROUTES: Record<Role, string[]> = {
  ADMIN: ["/admin"],
  TUTOR: ["/tutor"],
  STUDENT: ["/student"],
};

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

function isValidRole(role: unknown): role is Role {
  return (
    typeof role === "string" && ["STUDENT", "TUTOR", "ADMIN"].includes(role)
  );
}

function getDashboardUrl(role: Role) {
  return ROLE_ROUTES[role]?.[0] ?? "/";
}

function checkRoleAccess(pathname: string, role: Role): boolean {
  const allowed = ROLE_ROUTES[role] ?? [];
  return allowed.some((route) => pathname.startsWith(route));
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/fonts")
  ) {
    return NextResponse.next();
  }

  console.log(`[Middleware] Path: ${pathname}`);

  const session = await getSessionFromCookie(request);
  console.log(`[Middleware] Session: ${session ? "exists" : "none"}`);

  if (PUBLIC_ROUTES.some((route) => pathname.startsWith(route))) {
    if (AUTH_ROUTES.includes(pathname) && session) {
      const role = session.user.role?.toUpperCase();
      if (isValidRole(role)) {
        return NextResponse.redirect(
          new URL(getDashboardUrl(role), request.url),
        );
      }
    }
    return NextResponse.next();
  }

  if (!session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const role = session.user.role?.toUpperCase();
  if (!isValidRole(role)) {
    console.warn(`[Middleware] Invalid role detected: ${role}`);
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (!checkRoleAccess(pathname, role)) {
    console.warn(`[Middleware] No access for role ${role} to ${pathname}`);
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  return NextResponse.next();
}
