"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";

interface InfoCardProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export function InfoCard({ title, children, className }: InfoCardProps) {
  return (
    <Card className={className}>
      <CardContent className="p-4">
        <h3 className="font-semibold mb-3">{title}</h3>
        <div className="space-y-2 text-sm">{children}</div>
      </CardContent>
    </Card>
  );
}
