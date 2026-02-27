import { getServerSession } from "@/lib/auth-server";
import { redirect } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { BookingDetails } from "@/features/bookings/components/BookingDetails";
import { Booking } from "@/features/bookings/types/booking.types";

interface PageProps {
  params: {
    id: string;
  };
}

async function getBookingData(
  id: string,
  userId: string,
): Promise<Booking | null> {
  try {
    const response = await apiFetch<{ success: boolean; data: Booking }>(
      `/booking/${id}`,
    );

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

export default async function BookingDetailsPage({ params }: PageProps) {
  const session = await getServerSession();

  if (!session || session.user.role !== "STUDENT") {
    redirect("/login");
  }

  const bookingData = await getBookingData(params.id, session.user.id);

  if (!bookingData) {
    redirect("/student");
  }

  return (
    <div className="container max-w-4xl py-8">
      <BookingDetails booking={bookingData} />
    </div>
  );
}
