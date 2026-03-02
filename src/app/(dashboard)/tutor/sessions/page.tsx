import { TutorSessions } from "@/features/tutors/components/TutorSessions";
import { getServerSession } from "@/lib/auth-server";
import { redirect } from "next/navigation";

export default async function TutorSessionsPage() {
  const session = await getServerSession();

  if (!session || session.user.role !== "TUTOR") {
    redirect("/login");
  }

  return (
    <div className="container max-w-4xl py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">My Sessions</h1>
        <p className="text-muted-foreground mt-1">
          View and manage your upcoming and past sessions
        </p>
      </div>
      <TutorSessions />
    </div>
  );
}
export const dynamic = "force-dynamic";
