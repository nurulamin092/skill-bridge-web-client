import { env } from "@/env";
import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  baseURL:
    env.NEXT_PUBLIC_AUTH_URL || "https://skillbridge-api-tiua.onrender.com",
  fetchOptions: {
    credentials: "include",
  },
});

export const {
  useSession,
  signIn,
  signUp,
  signOut,
  resetPassword,
  verifyEmail,
} = authClient;
