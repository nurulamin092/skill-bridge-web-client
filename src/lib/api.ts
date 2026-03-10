// import { env } from "@/env";

// export async function apiFetch<T>(
//   endpoint: string,
//   options?: RequestInit,
// ): Promise<T> {
//   try {
//     const baseUrl = endpoint.startsWith("/api/auth")
//       ? env.NEXT_PUBLIC_AUTH_URL
//       : env.NEXT_PUBLIC_API_URL;

//     console.log("🔍 API Fetch:", {
//       url: `${baseUrl}${endpoint}`,
//       method: options?.method || "GET",
//       hasCredentials: true,
//     });

//     const res = await fetch(`${baseUrl}${endpoint}`, {
//       credentials: "include",
//       headers: {
//         "Content-Type": "application/json",
//         ...options?.headers,
//       },
//       ...options,
//     });

//     console.log("📡 Response status:", res.status);
//     console.log("📡 Response ok:", res.ok);

//     if (!res.ok) {
//       const error = await res.json().catch(() => null);
//       console.log("❌ Error response:", error);

//       if (res.status === 401) {
//         console.log("🚫 Unauthorized - redirecting to login");
//         if (typeof window !== "undefined") {
//           window.location.href = "/login";
//         }
//       }
//       throw new Error(error?.message || "Something went wrong");
//     }

//     const data = await res.json();
//     console.log("✅ Success response:", data);
//     return data;
//   } catch (err) {
//     console.error("❌ Api error", err);
//     throw err;
//   }
// }

import { env } from "@/env";

export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const baseUrl = endpoint.startsWith("/api/auth")
    ? env.NEXT_PUBLIC_AUTH_URL
    : env.NEXT_PUBLIC_API_URL;

  const url = `${baseUrl}${endpoint}`;

  const res = await fetch(url, {
    credentials: "include",
    ...options,
    headers: {
      ...(options?.body ? { "Content-Type": "application/json" } : {}),
      ...(options?.headers || {}),
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
