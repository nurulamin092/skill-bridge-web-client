import { env } from "@/env";

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const baseUrl = endpoint.startsWith("/api/auth")
    ? env.NEXT_PUBLIC_AUTH_URL
    : env.NEXT_PUBLIC_API_URL;

  const url = `${baseUrl}${endpoint}`;

  const res = await fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    let message = "Request failed";

    try {
      const error = await res.json();
      message = error?.message || message;
    } catch {}

    throw new Error(message);
  }

  if (res.status === 204) {
    return null as T;
  }

  return res.json();
}
