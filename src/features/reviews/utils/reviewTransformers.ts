import { Review } from "@/features/shared/types/review.types";

export interface APIReview {
  id: string;
  rating: number;
  comment: string;
  student: {
    id: string;
    name: string;
    image?: string;
  };
}

export function transformAPIReviewToReview(apiReview: APIReview): Review {
  return {
    ...apiReview,
    createdAt: new Date().toISOString(),
  };
}

export function transformAPIReviewsToReviews(
  apiReviews: APIReview[],
): Review[] {
  return apiReviews.map(transformAPIReviewToReview);
}
