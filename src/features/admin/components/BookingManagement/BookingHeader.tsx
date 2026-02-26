"use client";

import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface BookingHeaderProps {
  onRefresh: () => void;
  isLoading?: boolean;
}

export function BookingHeader({ onRefresh, isLoading }: BookingHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold">Booking Management</h1>
        <p className="text-muted-foreground mt-1">
          View and manage all platform bookings
        </p>
      </div>
      <Button
        variant="outline"
        onClick={onRefresh}
        size="sm"
        disabled={isLoading}
      >
        <RefreshCw
          className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
        />
        {isLoading ? "Refreshing..." : "Refresh"}
      </Button>
    </div>
  );
}
