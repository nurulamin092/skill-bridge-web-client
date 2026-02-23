import { env } from "@/env";
import { AuthSession } from "@/features/auth/types/auth.types";
import { NextRequest } from "next/server";

export async function getSessionFromCookie(
  request: NextRequest,
): Promise<AuthSession | null> {
  try {
    const cookie = request.headers.get("cookie");
    console.log("[getSessionFromCookie] Cookie exists:", !!cookie);
    console.log(
      "[getSessionFromCookie] Cookie string:",
      cookie?.substring(0, 100) + "...",
    );

    const baseUrl = env.NEXT_PUBLIC_AUTH_URL;

    const sessionUlr = baseUrl.includes("/api/auth")
      ? `${baseUrl}/session`
      : `${baseUrl}/api/auth/session`;

    console.log("[Session] Fetching from:", sessionUlr);

    const response = await fetch(sessionUlr, {
      headers: {
        Cookie: cookie || "",
      },
      credentials: "include",
      cache: "no-store",
    });
    console.log("[getSessionFromCookie] Response status:", response.status);

    if (!response.ok) {
      console.log(
        "[getSessionFromCookie] Failed with status:",
        response.status,
      );
      return null;
    }

    const data = await response.json();

    console.log("[getSessionFromCookie] Data received:", !!data);

    if (!data || !data.user) {
      console.log("[getSessionFromCookie] No user in data");
      return null;
    }

    const role = data.user.role?.toUpperCase() || "STUDENT";
    return {
      user: {
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
        phone: data.user.phone || "",
        image: data.user.image || "",
        role,
      },
    };
  } catch (error) {
    console.error("Session fetch error:", error);
    return null;
  }
}
