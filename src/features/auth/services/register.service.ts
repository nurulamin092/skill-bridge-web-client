import { authClient } from "@/lib/auth-client";
import { RegisterFormValues } from "../schemas";

export async function register(data: RegisterFormValues) {
  const { data: result, error } = await authClient.signUp.email({
    email: data.email,
    password: data.password,
    name: data.name,
    callbackURL: `${window.location.origin}/login?verified=true`,
    fetchOptions: {
      body: {
        role: data.role.toUpperCase(),
      },
    },
  });
  if (error) {
    throw new Error(error.message);
  }
  return result;
}
