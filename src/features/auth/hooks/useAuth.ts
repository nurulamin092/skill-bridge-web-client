"use client";

import { useRouter } from "next/navigation";
import { useAuthContext } from "../context";
import { logout as logoutService } from "../services/session.service";
import { toast } from "sonner";
export function useAuth() {
  const { session, loading, refresh } = useAuthContext();

  const router = useRouter();

  const logout = async () => {
    try {
      await logoutService();
      await refresh();
      router.push("/login");
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout");
    }
  };

  return {
    session,
    user: session?.user ?? null,
    role: session?.user.role ?? null,
    isAuthenticated: !!session,
    loading,
    refresh,
    logout,
  };
}
