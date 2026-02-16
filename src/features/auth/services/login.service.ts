import { apiFetch } from "@/lib/api";

interface LoginPayload {
  email: string;
  password: string;
}

export async function login(data: LoginPayload) {
  return apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
