import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { TutorProfileData } from "../types/tutor.types";

export function useTutorProfile() {
  return useQuery({
    queryKey: ["tutor-profile"],
    queryFn: async (): Promise<TutorProfileData | null> => {
      try {
        const response = await apiFetch<{
          success: boolean;
          data: TutorProfileData;
        }>("/tutor/profile/me");
        return response.data;
      } catch {
        return null;
      }
    },
  });
}
