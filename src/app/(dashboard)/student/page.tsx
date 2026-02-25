import { getServerSession } from "@/lib/auth-server";
import { redirect } from "next/navigation";
import { StudentDashboardClient } from "@/features/students/components/StudentDashboard";

export default async function StudentDashboardPage() {
  const session = await getServerSession();
  if (!session) {
    console.log("[StudentPage] No session, redirecting to login");
    redirect("/login?callbackUrl=/student");
  }
  if (session.user.role !== "STUDENT") {
    console.log(`StudentPage Wrong role: ${session.user.role}, redirecting`);
    if (session.user.role === "TUTOR") redirect("/tutor");
    if (session.user.role === "ADMIN") redirect("/admin");
    redirect("/");
  }

  return (
    <StudentDashboardClient
      user={{
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
      }}
    />
  );
}
