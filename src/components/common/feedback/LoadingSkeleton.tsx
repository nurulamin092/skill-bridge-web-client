"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface LoadingSkeletonProps {
  rows?: number;
  type?: "table" | "card" | "list";
}

export function LoadingSkeleton({
  rows = 5,
  type = "table",
}: LoadingSkeletonProps) {
  if (type === "card") {
    return (
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: rows }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-8 w-16" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-10 w-24" />
      </div>
      <Skeleton className="h-24 w-full" />
      <Card>
        <CardContent className="p-0">
          {Array.from({ length: rows }).map((_, i) => (
            <div key={i} className="p-4 border-b last:border-0">
              <Skeleton className="h-12 w-full" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
