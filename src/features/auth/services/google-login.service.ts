import { authClient } from "@/lib/auth-client";

export async function logInWithGoogle() {
  const { data, error } = await authClient.signIn.social({
    provider: "google",
    callbackURL: "http://localhost:3000/",
  });
  if (error) {
    throw new Error(error.message);
  }
  return data;
}
