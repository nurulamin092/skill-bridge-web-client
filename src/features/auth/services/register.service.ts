import { apiFetch } from "@/lib/api";

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export async function register(data: RegisterPayload) {
  return apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
