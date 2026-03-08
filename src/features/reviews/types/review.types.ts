import { Review } from "@/features/shared/types/review.types";

export interface ReviewCardProps {
  review: Review;
  showTutor?: boolean;
}

export interface ReviewResponse {
  success: boolean;
  data: Review;
  message?: string;
}

export interface CreateReviewPayload {
  bookingId: string;
  rating: number;
  comment: string;
  tutorId: string;
}
