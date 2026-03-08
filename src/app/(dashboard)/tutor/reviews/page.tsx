import { MyReviewsList } from "@/features/reviews/components/MyReviewsList";
import { getServerSession } from "@/lib/auth-server";
import { redirect } from "next/navigation";

export default async function TutorReviewsPage() {
  const session = await getServerSession();

  if (!session || session.user.role !== "TUTOR") {
    redirect("/login");
  }

  return (
    <div className="container max-w-4xl py-8">
      <MyReviewsList />
    </div>
  );
}
