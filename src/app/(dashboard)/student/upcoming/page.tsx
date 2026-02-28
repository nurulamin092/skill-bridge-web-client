import { getServerSession } from "@/lib/auth-server";
import { redirect } from "next/navigation";
import { BookingList } from "@/features/bookings/components/BookingList";

export default async function StudentUpcomingPage() {
  const session = await getServerSession();

  if (!session || session.user.role !== "STUDENT") {
    redirect("/login");
  }

  return (
    <div className="container max-w-4xl py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Upcoming Sessions</h1>
        <p className="text-muted-foreground mt-1">
          Your upcoming tutoring sessions
        </p>
      </div>
      <BookingList filter="upcoming" />
    </div>
  );
}
