// export async function apiFetch<T>(
//   endpoint: string,
//   options: RequestInit = {},
// ): Promise<T> {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
//     ...options,
//     credentials: "include",
//     headers: {
//       "Content-Type": "application/json",
//       ...(options.headers || {}),
//     },
//   });

import { env } from "@/env";

//   if (!res.ok) {
//     const error = await res.json();
//     throw new Error(error.message || "Request failed");
//   }

//   return res.json();
// }
export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const baseURL =
    process.env.NODE_ENV === "production"
      ? "/api/proxy"
      : env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${baseURL}${endpoint}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Request failed");
  }

  return res.json();
}
