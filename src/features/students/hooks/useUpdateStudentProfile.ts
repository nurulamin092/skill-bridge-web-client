import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { toast } from "sonner";
import {
  StudentProfile,
  UpdateStudentProfileData,
} from "../types/student.types";

export function useUpdateStudentProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      data: UpdateStudentProfileData,
    ): Promise<StudentProfile> => {
      const response = await apiFetch<{
        success: boolean;
        data: StudentProfile;
      }>("/student/profile", {
        method: "PUT",
        body: JSON.stringify(data),
      });

      if (!response.success || !response.data) {
        throw new Error("Failed to update profile");
      }

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["student-profile"] });
      toast.success("Profile updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update profile");
    },
  });
}
