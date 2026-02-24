import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { Star } from "lucide-react";
import { Review } from "../types/review.types";

interface ReviewCardProps {
  review: Review;
  showTutor?: boolean;
}

export default function ReviewCard({
  review,
  showTutor = false,
}: ReviewCardProps) {
  const initials = review.student.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-10 w-10 shrink-0">
            <AvatarImage
              src={review.student.image || ""}
              alt={review.student.name}
            />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
              <div>
                <h4 className="font-semibold">{review.student.name}</h4>
                {showTutor && review.tutor && (
                  <p className="text-sm text-muted-foreground">
                    for {review.tutor.name}
                  </p>
                )}
              </div>
              {review.createdAt && (
                <span className="text-sm text-muted-foreground">
                  {format(new Date(review.createdAt), "MMM dd, yyyy")}
                </span>
              )}
            </div>

            <div className="flex items-center gap-1 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < review.rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300 dark:text-gray-600"
                  }`}
                />
              ))}
            </div>

            <p className="text-muted-foreground wrap-break-word">
              {review.comment}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
