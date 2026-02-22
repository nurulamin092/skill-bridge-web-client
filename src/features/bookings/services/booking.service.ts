import { apiFetch } from "@/lib/api";
import {
  Booking,
  BookingResponse,
  CreateBookingPayload,
} from "../types/booking.types";

export const createBooking = async (
  data: CreateBookingPayload,
): Promise<Booking> => {
  const response = await apiFetch<BookingResponse>("/booking", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return response.data;
};

export const getMyBookings = async (): Promise<Booking[]> => {
  const response = await apiFetch<{ success: boolean; data: Booking[] }>(
    "/booking/me",
  );
  return response.data;
};

export const cancelBooking = async (
  id: string,
): Promise<{ message: string }> => {
  const response = await apiFetch<{
    success: boolean;
    data: { message: string };
  }>(`/booking/${id}/cancel`, {
    method: "PATCH",
  });
  return response.data;
};
