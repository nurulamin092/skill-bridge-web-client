import { env } from "@/env";
import { AuthSession } from "@/features/auth/types/auth.types";
import { NextRequest } from "next/server";

export async function getSessionFromCookie(
  request: NextRequest,
): Promise<AuthSession | null> {
  try {
    const cookie = request.headers.get("cookie");

    if (!cookie) {
      console.log("4. No cookie found");
      return null;
    }

    const apiUrl = env.NEXT_PUBLIC_API_URL;

    const sessionUrl = `${apiUrl}/auth/me`;

    const response = await fetch(sessionUrl, {
      method: "GET",
      headers: {
        Cookie: cookie,
        "Content-Type": "application/json",
      },
      credentials: "include",
      cache: "no-store",
    });

    const responseText = await response.text();

    let result;
    try {
      result = JSON.parse(responseText);
    } catch (e) {
      console.log("9. Failed to parse JSON:", e);
      return null;
    }

    if (result?.data) {
      const userData = result.data;
      const role = userData.role?.toUpperCase() || "STUDENT";

      return {
        user: {
          id: userData.id,
          email: userData.email,
          name: userData.name || "",
          phone: userData.phone || "",
          image: userData.image || "",
          role,
        },
      };
    }

    return null;
  } catch (error) {
    console.error("Error in getSessionFromCookie:", error);
    return null;
  }
}
