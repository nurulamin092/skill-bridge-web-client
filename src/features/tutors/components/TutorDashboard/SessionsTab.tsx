"use client";

import { Calendar } from "lucide-react";
import { EmptyState } from "@/components/common/feedback/EmptyState";

export function SessionsTab() {
  return (
    <EmptyState
      icon={<Calendar className="h-12 w-12 text-muted-foreground" />}
      title="Coming Soon"
      message="Session management feature will be available soon. You'll be able to view and manage your upcoming sessions here."
    />
  );
}
