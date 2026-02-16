"use client";

import { useAuthContext } from "../context";

export function useAuth() {
  const { session, loading, refresh } = useAuthContext();

  return {
    session,
    user: session?.user ?? null,

    role: session?.user.role ?? null,
    isAuthenticated: !!session,
    loading,
    refresh,
  };
}
