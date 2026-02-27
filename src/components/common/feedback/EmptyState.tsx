"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface EmptyStateProps {
  icon?: ReactNode;
  title?: string;
  message: string;
  action?: ReactNode;
  clearSearch?: () => void;
}

export function EmptyState({
  icon,
  title = "No Data Found",
  message,
  action,
  clearSearch,
}: EmptyStateProps) {
  return (
    <Card>
      <CardContent className="py-12 text-center">
        {icon && <div className="flex justify-center mb-4">{icon}</div>}
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground max-w-sm mx-auto">{message}</p>
        {clearSearch && (
          <Button variant="link" onClick={clearSearch} className="mt-2">
            Clear search
          </Button>
        )}
        {action && <div className="mt-4">{action}</div>}
      </CardContent>
    </Card>
  );
}
