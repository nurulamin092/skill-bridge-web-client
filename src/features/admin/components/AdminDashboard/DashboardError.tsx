"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface DashboardErrorProps {
  onRefresh: () => void;
}

export function DashboardError({ onRefresh }: DashboardErrorProps) {
  return (
    <Card>
      <CardContent className="py-12 text-center">
        <p className="text-destructive mb-4">Failed to load dashboard data</p>
        <Button onClick={onRefresh} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Try Again
        </Button>
      </CardContent>
    </Card>
  );
}
