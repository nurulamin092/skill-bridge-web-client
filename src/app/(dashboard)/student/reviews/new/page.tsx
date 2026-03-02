import { getServerSession } from "@/lib/auth-server";
import { redirect } from "next/navigation";
import { ReviewForm } from "@/features/reviews/components/ReviewForm";
import { apiFetch } from "@/lib/api";
import { Booking } from "@/features/bookings/types/booking.types";

interface PageProps {
  searchParams: {
    booking?: string;
  };
}

async function getBookingDetails(
  bookingId: string,
  userId: string,
): Promise<Booking | null> {
  console.log("🔍 [getBookingDetails] Started for booking:", bookingId);
  console.log("🔍 [getBookingDetails] User ID:", userId);

  try {
    console.log("📡 Fetching from API:", `/booking/${bookingId}`);

    const response = await apiFetch<{
      success: boolean;
      data: Booking;
    }>(`/booking/${bookingId}`);

    console.log("📡 API Response status:", response ? "received" : "failed");
    console.log("📡 API Response success:", response?.success);

    if (!response?.success || !response?.data) {
      console.log("❌ No data in response");
      return null;
    }

    console.log("📦 Booking data received:", {
      id: response.data.id,
      studentId: response.data.student.id,
      tutorName: response.data.tutor.user.name,
      status: response.data.status,
      hasReview: !!response.data.review,
    });

    if (response.data.student.id !== userId) {
      console.log("❌ Booking belongs to different user:", {
        bookingStudentId: response.data.student.id,
        currentUserId: userId,
      });
      return null;
    }

    console.log("✅ Booking verified successfully");
    return response.data;
  } catch (error) {
    console.error("❌ [getBookingDetails] Error:", error);
    return null;
  }
}

export default async function NewReviewPage({ searchParams }: PageProps) {
  console.log("\n=== NEW REVIEW PAGE DEBUG ===");
  console.log("1️⃣ Page rendering started");
  console.log("2️⃣ Search params:", searchParams);

  const session = await getServerSession();
  console.log("3️⃣ Session exists:", !!session);
  if (session) {
    console.log("   User ID:", session.user.id);
    console.log("   User Role:", session.user.role);
    console.log("   User Email:", session.user.email);
  }

  // Check 1: Authentication
  console.log("\n🔐 Check 1: Authentication");
  if (!session) {
    console.log("   ❌ No session, redirecting to login");
    redirect("/login");
  }

  if (session.user.role !== "STUDENT") {
    console.log(`   ❌ Wrong role: ${session.user.role}, redirecting to login`);
    redirect("/login");
  }
  console.log("   ✅ Authentication passed");

  // Check 2: Booking ID
  console.log("\n📅 Check 2: Booking ID");
  const bookingId = searchParams.booking;
  console.log("   Booking ID from URL:", bookingId);

  if (!bookingId) {
    console.log("   ❌ No booking ID, redirecting to /student/reviews");
    redirect("/student/reviews");
  }
  console.log("   ✅ Booking ID present");

  // Check 3: Fetch booking details
  console.log("\n📦 Check 3: Fetching booking details");
  const booking = await getBookingDetails(bookingId, session.user.id);

  if (!booking) {
    console.log(
      "   ❌ Booking not found or not accessible, redirecting to /student/reviews",
    );
    redirect("/student/reviews");
  }
  console.log("   ✅ Booking fetched successfully");

  console.log("\n📝 Check 4: Review status");
  if (booking.review) {
    console.log("   ❌ Booking already has review:", booking.review);
    console.log("   Redirecting to /student/reviews");
    redirect("/student/reviews");
  }
  console.log("   ✅ No existing review found");

  // Success - render form
  console.log("\n✅ All checks passed!");
  console.log("5️⃣ Rendering ReviewForm with:");
  console.log("   - bookingId:", booking.id);
  console.log("   - tutorId:", booking.tutor.id);
  console.log("   - tutorName:", booking.tutor.user.name);
  console.log("=== END DEBUG ===\n");

  return (
    <div className="container max-w-2xl py-8">
      <ReviewForm
        bookingId={booking.id}
        tutorId={booking.tutor.id}
        tutorName={booking.tutor.user.name}
        onSuccess={() => {
          console.log(
            "✅ Review submitted successfully, redirecting to /student/reviews?success=true",
          );
          redirect("/student/reviews?success=true");
        }}
      />
    </div>
  );
}
export const dynamic = "force-dynamic";
