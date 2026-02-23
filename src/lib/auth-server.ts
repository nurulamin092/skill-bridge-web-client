import { headers } from "next/headers";
import { AuthSession } from "@/features/auth/types/auth.types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getServerSession(): Promise<AuthSession | null> {
  try {
    const cookie = (await headers()).get("cookie") || "";

    console.log("[getServerSession] Cookie exists:", !!cookie);

    if (!API_URL) {
      console.error("[getServerSession] API_URL is missing");
      return null;
    }

    const response = await fetch(`${API_URL}/auth/session`, {
      method: "GET",
      headers: {
        Cookie: cookie,
      },
      cache: "no-store",
    });

    console.log("[getServerSession] Status:", response.status);

    if (!response.ok) {
      console.log("[getServerSession] Failed");
      return null;
    }

    const result = await response.json();

    console.log("[getServerSession] Raw data:", result);

    let user = null;

    if (result?.user) {
      user = result.user;
    } else if (result?.data?.user) {
      user = result.data.user;
    } else if (result?.data?.id) {
      user = result.data;
    }

    if (!user) {
      console.log("[getServerSession] No user");
      return null;
    }

    const role =
      typeof user.role === "string" ? user.role.toUpperCase() : "STUDENT";

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
  } catch (error) {
    console.error("[getServerSession] Error:", error);
    return null;
  }
}
