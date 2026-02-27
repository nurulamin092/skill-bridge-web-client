"use client";

import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface SectionHeaderProps {
  title: string;
  viewAllLink?: string;
  viewAllText?: string;
  action?: ReactNode;
}

export function SectionHeader({
  title,
  viewAllLink,
  viewAllText = "View All",
  action,
}: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <div className="flex items-center gap-2">
        {action}
        {viewAllLink && (
          <Button variant="link" asChild>
            <Link href={viewAllLink}>{viewAllText} →</Link>
          </Button>
        )}
      </div>
    </div>
  );
}
