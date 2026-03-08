import { apiFetch } from "@/lib/api";
import { CreateReviewPayload, ReviewResponse } from "../types/review.types";
import { Review } from "@/features/shared/types/review.types";

export const createReview = async (
  data: CreateReviewPayload,
): Promise<Review> => {
  const response = await apiFetch<ReviewResponse>("/reviews", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return response.data;
};

export const getTutorReviews = async (tutorId: string): Promise<Review[]> => {
  const response = await apiFetch<{ success: boolean; data: Review[] }>(
    `/tutors/${tutorId}/reviews`,
  );
  return response.data;
};

export const getMyReviews = async (): Promise<Review[]> => {
  const response = await apiFetch<{ success: boolean; data: Review[] }>(
    "/student/reviews",
  );
  return response.data;
};
export const getMyTutorReviews = async (): Promise<Review[]> => {
  const response = await apiFetch<{ success: boolean; data: Review[] }>(
    "/tutors/me/reviews",
  );
  return response.data;
};
