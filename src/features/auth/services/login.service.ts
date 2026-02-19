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
    throw new Error(error.message);
  }

  if (!result.user) {
    throw new Error("Login failed:No user data received");
  }
  if (!isAuthUser(result.user)) {
    throw new Error("Login failed: Invalid user data structure");
  }

  const user = result.user as BetterAuthUser;
  const role: Role = hasRole(user) ? user.role : "STUDENT";

  return {
    user: {
      id: result?.user?.id,
      email: result?.user?.email,
      role: role,
    },
  };
}
