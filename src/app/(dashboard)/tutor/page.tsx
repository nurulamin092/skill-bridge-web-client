import { TutorDashboard } from "@/features/tutors/components/TutorDashboard/index";
import { getServerSession } from "@/lib/auth-server";
import { redirect } from "next/navigation";

export default async function TutorDashboardPage() {
  const session = await getServerSession();
  if (!session) {
    redirect("/login?callbackUrl=/tutor");
  }

  if (session.user.role !== "TUTOR") {
    if (session.user.role === "STUDENT") redirect("/student");
    if (session.user.role === "ADMIN") redirect("/admin");
    redirect("/");
  }

  return <TutorDashboard />;
}
export const dynamic = "force-dynamic";
