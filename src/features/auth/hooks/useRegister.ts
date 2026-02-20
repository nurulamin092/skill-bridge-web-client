"use client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { register } from "../services/register.service";
import { toast } from "sonner";

export function useRegister() {
  const router = useRouter();
  return useMutation({
    mutationFn: register,
    onSuccess: () => {
      toast.success(
        "Registration successful! Please check your email for verification.",
      );
      router.push("/login?verified=false");
    },
    onError: (error: unknown) => {
      const errorMessage =
        error instanceof Error ? error.message : "Registration failed";
      toast.error(errorMessage);
    },
  });
}
