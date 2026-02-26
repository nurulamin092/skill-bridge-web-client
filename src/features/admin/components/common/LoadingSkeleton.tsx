"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface LoadingSkeletonProps {
  rows?: number;
}

export function LoadingSkeleton({ rows = 5 }: LoadingSkeletonProps) {
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
