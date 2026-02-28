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

  const session = await getSessionFromCookie(request);
  console.log("2. Session exists:", !!session);

  // Public routes - সবাই access করতে পারবে
  const publicRoutes = [
    "/",
    "/login",
    "/register",
    "/tutors",
    "/tutors/",
    "/unauthorized",
    "/verify-email",
    "/tutor/profile", // ✅ Profile page এ access দেওয়া জরুরি
  ];

  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith("/tutors/"),
  );

  // Public route handling
  if (isPublicRoute) {
    // Login/register page এ already logged in user redirect
    if (pathname === "/login" || pathname === "/register") {
      if (session) {
        const role = session.user.role;
        console.log("3. Already logged in, redirecting to dashboard");
        if (role === "ADMIN")
          return NextResponse.redirect(new URL("/admin", request.url));
        if (role === "TUTOR")
          return NextResponse.redirect(new URL("/tutor", request.url));
        if (role === "STUDENT")
          return NextResponse.redirect(new URL("/student", request.url));
      }
    }
    console.log("3. Public route - allowing access");
    return NextResponse.next();
  }

  // No session - redirect to login
  if (!session) {
    console.log("4. No session, redirecting to login");
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // ✅ FIXED: Tutor profile check - 403 handle করা
  if (session.user.role === "TUTOR") {
    // Skip check if already on profile page
    if (!pathname.startsWith("/tutor/profile")) {
      try {
        console.log("5. Checking tutor profile...");

        const response = await fetch(
          "http://localhost:5000/api/v1/tutor/profile/me",
          {
            headers: {
              Cookie: request.headers.get("cookie") || "",
            },
          },
        );

        console.log("6. Profile check status:", response.status);

        // ✅ 403 with "complete your profile" message - profile page এ redirect
        if (response.status === 403) {
          const errorData = await response.json().catch(() => ({}));
          if (errorData.message?.includes("complete your tutor profile")) {
            console.log("7. No profile - redirecting to /tutor/profile");
            return NextResponse.redirect(
              new URL("/tutor/profile", request.url),
            );
          }
        }

        // ✅ 404 - no profile - profile page এ redirect
        if (response.status === 404) {
          console.log("7. No profile - redirecting to /tutor/profile");
          return NextResponse.redirect(new URL("/tutor/profile", request.url));
        }

        // ✅ 401 - token expired - login page এ redirect
        if (response.status === 401) {
          console.log("7. Token expired - redirecting to login");
          const loginUrl = new URL("/login", request.url);
          loginUrl.searchParams.set("callbackUrl", pathname);
          return NextResponse.redirect(loginUrl);
        }

        // ✅ অন্যান্য error - dashboard এ যেতে দিই (তারা message দেখবে)
        console.log("7. Profile exists or other status - allowing access");
      } catch (error) {
        console.error("Profile check error:", error);
        // Error হলে profile page এ redirect করা safe
        console.log("7. Profile check failed - redirecting to /tutor/profile");
        return NextResponse.redirect(new URL("/tutor/profile", request.url));
      }
    }
  }

  // Role-based access control
  if (pathname.startsWith("/tutor") && session.user.role !== "TUTOR") {
    console.log("8. Tutor access denied");
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  if (pathname.startsWith("/student") && session.user.role !== "STUDENT") {
    console.log("8. Student access denied");
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  if (pathname.startsWith("/admin") && session.user.role !== "ADMIN") {
    console.log("8. Admin access denied");
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  console.log("9. Access granted to:", pathname);
  return NextResponse.next();
}
