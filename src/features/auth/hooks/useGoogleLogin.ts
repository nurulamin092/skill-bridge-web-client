import { useAuthContext } from "../context";
import { useMutation } from "@tanstack/react-query";
import { logInWithGoogle } from "../services/google-login.service";
import { toast } from "sonner";

export function useGoogleLogin() {
  const { refresh } = useAuthContext();

  return useMutation({
    mutationFn: logInWithGoogle,
    onSuccess: async () => {
      await refresh();
      toast.success("Google login successful");
    },
    onError: (err) => {
      toast.error(err.message || "Google login failed");
    },
  });
}
