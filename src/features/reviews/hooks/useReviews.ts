import { useQuery } from "@tanstack/react-query";
import { getMyReviews, getTutorReviews } from "../services/review.service";

export const useMyReview = () => {
  return useQuery({
    queryKey: ["my-reviews"],
    queryFn: getMyReviews,
  });
};

export const useTutorReview = (tutorId: string) => {
  return useQuery({
    queryKey: ["my-reviews", tutorId],
    queryFn: () => getTutorReviews(tutorId),
    enabled: !!tutorId,
  });
};
