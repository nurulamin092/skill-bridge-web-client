import { getServerSession } from "@/lib/auth-server";
import { redirect } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { BookingModal } from "@/features/bookings/components/BookingModal";
import { SingleTutor } from "@/features/tutors/types/tutor.types";

interface PageProps {
  searchParams: {
    tutorId?: string;
  };
}

async function getTutorData(tutorId: string): Promise<SingleTutor | null> {
  try {
    const response = await apiFetch<{ success: boolean; data: SingleTutor }>(
      `/tutors/${tutorId}`,
    );

    if (!response.success || !response.data) {
      return null;
    }

    return response.data;
  } catch (error) {
    console.error("Failed to fetch tutor:", error);
    return null;
  }
}

export default async function NewBookingPage({ searchParams }: PageProps) {
  const session = await getServerSession();

  if (!session || session.user.role !== "STUDENT") {
    redirect("/login");
  }

  const { tutorId } = searchParams;

  if (!tutorId) {
    redirect("/tutors");
  }

  const tutorData = await getTutorData(tutorId);

  if (!tutorData) {
    redirect("/tutors");
  }

  return (
    <div className="container max-w-4xl py-8">
      <BookingModal isOpen={true} onClose={() => {}} tutor={tutorData} />
    </div>
  );
}
