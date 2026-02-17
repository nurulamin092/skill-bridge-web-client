import { env } from "@/env";

export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(`${env.NEXT_PUBLIC_API_URL}${endpoint}`, {
    credentials: "include",
    headers: {
      "Content-Type": "Application/json",
      ...options?.headers,
    },
    ...options,
  });
  if (!res.ok) {
    const error = await res.json().catch(() => null);
    throw new Error(error?.message || "Something went wrong");
  }

  return res.json();
}
