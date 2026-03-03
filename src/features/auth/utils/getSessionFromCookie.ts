import { env } from "@/env";
import { AuthSession } from "../types/auth.types";
import { NextRequest } from "next/server";

export async function getSessionFromCookie(
  request: NextRequest,
): Promise<AuthSession | null> {
  try {
    const cookie = request.headers.get("cookie");
    if (!cookie) return null;

    const sessionUrl = `${env.NEXT_PUBLIC_API_URL}/auth/session`;

    const response = await fetch(sessionUrl, {
      method: "GET",
      headers: { Cookie: cookie },
      cache: "no-store",
    });

    if (!response.ok) return null;

    const result = await response.json();
    if (!result?.user) return null;

    const user = result.user;
    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name || "",
        phone: user.phone || "",
        image: user.image || "",
        role: user.role?.toUpperCase() || "STUDENT",
      },
    };
  } catch (err) {
    console.error("getSessionFromCookie error:", err);
    return null;
  }
}
