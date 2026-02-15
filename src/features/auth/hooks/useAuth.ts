"use client";

import { authClient } from "@/lib/auth-client";

export function useAuth() {
  const { data, isPending } = authClient.useSession();

  return {
    user: data?.user ?? null,
    loading: isPending,
    isAuthenticated: !!data?.user,
  };
}
