import { Review } from "@/features/shared/types/review.types";
import { apiFetch } from "@/lib/api";

export const getMyTutorReviews = async (): Promise<Review[]> => {
  const response = await apiFetch<{ success: boolean; data: Review[] }>(
    "/tutors/me/reviews",
  );
  return response.data;
};
