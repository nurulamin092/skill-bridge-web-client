export interface ReviewCardProps {
  review: {
    id: string;
    rating: number;
    comment: string;
    createAt?: string;
    student: {
      id: string;
      name: string;
      image?: string | null;
    };
  };
}
