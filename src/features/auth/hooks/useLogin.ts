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
      await refresh();
      const role = data?.user?.role;

      let redirectUrl = "/";
      if (role === "ADMIN") {
        redirectUrl = "/admin";
      } else if (role === "TUTOR") {
        redirectUrl = "/tutor";
      } else {
        redirectUrl = "/student";
      }

      setTimeout(() => {
        router.push(redirectUrl);
      }, 100);

      toast.success("Login successful");
    },
    onError: (error: unknown) => {
      const errorMessage =
        error instanceof Error ? error.message : "Login failed";
      toast.error(errorMessage);
    },
  });
}
