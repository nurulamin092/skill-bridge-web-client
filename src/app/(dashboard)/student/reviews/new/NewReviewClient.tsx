"use client";

import { useRouter } from "next/navigation";
import { ReviewForm } from "@/features/reviews/components/ReviewForm";

interface NewReviewClientProps {
  bookingId: string;
  tutorId: string;
  tutorName: string;
}

export function NewReviewClient({
  bookingId,
  tutorId,
  tutorName,
}: NewReviewClientProps) {
  const router = useRouter();

  const handleSuccess = () => {
    router.push("/student/reviews?success=true");
  };

  return (
    <ReviewForm
      bookingId={bookingId}
      tutorId={tutorId}
      tutorName={tutorName}
      onSuccess={handleSuccess}
    />
  );
}
