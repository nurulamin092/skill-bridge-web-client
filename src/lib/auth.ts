import { env } from "@/env";
import { AuthSession } from "@/features/auth/types/auth.types";
import { NextRequest } from "next/server";

export async function getSessionFromCookie(
  request: NextRequest,
): Promise<AuthSession | null> {
  try {
    const cookie = request.headers.get("cookie");

    console.log("===== getSessionFromCookie DEBUG =====");
    console.log("1. Full URL:", request.url);
    console.log("2. Cookie exists:", !!cookie);
    console.log("3. Cookie value:", cookie?.substring(0, 50) + "...");

    if (!cookie) {
      console.log("4. No cookie found");
      return null;
    }

    const apiUrl = env.NEXT_PUBLIC_API_URL;
    console.log("5. API URL:", apiUrl);

    const sessionUrl = `${apiUrl}/auth/me`;
    console.log("6. Fetching from:", sessionUrl);

    const response = await fetch(sessionUrl, {
      method: "GET",
      headers: {
        Cookie: cookie,
        "Content-Type": "application/json",
      },
      credentials: "include",
      cache: "no-store",
    });

    console.log("7. Response status:", response.status);

    const responseText = await response.text();
    console.log("8. Raw response:", responseText);

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

      console.log("10. User data found despite status:", response.status);
      console.log("11. User role:", role);
      console.log("12. User email:", userData.email);

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

    console.log("13. No user data in response");
    return null;
  } catch (error) {
    console.error("Error in getSessionFromCookie:", error);
    return null;
  }
}
