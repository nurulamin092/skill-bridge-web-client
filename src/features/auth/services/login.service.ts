import { apiFetch } from "@/lib/api";
import { LoginResponse } from "../types/auth.types";

interface LoginPayload {
  email: string;
  password: string;
}

export async function login(data: LoginPayload): Promise<LoginResponse> {
  return apiFetch<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
