import { env } from "@/env";

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  try {
    const baseUrl = endpoint.startsWith("/api/auth")
      ? env.NEXT_PUBLIC_AUTH_URL
      : env.NEXT_PUBLIC_API_URL;

    const url = `${baseUrl}${endpoint}`;

    console.log("🔍 API Fetch:", {
      url,
      method: options.method || "GET",
      credentials: "include",
    });

    const res = await fetch(url, {
      ...options,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });

    console.log("📡 Response status:", res.status);

    if (!res.ok) {
      let errorMessage = "Something went wrong";

      try {
        const error = await res.json();
        errorMessage = error?.message || errorMessage;
      } catch {}

      if (res.status === 401 && typeof window !== "undefined") {
        console.log("🚫 Unauthorized - redirecting to login");
        window.location.href = "/login";
      }

      throw new Error(errorMessage);
    }

    if (res.status === 204) {
      return null as T;
    }

    const data = await res.json();

    console.log("✅ Success response:", data);

    return data as T;
  } catch (err) {
    console.error("❌ Api error:", err);
    throw err;
  }
}
