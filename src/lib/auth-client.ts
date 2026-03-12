import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL:
    process.env.NODE_ENV === "production"
      ? `${process.env.NEXT_PUBLIC_APP_URL}/api/proxy/auth`
      : process.env.NEXT_PUBLIC_AUTH_URL || "http://localhost:5000/api/auth",
  fetchOptions: {
    credentials: "include",
  },
});

export const getCookieName = () => "better-auth.session_token";

export const {
  useSession,
  signIn,
  signUp,
  signOut,
  resetPassword,
  verifyEmail,
} = authClient;
