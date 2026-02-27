import { NextRequest, NextResponse } from "next/server";
import { getSessionFromCookie } from "./lib/auth";

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/_next") || pathname.startsWith("/favicon.ico")) {
    return NextResponse.next();
  }

  console.log("========== PROXY DEBUG ==========");
  console.log("1. Path:", pathname);

  console.log("2. Trying to get session...");
  const session = await getSessionFromCookie(request);
  console.log("3. Session exists:", !!session);

  if (session) {
    console.log("4. User role:", session.user.role);
  } else {
    console.log("4. No session found");
  }

  const publicRoutes = [
    "/",
    "/login",
    "/register",
    "/tutors",
    "/tutors/",
    "/unauthorized",
    "/verify-email",
  ];

  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith("/tutors/"),
  );

  if (isPublicRoute) {
    console.log("5. Public route - allowing access");
    return NextResponse.next();
  }

  if (!session) {
    console.log("6. No session for protected route, redirecting to login");
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname.startsWith("/tutor") && session.user.role !== "TUTOR") {
    console.log("7. Tutor access denied");
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  if (pathname.startsWith("/student") && session.user.role !== "STUDENT") {
    console.log("7. Student access denied");
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  if (pathname.startsWith("/admin") && session.user.role !== "ADMIN") {
    console.log("7. Admin access denied");
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  console.log("8. Access granted to:", pathname);
  return NextResponse.next();
}
