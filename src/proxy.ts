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
  const session = await getSessionFromCookie(request);

  const publicRoutes = [
    "/",
    "/login",
    "/register",
    "/tutors",
    "/tutors/",
    "/unauthorized",
    "/verify-email",
    "/tutor/profile",
  ];

  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith("/tutors/"),
  );

  if (isPublicRoute) {
    if (pathname === "/login" || pathname === "/register") {
      if (session) {
        const role = session.user.role;
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

  if (!session) {
    console.log("4. No session, redirecting to login");
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (session.user.role === "TUTOR") {
    if (!pathname.startsWith("/tutor/profile")) {
      try {
        const API_URL =
          process.env.NEXT_PUBLIC_API_URL ||
          "https://skillbridge-api-tiua.onrender.com/api/v1";
        const response = await fetch(`${API_URL}/tutor/profile/me`, {
          headers: {
            Cookie: request.headers.get("cookie") || "",
          },
        });

        console.log("6. Profile check status:", response.status);

        if (response.status === 403) {
          const errorData = await response.json().catch(() => ({}));
          if (errorData.message?.includes("complete your tutor profile")) {
            console.log("7. No profile - redirecting to /tutor/profile");
            return NextResponse.redirect(
              new URL("/tutor/profile", request.url),
            );
          }
        }

        if (response.status === 404) {
          console.log("7. No profile - redirecting to /tutor/profile");
          return NextResponse.redirect(new URL("/tutor/profile", request.url));
        }

        if (response.status === 401) {
          console.log("7. Token expired - redirecting to login");
          const loginUrl = new URL("/login", request.url);
          loginUrl.searchParams.set("callbackUrl", pathname);
          return NextResponse.redirect(loginUrl);
        }

        console.log("7. Profile exists or other status - allowing access");
      } catch (error) {
        console.error("Profile check error:", error);

        console.log("7. Profile check failed - redirecting to /tutor/profile");
        return NextResponse.redirect(new URL("/tutor/profile", request.url));
      }
    }
  }

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
