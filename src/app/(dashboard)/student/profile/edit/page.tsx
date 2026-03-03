import { getServerSession } from "@/lib/auth-server";
import { redirect } from "next/navigation";
import { StudentProfileForm } from "@/features/students/components/StudentProfileForm";

export default async function EditStudentProfilePage() {
  const session = await getServerSession();

  if (!session || session.user.role !== "STUDENT") {
    redirect("/login");
  }

  return (
    <div className="container max-w-2xl py-8">
      <StudentProfileForm />
    </div>
  );
}
export const dynamic = "force-dynamic";
