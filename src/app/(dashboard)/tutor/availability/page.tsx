import { AvailabilityManagement } from "@/features/availability/components/AvailabilityManagement";
import { getServerSession } from "@/lib/auth-server";
import { redirect } from "next/navigation";

export default async function TutorAvailabilityPage() {
  const session = await getServerSession();

  if (!session || session.user.role !== "TUTOR") {
    redirect("/login");
  }

  return (
    <div className="container max-w-4xl py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Manage Availability</h1>
        <p className="text-muted-foreground mt-1">
          Set your available time slots for students to book sessions
        </p>
      </div>
      <AvailabilityManagement />
    </div>
  );
}
