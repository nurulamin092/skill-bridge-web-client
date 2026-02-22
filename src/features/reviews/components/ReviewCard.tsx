import { Card, CardContent } from "@/components/ui/card";
import { ReviewCardProps } from "../types/review.types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { Star } from "lucide-react";

export default function ReviewCard({ review }: ReviewCardProps) {
  const initials = review.student.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={review.student.image || ""}
              alt={review.student.name}
            />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h4 className="font-semibold">{review.student.name}</h4>
            {review.createAt && (
              <span className="text-sm text-muted-foreground">
                {format(new Date(review.createAt), "MMM dd,yyyy")}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 mb-2">
            <div className="flex items-center gap-1 mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < review.rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <p className="text-muted-foreground">{review.comment}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
