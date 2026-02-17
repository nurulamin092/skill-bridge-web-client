import { AuthSession } from "@/features/auth/types/auth.types";
import { NextRequest } from "next/server";

export async function getSessionFromCookie(
  request: NextRequest,
): Promise<AuthSession | null> {
  try {
    // Better Auth এর API call করে session নিন
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_AUTH_URL}/session`,
      {
        headers: {
          Cookie: request.headers.get("cookie") || "",
        },
      },
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Session fetch error:", error);
    return null;
  }
}
