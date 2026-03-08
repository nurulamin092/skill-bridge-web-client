import { TutorProfileForm } from "@/features/tutors/components/TutorProfileForm/index";
import { getServerSession } from "@/lib/auth-server";
import { redirect } from "next/navigation";

export default async function TutorProfilePage() {
  const session = await getServerSession();

  if (!session || session.user.role !== "TUTOR") {
    redirect("/login");
  }

  return (
    <div className="container max-w-4xl py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Tutor Profile</h1>
        <p className="text-muted-foreground mt-1">
          Manage your tutor profile information
        </p>
      </div>
      <TutorProfileForm />
    </div>
  );
}
export const dynamic = "force-dynamic";
