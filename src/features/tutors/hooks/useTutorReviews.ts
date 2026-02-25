import { useQuery } from "@tanstack/react-query";
import { getMyTutorReviews } from "../services/tutor-review.service";

export const useMyTutorReviews = () => {
  return useQuery({
    queryKey: ["tutor-my-reviews"],
    queryFn: getMyTutorReviews,
  });
};
