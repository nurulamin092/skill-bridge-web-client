import { env } from "@/env";
import { AuthSession } from "@/features/auth/types/auth.types";
import { NextRequest } from "next/server";

export async function getSessionFromCookie(
  request: NextRequest,
): Promise<AuthSession | null> {
  try {
    const cookie = request.headers.get("cookie");

    if (!cookie) {
      console.log("❌ No cookie found");
      return null;
    }

    const authUrl = env.NEXT_PUBLIC_API_URL;
    const sessionUrl = `${authUrl}/auth/session`;

    console.log("🔍 Fetching session from:", sessionUrl);

    const response = await fetch(sessionUrl, {
      method: "GET",
      headers: {
        Cookie: cookie,
        "Content-Type": "application/json",
      },
      credentials: "include",
      cache: "no-store",
    });

    console.log("📡 Response status:", response.status);
    console.log("📡 Response OK:", response.ok);

    const responseText = await response.text();
    console.log("📄 Raw response:", responseText);

    if (!responseText || responseText.trim() === "") {
      console.log("⚠️ Empty response body");
      return null;
    }

    let result;
    try {
      result = JSON.parse(responseText);
      console.log("✅ Parsed result:", result);
    } catch (e) {
      console.log("❌ Failed to parse JSON:", e);
      return null;
    }

    // Better Auth response format - check different possible structures
    if (result?.user) {
      const user = result.user;
      const role = user.role?.toUpperCase() || "STUDENT";
      return {
        user: {
          id: user.id,
          email: user.email,
          name: user.name || "",
          phone: user.phone || "",
          image: user.image || "",
          role,
        },
      };
    }

    if (result?.data?.user) {
      const user = result.data.user;
      const role = user.role?.toUpperCase() || "STUDENT";
      return {
        user: {
          id: user.id,
          email: user.email,
          name: user.name || "",
          phone: user.phone || "",
          image: user.image || "",
          role,
        },
      };
    }

    console.log("❌ No user data in response");
    return null;
  } catch (error) {
    console.error("❌ Error in getSessionFromCookie:", error);
    return null;
  }
}
