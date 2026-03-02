import { UserManagement } from "@/features/admin/components/UserManagement/index";
import { getServerSession } from "@/lib/auth-server";
import { redirect } from "next/navigation";

export default async function AdminUsersPage() {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="container mx-auto py-6">
      <UserManagement />
    </div>
  );
}
export const dynamic = "force-dynamic";
