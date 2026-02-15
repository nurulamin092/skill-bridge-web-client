import { env } from "@/env";
import { authClient } from "@/lib/auth-client";

export const authService = {
  signUp: async (data: { name: string; email: string; password: string }) => {
    return await authClient.signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
    });
  },

  signIn: async (data: { email: string; password: string }) => {
    return await authClient.signIn.email({
      email: data.email,
      password: data.password,
    });
  },

  sigOut: async () => {
    return await authClient.signOut();
  },

  getSession: async () => {
    return await authClient.getSession();
  },

  signInWithGoogle: async () => {
    return await authClient.signIn.social({
      provider: "google",
      callbackURL: `${env.FRONTEND_URL}/dashboard`,
    });
  },
};
