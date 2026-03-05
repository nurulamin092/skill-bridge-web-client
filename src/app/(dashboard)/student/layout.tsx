"use client";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { StudentSidebar } from "@/features/students/components/StudentSidebar";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    //  if (loading) return;
    // if (!loading && (!isAuthenticated || user?.role !== "STUDENT")) {
    //   router.push("/login?callbackUrl=/student");
    // }
    if (loading) return;

    if (!isAuthenticated) {
      router.replace("/login?callbackUrl=/student");
      return;
    }

    if (user?.role !== "STUDENT") {
      router.replace("/");
    }
  }, [isAuthenticated, user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== "STUDENT") {
    return null;
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <StudentSidebar />
        <main className="flex-1">
          <div className="lg:hidden p-4">
            <SidebarTrigger />
          </div>

          <div className="p-6">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
