import { env } from "@/env";
import { AuthSession } from "@/features/auth/types/auth.types";
import { NextRequest } from "next/server";

export async function getSessionFromCookie(
  request: NextRequest,
): Promise<AuthSession | null> {
  try {
    const cookie = request.headers.get("cookie");

    const apiUrl = env.NEXT_PUBLIC_API_URL;
    console.log("API URL:", apiUrl);

    const sessionUrl = `${apiUrl}/auth/me`;
    console.log("Fetching from:", sessionUrl);

    const response = await fetch(sessionUrl, {
      headers: {
        Cookie: cookie || "",
        "Content-Type": "application/json",
      },
      credentials: "include",
      cache: "no-store",
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      const text = await response.text();
      console.log("Error response:", text);
      return null;
    }

    const data = await response.json();
    console.log("Data received:", data ? "yes" : "no");

    if (!data?.success || !data?.data) {
      console.log("Invalid response format");
      return null;
    }

    const userData = data.data;
    console.log("User role from response:", userData.role);

    return {
      user: {
        id: userData.id,
        email: userData.email,
        name: userData.name || "",
        phone: userData.phone || "",
        image: userData.image || "",
        role: userData.role?.toUpperCase() || "STUDENT",
      },
    };
  } catch (error) {
    console.error("Error in getSessionFromCookie:", error);
    return null;
  }
}
