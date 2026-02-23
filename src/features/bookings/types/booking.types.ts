export interface Availability {
  id: string;
  startTime: string;
  endTime: string;
  isBooked: string;
}

export interface Booking {
  id: string;
  status: "CONFIRMED" | "COMPLETED" | "CANCELLED" | "NO_SHOW";
  priceSnapshot: number;
  createdAt: string;
  student: {
    id: string;
    name: string;
    email: string;
  };
  tutor: {
    id: string;
    user: {
      name: string;
    };
  };
  availability: Availability;
  review?: {
    id: string;
    rating: number;
    comment?: string;
  };
}

export interface CreateBookingPayload {
  availabilityId: string;
}

export interface BookingResponse {
  success: boolean;
  data: Booking;
  message?: string;
}
