export interface ReviewCardProps {
  review: Review;
  showTutor?: boolean;
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  student: {
    id: string;
    name: string;
    image?: string;
  };
  tutor?: {
    id: string;
    name: string;
  };
}
export interface ReviewResponse {
  success: boolean;
  data: Review;
  message?: string;
}

export interface CreateReviewPayload {
  bookingId: string;
  rating: number;
  comment: string;
  tutorId: string;
}
