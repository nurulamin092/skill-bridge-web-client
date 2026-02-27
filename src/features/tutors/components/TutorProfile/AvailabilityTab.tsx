"use client";

import { format } from "date-fns";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

// Common Components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/common/feedback/EmptyState";

import { SingleTutor } from "../../types/tutor.types";

interface AvailabilityTabProps {
  availabilities: SingleTutor["availabilities"];
  onBookSession: () => void;
  isBookDisabled: boolean;
}

export function AvailabilityTab({
  availabilities,
  onBookSession,
  isBookDisabled,
}: AvailabilityTabProps) {
  if (!availabilities?.length) {
    return (
      <EmptyState
        icon={<Clock className="h-12 w-12 text-muted-foreground" />}
        title="No Available Slots"
        message="This tutor hasn't set any availability slots yet. Check back later!"
      />
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Available Time Slots</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {availabilities.map((slot) => (
            <Card
              key={slot.id}
              className="p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col space-y-3">
                <div className="space-y-1">
                  <p className="font-medium text-primary">
                    {format(new Date(slot.startTime), "EEEE")}
                  </p>
                  <p className="text-sm">
                    {format(new Date(slot.startTime), "MMM dd, yyyy")}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(slot.startTime), "h:mm a")} -{" "}
                    {format(new Date(slot.endTime), "h:mm a")}
                  </p>
                </div>
                <Button
                  size="sm"
                  onClick={onBookSession}
                  disabled={isBookDisabled}
                  className="w-full"
                >
                  Book This Slot
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
