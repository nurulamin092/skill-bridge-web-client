import { useQuery } from "@tanstack/react-query";
import { getMyTutorReviews } from "../services/tutor-review.service";

interface UseTutorReviewsOptions {
  enabled?: boolean;
}

export const useMyTutorReviews = (options: UseTutorReviewsOptions = {}) => {
  return useQuery({
    queryKey: ["tutor-my-reviews"],
    queryFn: getMyTutorReviews,
    enabled: options.enabled !== false,
    retry: false,
  });
};
