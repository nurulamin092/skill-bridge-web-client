import { env } from "@/env";
import { AuthSession } from "@/features/auth/types/auth.types";
import { NextRequest } from "next/server";

export async function getSessionFromCookie(
  request: NextRequest,
): Promise<AuthSession | null> {
  try {
    const response = await fetch(`${env.NEXT_PUBLIC_AUTH_URL}/session`, {
      headers: {
        Cookie: request.headers.get("cookie") || "",
      },
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    if (!data || !data.user) {
      return null;
    }

    return {
      user: {
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
        phone: data.user.phone || "",
        image: data.user.image || "",
        role: data.user.role || "STUDENT",
      },
    };
  } catch (error) {
    console.error("Session fetch error:", error);
    return null;
  }
}
