import { Booking } from "@/features/bookings/types/booking.types";
import { apiFetch } from "@/lib/api";

export async function getBookingDetails(
  bookingId: string,
  userId: string,
): Promise<Booking | null> {
  try {
    const response = await apiFetch<{
      success: boolean;
      data: Booking;
    }>(`/booking/${bookingId}`);

    if (!response.success || !response.data) {
      return null;
    }

    if (response.data.student.id !== userId) {
      return null;
    }

    return response.data;
  } catch (error) {
    console.error("Failed to fetch booking:", error);
    return null;
  }
}
