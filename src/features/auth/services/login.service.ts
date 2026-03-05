import { authClient } from "@/lib/auth-client";
import { LoginResponse, Role } from "../types/auth.types";

export async function login(data: {
  email: string;
  password: string;
}): Promise<LoginResponse> {
  try {
    console.log("📝 Login attempt for:", data.email);

    const { data: result, error } = await authClient.signIn.email({
      email: data.email,
      password: data.password,
    });

    if (error) {
      console.error("❌ Login error:", error);
      throw new Error(error.message);
    }

    if (!result?.user) {
      throw new Error("No user data received");
    }

    const { data: session } = await authClient.getSession();
    console.log("📦 Session after login:", session);

    let role: Role = "STUDENT";

    if (session?.user && "role" in session.user) {
      const possibleRole = (session.user as { role?: unknown }).role;
      if (
        possibleRole === "STUDENT" ||
        possibleRole === "TUTOR" ||
        possibleRole === "ADMIN"
      ) {
        role = possibleRole;
      }
    }

    return {
      user: {
        id: result.user.id,
        email: result.user.email,
        role: role,
      },
    };
  } catch (error) {
    console.error("❌ Login service error:", error);
    throw error;
  }
}
