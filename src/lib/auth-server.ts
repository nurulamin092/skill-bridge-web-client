import { headers } from "next/headers";
import { AuthSession } from "@/features/auth/types/auth.types";
import { env } from "@/env";

export async function getServerSession(): Promise<AuthSession | null> {
  try {
    const cookie = (await headers()).get("cookie") || "";

    const url =
      process.env.NODE_ENV === "production"
        ? `${env.NEXT_PUBLIC_APP_URL}/api/proxy/auth/get-session`
        : `${env.NEXT_PUBLIC_AUTH_URL}/get-session`;
    console.log(" Server fetching session from:", url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Cookie: cookie,
        "Content-Type": "application/json",
        Origin: env.NEXT_PUBLIC_APP_URL,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      console.log(" Server session response not OK:", response.status);
      return null;
    }

    const result = await response.json();
    console.log(" Server session result:", result);

    const userData = result?.user || result?.session?.user;

    if (!userData) {
      console.log(" No user data in server session");
      return null;
    }

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
    console.error(" ServerSession Error:", error);
    return null;
  }
}
