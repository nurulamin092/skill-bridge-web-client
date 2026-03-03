import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { StudentProfile } from "../types/student.types";

export function useStudentProfile() {
  return useQuery({
    queryKey: ["student-profile"],
    queryFn: async (): Promise<StudentProfile> => {
      const response = await apiFetch<{
        success: boolean;
        data: StudentProfile;
      }>("/student/profile");

      if (!response.success || !response.data) {
        throw new Error("Failed to fetch profile");
      }

      return response.data;
    },
  });
}
