import { NextRequest, NextResponse } from "next/server";
import { Role } from "./features/auth/types/auth.types";
import { getSessionFromCookie } from "./lib/auth";

const PUBLIC_ROUTES = [
  "/",
  "/login",
  "/register",
  "/tutors",
  "/tutors/",
  "/unauthorized",
  "/verify-email",
];

const AUTH_ROUTES = ["/login", "/register"];

const ROLE_ROUTES = {
  ADMIN: ["/admin"],
  TUTOR: ["/tutor", "/tutor/"],
  STUDENT: ["/student", "/dashboard"],
} as const;

function isValidRole(role: unknown): role is Role {
  return (
    typeof role === "string" && ["STUDENT", "TUTOR", "ADMIN"].includes(role)
  );
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

  const session = await getSessionFromCookie(request);

  if (PUBLIC_ROUTES.some((route) => pathname.startsWith(route))) {
    if (AUTH_ROUTES.includes(pathname) && session) {
      const role = session.user.role;
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

  const role = session.user.role;
  if (!isValidRole(role)) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  const hasAccess = checkRoleAccess(pathname, role);
  if (!hasAccess) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  if (pathname === "/dashboard" && role === "STUDENT") {
    return NextResponse.redirect(new URL("/student", request.url));
  }

  return NextResponse.next();
}

function checkRoleAccess(pathname: string, role: Role): boolean {
  const allowedRoutes = ROLE_ROUTES[role] || [];
  return allowedRoutes.some((route) => pathname.startsWith(route));
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
