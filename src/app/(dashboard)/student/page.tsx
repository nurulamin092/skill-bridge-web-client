import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/auth-server";
import { StudentDashboardClient } from "@/features/students/components/StudentDashboard";

export const metadata: Metadata = {
  title: "Student Dashboard | SkillBridge",
  description: "Manage your learning journey",
};

export default async function StudentDashboardPage() {
  const session = await getServerSession();
  console.log("[StudentPage] Session:", session ? "exists" : "none");

  const role = session?.user?.role?.toUpperCase();
  console.log("[StudentPage] User role:", role);

  if (!session) {
    console.log("[StudentPage] No session, redirecting to login");
    redirect("/login?callbackUrl=/student");
  }

  if (role !== "STUDENT") {
    console.log(`[StudentPage] Wrong role: ${role}, redirecting`);
    if (role === "TUTOR") redirect("/tutor");
    if (role === "ADMIN") redirect("/admin");
    redirect("/");
  }

  return (
    <StudentDashboardClient
      user={{
        id: session.user.id,
        name: session.user.name || "",
        email: session.user.email,
        image: session.user.image || "",
      }}
    />
  );
}
