import { getServerSession } from "@/lib/auth-server";
import { redirect } from "next/navigation";
import { BookingManagement } from "@/features/admin/components/BookingManagement";

export default async function AdminBookingsPage() {
  const session = await getServerSession();

  if (!session || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  return (
    <div className="container mx-auto py-6">
      <BookingManagement />
    </div>
  );
}
export const dynamic = "force-dynamic";
