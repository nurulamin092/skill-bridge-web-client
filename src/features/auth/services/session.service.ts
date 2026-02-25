import { AuthSession, hasRole, isAuthUser } from "../types/auth.types";
import { authClient } from "@/lib/auth-client";

export async function getSession(): Promise<AuthSession | null> {
  try {
    const { data: session, error } = await authClient.getSession();

    if (error || !session?.user) {
      return null;
    }

    if (!isAuthUser(session.user)) {
      return null;
    }

    const user = session.user;

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone || "",
        image: session.user.image || "",
        role: hasRole(user) ? user.role : "STUDENT",
      },
    };
  } catch (error) {
    console.error("Session error:", error);
    return null;
  }
}

export async function logout() {
  try {
    const { error } = await authClient.signOut();
    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    console.error("Logout service error:", error);
    throw error;
  }
}
