"use client";

import { MessageSquare } from "lucide-react";
import { EmptyState } from "@/components/common/feedback/EmptyState";
import ReviewCard from "@/features/reviews/components/ReviewCard";
import { SingleTutor } from "../../types/tutor.types";

interface ReviewsTabProps {
  reviews: SingleTutor["reviews"];
}

export function ReviewsTab({ reviews }: ReviewsTabProps) {
  if (!reviews?.length) {
    return (
      <EmptyState
        icon={<MessageSquare className="h-12 w-12 text-muted-foreground" />}
        title="No Reviews Yet"
        message="This tutor hasn't received any reviews yet. Be the first to leave a review after your session!"
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
