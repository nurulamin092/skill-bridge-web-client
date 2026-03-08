import { useQuery } from "@tanstack/react-query";
import {
  getMyReviews,
  getTutorReviews,
  getMyTutorReviews,
} from "../services/review.service";

export const useMyReview = () => {
  return useQuery({
    queryKey: ["student-reviews"],
    queryFn: getMyReviews,
  });
};

export const useTutorReview = (tutorId: string) => {
  return useQuery({
    queryKey: ["tutor-reviews", tutorId],
    queryFn: () => getTutorReviews(tutorId),
    enabled: !!tutorId,
  });
};

export const useMyTutorReviews = () => {
  return useQuery({
    queryKey: ["my-tutor-reviews"],
    queryFn: getMyTutorReviews,
  });
};
