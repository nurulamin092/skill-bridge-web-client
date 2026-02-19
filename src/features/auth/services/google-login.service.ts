import { env } from "@/env";
import { authClient } from "@/lib/auth-client";

export async function logInWithGoogle() {
  const { data, error } = await authClient.signIn.social({
    provider: "google",
    callbackURL: env.FRONTEND_URL,
  });
  if (error) {
    throw new Error(error.message);
  }
  return data;
}
