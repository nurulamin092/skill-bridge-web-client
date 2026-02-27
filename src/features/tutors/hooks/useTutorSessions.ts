import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { toast } from "sonner";
import { Session } from "../types/tutor.types";

export function useTutorSessions() {
  return useQuery({
    queryKey: ["tutor-sessions"],
    queryFn: async (): Promise<Session[]> => {
      const response = await apiFetch<{ success: boolean; data: Session[] }>(
        "/tutors/me/bookings",
      );
      return response.data;
    },
  });
}

export function useUpdateSessionStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      bookingId,
      status,
    }: {
      bookingId: string;
      status: "COMPLETED" | "NO_SHOW";
    }) => {
      const response = await apiFetch<{ success: boolean; data: Session }>(
        `/tutor/bookings/${bookingId}/status`,
        {
          method: "PATCH",
          body: JSON.stringify({ status }),
        },
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tutor-sessions"] });
      toast.success("Session status updated");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update session");
    },
  });
}
