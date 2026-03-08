"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Star, AlertCircle } from "lucide-react";
import Link from "next/link";
import ReviewCard from "./ReviewCard";
import { useMyReview } from "../hooks/useReviews";

export function MyReviewsList() {
  const { data: reviews, isLoading, error } = useMyReview();
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex gap-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-16 w-full" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-destructive">
        <CardContent className="py-8 text-center">
          <AlertCircle className="h-12 w-12 mx-auto mb-4 text-destructive" />
          <p className="text-destructive font-medium">
            Failed to load reviews. Please try again.
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => window.location.reload()}
          >
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <Star className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">No Reviews Yet</h3>
          <p className="text-muted-foreground mb-4 max-w-sm mx-auto">
            You haven&apos;t reviewed any sessions yet. Complete a session and
            share your experience!
          </p>
          <Button asChild>
            <Link href="/tutors">Find a Tutor</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} showTutor={true} />
      ))}
    </div>
  );
}
