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
    // const authUrl = env.NEXT_PUBLIC_API_URL;
    // const sessionUrl = `${authUrl}/auth/session`;
    const sessionUrl = `${env.NEXT_PUBLIC_AUTH_URL}/session`;

    console.log("🔍 Fetching session from:", sessionUrl);

    const response = await fetch(sessionUrl, {
      method: "GET",
      headers: {
        Cookie: cookie,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      console.log("❌ Session response not OK:", response.status);
      return null;
    }

    const result = await response.json();

    if (!result?.user) {
      console.log("❌ No user in session response");
      return null;
    }

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
  } catch (error) {
    console.error("❌ Error in getSessionFromCookie:", error);
    return null;
  }
}
