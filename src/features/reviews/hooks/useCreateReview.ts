import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createReview } from "../services/review.service";
import { toast } from "sonner";

export function useCreateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createReview,
    onSuccess: (data, variables) => {
      toast.success("Review submitted successfully!");
      queryClient.invalidateQueries({ queryKey: ["tutor", variables.tutorId] });
      queryClient.invalidateQueries({ queryKey: ["my-bookings"] });
      queryClient.invalidateQueries({ queryKey: ["my-reviews"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to submit review");
    },
  });
}
