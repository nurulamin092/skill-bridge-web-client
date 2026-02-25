import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { Booking } from "@/features/bookings/types/booking.types";

export const useAdminBookings = () => {
  return useQuery({
    queryKey: ["admin-bookings"],
    queryFn: async (): Promise<Booking[]> => {
      const response = await apiFetch<{ success: boolean; data: Booking[] }>(
        "/admin/bookings",
      );
      return response.data;
    },
  });
};
