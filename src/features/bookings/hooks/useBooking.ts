import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cancelBooking, getMyBookings } from "../services/booking.service";
import { toast } from "sonner";

export const useMyBooking = () => {
  return useQuery({
    queryKey: ["my-booking"],
    queryFn: getMyBookings,
  });
};

export const useCancelBooking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cancelBooking,
    onSuccess: () => {
      toast.success("Booking cancelled success");
      queryClient.invalidateQueries({ queryKey: ["my-booking"] });
    },
    onError: (error: unknown) => {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to cancel booking";
      toast.error(errorMessage);
    },
  });
};
