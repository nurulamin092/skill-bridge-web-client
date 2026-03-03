import {
  BetterAuthUser,
  hasRole,
  isAuthUser,
  LoginResponse,
  Role,
} from "../types/auth.types";
import { authClient } from "@/lib/auth-client";

interface LoginPayload {
  email: string;
  password: string;
}

export async function login(data: LoginPayload): Promise<LoginResponse> {
  const { data: result, error } = await authClient.signIn.email({
    email: data.email,
    password: data.password,
  });

  if (error) {
    if (
      error.message?.includes("Invalid email") ||
      error.message?.includes("user not found")
    ) {
      throw new Error("No account found with this email address");
    }

    if (error.message?.includes("Invalid password")) {
      throw new Error("Incorrect password. Please try again");
    }

    if (error.message?.includes("too many requests")) {
      throw new Error("Too many login attempts. Please try again later");
    }
    throw new Error(error.message || "Login failed");
  }

  if (!result || !result.user) {
    throw new Error("Login failed:No user data received");
  }
  if (!isAuthUser(result.user)) {
    throw new Error("Login failed: Invalid user data structure");
  }

  const user = result.user as BetterAuthUser;
  const role: Role = hasRole(user) ? user.role : "STUDENT";

  return {
    user: {
      id: user.id,
      email: user.email,
      role: role,
    },
  };
}
