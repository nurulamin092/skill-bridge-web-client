export interface Booking {
  id: string;
  status: "CONFIRMED" | "COMPLETED" | "CANCELLED" | "NO_SHOW";
  priceSnapshot: number;
  createdAt: string;
  student: {
    id: string;
    name: string;
    email: string;
    image?: string;
  };
  tutor: {
    id: string;
    user: {
      name: string;
      email: string;
      image?: string;
    };
  };
  availability: {
    startTime: string;
    endTime: string;
  };
  review?: {
    id: string;
    rating: number;
    comment?: string;
  };
}

export interface BookingsResponse {
  success: boolean;
  data: Booking[];
}
