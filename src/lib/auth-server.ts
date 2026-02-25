import { headers } from "next/headers";
import { AuthSession } from "@/features/auth/types/auth.types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getServerSession(): Promise<AuthSession | null> {
  try {
    const cookie = (await headers()).get("cookie") || "";
    if (!API_URL) {
      return null;
    }

    const url = `${API_URL}/auth/me`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Cookie: cookie,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const result = await response.json();

    if (!result?.success || !result?.data) {
      return null;
    }

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
  } catch (error) {
    console.error("ServerSession Error:", error);
    return null;
  }
}
