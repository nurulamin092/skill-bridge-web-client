"use client";

import { useMyTutorReviews } from "../../hooks/useTutorReviews";
import { ReviewStats } from "./ReviewStats";
import { ReviewList } from "./ReviewList";
import { LoadingSkeleton } from "@/components/common/feedback/LoadingSkeleton";
import { ErrorState } from "@/components/common/feedback/ErrorState";

export function TutorReviews() {
  const { data: reviews, isLoading, error, refetch } = useMyTutorReviews();

  if (isLoading) {
    return <LoadingSkeleton type="card" rows={5} />;
  }

  if (error) {
    return (
      <ErrorState
        title="Failed to load reviews"
        message="There was an error loading your reviews."
        onRetry={refetch}
      />
    );
  }

  const reviewList = reviews || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Reviews Received</h1>
        <p className="text-muted-foreground mt-1">
          See what students are saying about your sessions
        </p>
      </div>

      <ReviewStats reviews={reviewList} />
      <ReviewList reviews={reviewList} />
    </div>
  );
}
