import { env } from "@/env";

export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  try {
    const baseUrl = endpoint.startsWith("/api/auth")
      ? env.NEXT_PUBLIC_AUTH_URL
      : env.NEXT_PUBLIC_API_URL;

    const res = await fetch(`${baseUrl}${endpoint}`, {
      credentials: "include",
      headers: {
        "Content-Type": "Application/json",
        ...options?.headers,
      },
      ...options,
    });
    if (!res.ok) {
      const error = await res.json().catch(() => null);
      if (res.status === 401) {
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      }
      throw new Error(error?.message || "Something went wrong");
    }

    return res.json();
  } catch (err) {
    console.error("Api error", err);
    throw err;
  }
}
