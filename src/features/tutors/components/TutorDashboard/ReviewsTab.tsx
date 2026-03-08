"use client";

import { Star } from "lucide-react";
import ReviewCard from "@/features/reviews/components/ReviewCard";
import { EmptyState } from "@/components/common/feedback/EmptyState";
import { Review } from "@/features/shared/types/review.types";

interface ReviewsTabProps {
  reviews?: Review[];
}

export function ReviewsTab({ reviews }: ReviewsTabProps) {
  if (!reviews || reviews.length === 0) {
    return (
      <EmptyState
        icon={<Star className="h-12 w-12 text-muted-foreground" />}
        title="No Reviews Yet"
        message="You haven't received any reviews from students yet. Complete more sessions to get feedback!"
      />
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
}
