import { getServerSession } from "@/lib/auth-server";
import { redirect } from "next/navigation";

import { headers } from "next/headers";
import { env } from "@/env";
import { Booking } from "@/features/bookings/types/booking.types";
import { NewReviewClient } from "./NewReviewClient";

type tSearchParams = Promise<{ booking?: string }>;

async function getBookingDetails(
  bookingId: string,
  userId: string,
): Promise<Booking | null> {
  try {
    const cookieHeader = (await headers()).get("cookie") || "";
    const baseUrl = env.NEXT_PUBLIC_API_URL;

    const response = await fetch(`${baseUrl}/booking/${bookingId}`, {
      headers: {
        Cookie: cookieHeader,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) return null;
    const result = await response.json();

    if (!result?.success || !result?.data) return null;
    if (result.data.student.id !== userId) return null;
    if (result.data.status !== "COMPLETED") return null;
    if (result.data.review) return null;

    return result.data;
  } catch (error) {
    console.error("❌ Failed to fetch booking:", error);
    return null;
  }
}

export default async function NewReviewPage(props: {
  searchParams: tSearchParams;
}) {
  const searchParams = await props.searchParams;
  const session = await getServerSession();

  if (!session || session.user.role !== "STUDENT") {
    redirect("/login");
  }

  const bookingId = searchParams.booking;
  if (!bookingId) redirect("/student/reviews");

  const booking = await getBookingDetails(bookingId, session.user.id);
  if (!booking) redirect("/student/reviews");

  return (
    <div className="container max-w-2xl py-8">
      <NewReviewClient
        bookingId={booking.id}
        tutorId={booking.tutor.id}
        tutorName={booking.tutor.user.name}
      />
    </div>
  );
}
