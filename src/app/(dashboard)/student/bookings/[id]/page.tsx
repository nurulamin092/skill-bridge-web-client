import { getServerSession } from "@/lib/auth-server";
import { redirect } from "next/navigation";
import { BookingDetails } from "@/features/bookings/components/BookingDetails";

type tParams = Promise<{ id: string }>;

export default async function BookingDetailsPage(props: { params: tParams }) {
  const { id } = await props.params;

  const session = await getServerSession();

  if (!session || session.user.role !== "STUDENT") {
    redirect("/login");
  }

  return (
    <div className="container max-w-4xl py-8">
      <BookingDetails bookingId={id} />
    </div>
  );
}
export const dynamic = "force-dynamic";
