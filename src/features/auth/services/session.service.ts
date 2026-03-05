import { AuthSession } from "../types/auth.types";
import { authClient, getCookieName } from "@/lib/auth-client";

export async function getSession(): Promise<AuthSession | null> {
  try {
    console.log("🔍 Fetching session...");
    console.log("🍪 Cookie name:", getCookieName());
    const { data: session, error } = await authClient.getSession();

    if (error) {
      console.error("❌ Session error:", error);
      return null;
    }

    if (!session?.user) {
      console.log("ℹ️ No user in session");
      return null;
    }

    console.log("✅ Session user:", session.user);

    const user = session.user as unknown as {
      id: string;
      email: string;
      name: string;
      role: "STUDENT" | "TUTOR" | "ADMIN";
      phone?: string | null;
      image?: string | null;
    };

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone || "",
        image: user.image || "",
        role: user.role || "STUDENT",
      },
    };
  } catch (error) {
    console.error("❌ Session error:", error);
    return null;
  }
}

export async function logout() {
  try {
    console.log("🚪 Logging out...");
    const { error } = await authClient.signOut();
    if (error) {
      throw new Error(error.message);
    }
    console.log("✅ Logout successful");

    if (typeof window !== "undefined") {
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });
    }
  } catch (error) {
    console.error("❌ Logout service error:", error);
    throw error;
  }
}
