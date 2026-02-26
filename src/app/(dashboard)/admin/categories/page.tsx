import { CategoryManagement } from "@/features/admin/components/CategoryManagement";
import { getServerSession } from "@/lib/auth-server";
import { redirect } from "next/navigation";

export default async function AdminCategoriesPage() {
  const session = await getServerSession();
  if (!session || session.user.role !== "ADMIN") {
    redirect("/login");
  }
  return <CategoryManagement />;
}
