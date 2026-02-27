import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { toast } from "sonner";
import {
  AvailabilitySlot,
  CreateAvailabilityData,
} from "../types/availability.types";

export function useAvailability() {
  return useQuery({
    queryKey: ["tutor-availability"],
    queryFn: async (): Promise<AvailabilitySlot[]> => {
      const response = await apiFetch<{
        success: boolean;
        data: AvailabilitySlot[];
      }>("/tutor/availability/me");
      return response.data;
    },
  });
}

export function useCreateAvailability() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateAvailabilityData) => {
      const response = await apiFetch<{
        success: boolean;
        data: AvailabilitySlot;
      }>("/tutor/availability", {
        method: "POST",
        body: JSON.stringify(data),
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tutor-availability"] });
      toast.success("Availability slot added");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to add slot");
    },
  });
}

export function useDeleteAvailability() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (slotId: string) => {
      const response = await apiFetch<{
        success: boolean;
        data: { message: string };
      }>(`/tutor/availability/${slotId}`, {
        method: "DELETE",
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tutor-availability"] });
      toast.success("Slot deleted");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete slot");
    },
  });
}
