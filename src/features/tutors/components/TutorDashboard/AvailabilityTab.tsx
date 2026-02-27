"use client";

import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/common/feedback/EmptyState";
import Link from "next/link";

export function AvailabilityTab() {
  return (
    <EmptyState
      icon={<Clock className="h-12 w-12 text-muted-foreground" />}
      title="Set Your Availability"
      message="Manage your available time slots to let students book sessions with you."
      action={
        <Button asChild className="mt-4">
          <Link href="/tutor/availability">Manage Availability</Link>
        </Button>
      }
    />
  );
}
