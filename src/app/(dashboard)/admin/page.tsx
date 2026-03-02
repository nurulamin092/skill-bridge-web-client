import { AdminDashboard } from "@/features/admin/components/AdminDashboard/index";
import { getServerSession } from "@/lib/auth-server";
import { redirect } from "next/navigation";

export default async function AdminDashboardPage() {
  const session = await getServerSession();

  if (!session || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  return <AdminDashboard />;
}

export const dynamic = "force-dynamic";
