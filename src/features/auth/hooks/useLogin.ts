"use client";

import { useRouter } from "next/navigation";
import { useAuthContext } from "../context";
import { useMutation } from "@tanstack/react-query";
import { login } from "../services/login.service";
import { toast } from "sonner";

export function useLogin() {
  const router = useRouter();
  const { refresh } = useAuthContext();

  return useMutation({
    mutationFn: login,
    onSuccess: async (data) => {
      try {
        console.log("✅ Login successful, role:", data.user.role);

        await refresh();

        toast.success("লগইন সফল হয়েছে!");

        let redirectUrl = "/";
        if (data.user.role === "ADMIN") redirectUrl = "/admin";
        else if (data.user.role === "TUTOR") redirectUrl = "/tutor";
        else if (data.user.role === "STUDENT") redirectUrl = "/student";

        console.log("🚀 Redirecting to:", redirectUrl);

        router.replace(redirectUrl);
        router.refresh();
      } catch (error) {
        console.error("❌ Redirect error:", error);
        toast.error("রিডাইরেক্ট করতে সমস্যা হয়েছে");
      }
    },
    onError: (error: unknown) => {
      console.error("❌ Login error:", error);
      toast.error(
        error instanceof Error ? error.message : "লগইন ব্যর্থ হয়েছে",
      );
    },
  });
}
