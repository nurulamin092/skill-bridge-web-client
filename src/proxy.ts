import { NextRequest, NextResponse } from "next/server";
import { getSessionFromCookie } from "./lib/auth";
import { getCookieName } from "./lib/auth-client";

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  console.log("🔍 Proxy running for:", pathname);
  console.log("🍪 Looking for cookie:", getCookieName());

  if (pathname.startsWith("/_next") || pathname.startsWith("/favicon.ico")) {
    return NextResponse.next();
  }

  const session = await getSessionFromCookie(request);
  console.log(
    "👤 Session in proxy:",
    session?.user?.email,
    session?.user?.role,
  );

  const publicRoutes = [
    "/",
    "/login",
    "/register",
    "/tutors",
    "/unauthorized",
    "/verify-email",
  ];
  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith("/tutors/"),
  );

  if (isPublicRoute) {
    if ((pathname === "/login" || pathname === "/register") && session) {
      const role = session.user.role;
      console.log("🔄 Already logged in, redirecting to:", role);

      if (role === "ADMIN")
        return NextResponse.redirect(new URL("/admin", request.url));
      if (role === "TUTOR")
        return NextResponse.redirect(new URL("/tutor", request.url));
      if (role === "STUDENT")
        return NextResponse.redirect(new URL("/student", request.url));
    }
    return NextResponse.next();
  }

  if (!session) {
    console.log("🚫 No session, redirecting to login");
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const role = session.user.role;

  if (pathname.startsWith("/student") && role !== "STUDENT") {
    console.log("🚫 Not a student, redirecting to unauthorized");
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  if (pathname.startsWith("/tutor") && role !== "TUTOR") {
    console.log("🚫 Not a tutor, redirecting to unauthorized");
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  if (pathname.startsWith("/admin") && role !== "ADMIN") {
    console.log("🚫 Not an admin, redirecting to unauthorized");
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  return NextResponse.next();
}
