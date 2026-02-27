import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { toast } from "sonner";
import { TutorProfileData } from "../types/tutor.types";
import { ProfileFormData } from "../schemas";

export function useCreateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ProfileFormData) => {
      const response = await apiFetch<{
        success: boolean;
        data: TutorProfileData;
      }>("/tutor/profile", {
        method: "POST",
        body: JSON.stringify(data),
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tutor-profile"] });
      toast.success("Profile created successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create profile");
    },
  });
}
