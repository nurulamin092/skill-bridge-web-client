import { apiFetch } from "@/lib/api";
import { AuthSession } from "../types/auth.types";

export async function getSession(): Promise<AuthSession | null> {
  try {
    return await apiFetch<AuthSession>("/auth/session");
  } catch {
    return null;
  }
}

export async function logout() {
  return apiFetch("/auth/logout", {
    method: "POST",
  });
}
