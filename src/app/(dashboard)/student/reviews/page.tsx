import { getServerSession } from "@/lib/auth-server";
import { redirect } from "next/navigation";
import { MyReviewsList } from "@/features/reviews/components/MyReviewsList";

export default async function MyReviewsPage() {
  const session = await getServerSession();

  if (!session || session.user.role !== "STUDENT") {
    redirect("/login");
  }

  return (
    <div className="container max-w-4xl py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">My Reviews</h1>
        <p className="text-muted-foreground mt-1">
          All the reviews you&apos;ve given to tutors
        </p>
      </div>

      <MyReviewsList />
    </div>
  );
}
export const dynamic = "force-dynamic";
