"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface EmptyStateProps {
  message: string;
  action?: ReactNode;
  clearSearch?: () => void;
}

export function EmptyState({ message, action, clearSearch }: EmptyStateProps) {
  return (
    <Card>
      <CardContent className="py-12 text-center">
        <p className="text-muted-foreground">{message}</p>
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
