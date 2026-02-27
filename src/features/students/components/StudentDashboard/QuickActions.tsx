"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface QuickActionsProps {
  hasUpcoming: boolean;
}

export function QuickActions({ hasUpcoming }: QuickActionsProps) {
  return (
    <div className="flex gap-3">
      <Button asChild variant="default">
        <Link href="/tutors">Find a Tutor</Link>
      </Button>
      {hasUpcoming && (
        <Button asChild variant="outline">
          <Link href="/student/upcoming">View Upcoming</Link>
        </Button>
      )}
    </div>
  );
}
