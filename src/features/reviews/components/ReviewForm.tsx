"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { reviewSchema, ReviewFormValues } from "../schemas";
import { useCreateReview } from "../hooks/useCreateReview";
import { cn } from "@/lib/utils";

interface ReviewFormProps {
  bookingId: string;
  tutorId: string;
  tutorName: string;
  tutorImage?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function ReviewForm({
  bookingId,
  tutorId,
  tutorName,
  tutorImage,
  onSuccess,
  onCancel,
}: ReviewFormProps) {
  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);
  const { mutate: createReview, isPending } = useCreateReview();

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      comment: "",
    },
  });

  const onSubmit = (data: ReviewFormValues) => {
    createReview(
      {
        ...data,
        bookingId,
        tutorId,
      },
      {
        onSuccess: () => {
          onSuccess?.();
        },
      },
    );
  };

  const initials = tutorName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={tutorImage || ""} alt={tutorName} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>Review Your Session</CardTitle>
              <CardDescription>
                Share your experience with {tutorName}
              </CardDescription>
            </div>
          </div>
          {onCancel && (
            <Button variant="ghost" size="icon" onClick={onCancel}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            {/* Rating Stars - State based instead of watch */}
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How would you rate your experience?</FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => {
                            field.onChange(value);
                            setSelectedRating(value);
                          }}
                          onMouseEnter={() => setHoveredRating(value)}
                          onMouseLeave={() => setHoveredRating(0)}
                          className="focus:outline-none transition-transform hover:scale-110"
                          aria-label={`Rate ${value} star${value > 1 ? "s" : ""}`}
                        >
                          <Star
                            className={cn(
                              "h-8 w-8 transition-colors",
                              value <= (hoveredRating || selectedRating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300 dark:text-gray-600",
                            )}
                          />
                        </button>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Write your review</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What did you like about the session? Any suggestions for improvement?"
                      className="min-h-30 resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  <p className="text-xs text-muted-foreground text-right">
                    {field.value.length}/500 characters
                  </p>
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter className="flex justify-end gap-3 border-t px-6 py-4">
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}
            <Button type="submit" disabled={isPending}>
              {isPending ? "Submitting..." : "Submit Review"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
