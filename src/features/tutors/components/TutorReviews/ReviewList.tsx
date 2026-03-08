"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, Star } from "lucide-react";

import { EmptyState } from "@/components/common/feedback/EmptyState";
import { ReviewCard } from "./ReviewCard";
import { Review } from "@/features/shared/types/review.types";

interface ReviewListProps {
  reviews: Review[];
}

export function ReviewList({ reviews }: ReviewListProps) {
  const [search, setSearch] = useState("");

  const filteredReviews = reviews.filter(
    (review) =>
      review.student.name.toLowerCase().includes(search.toLowerCase()) ||
      review.comment.toLowerCase().includes(search.toLowerCase()),
  );

  if (reviews.length === 0) {
    return (
      <EmptyState
        icon={<Star className="h-12 w-12 text-muted-foreground" />}
        title="No Reviews Yet"
        message="You haven't received any reviews from students yet."
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

        <Input
          placeholder="Search reviews..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {filteredReviews.length === 0 ? (
        <EmptyState
          icon={<Star className="h-12 w-12 text-muted-foreground" />}
          title="No Matching Reviews"
          message="No reviews match your search."
        />
      ) : (
        <div className="space-y-4">
          {filteredReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}
    </div>
  );
}
