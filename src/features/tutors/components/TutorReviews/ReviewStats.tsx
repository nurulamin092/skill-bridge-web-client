"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Review } from "@/features/shared/types/review.types";
import { Star, TrendingUp, Users } from "lucide-react";

interface ReviewStatsProps {
  reviews: Review[];
}

export function ReviewStats({ reviews }: ReviewStatsProps) {
  const totalReviews = reviews.length;
  const averageRating =
    totalReviews > 0
      ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(
          1,
        )
      : "0.0";

  const ratingDistribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
    percentage:
      totalReviews > 0
        ? (reviews.filter((r) => r.rating === star).length / totalReviews) * 100
        : 0,
  }));

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Reviews
              </p>
              <p className="text-2xl font-bold mt-1">{totalReviews}</p>
            </div>
            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/20">
              <Users className="h-5 w-5 text-blue-500" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Average Rating
              </p>
              <p className="text-2xl font-bold mt-1">{averageRating}</p>
            </div>
            <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900/20">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                5-Star Reviews
              </p>
              <p className="text-2xl font-bold mt-1">
                {ratingDistribution.find((r) => r.star === 5)?.count || 0}
              </p>
            </div>
            <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/20">
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Rating Distribution
            </p>
            {ratingDistribution.map((item) => (
              <div key={item.star} className="flex items-center gap-2">
                <span className="text-xs w-8">{item.star} ★</span>
                <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <span className="text-xs w-8">{item.count}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
