"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Clock, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { LoadingSkeleton } from "@/components/common/feedback/LoadingSkeleton";
import { ErrorState } from "@/components/common/feedback/ErrorState";
import { EmptyState } from "@/components/common/feedback/EmptyState";

import {
  useAvailability,
  useCreateAvailability,
  useDeleteAvailability,
} from "../hooks/useAvailability";
import { AvailabilitySlot } from "../types/availability.types";

export function AvailabilityManagement() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");

  const { data: slots, isLoading, error, refetch } = useAvailability();
  const createSlot = useCreateAvailability();
  const deleteSlot = useDeleteAvailability();

  const handleAddSlot = () => {
    if (!selectedDate) {
      toast.error("Please select a date");
      return;
    }

    const startDateTime = new Date(selectedDate);
    const [startHour, startMinute] = startTime.split(":").map(Number);
    startDateTime.setHours(startHour, startMinute, 0, 0);

    const endDateTime = new Date(selectedDate);
    const [endHour, endMinute] = endTime.split(":").map(Number);
    endDateTime.setHours(endHour, endMinute, 0, 0);

    if (startDateTime >= endDateTime) {
      toast.error("End time must be after start time");
      return;
    }

    if (startDateTime < new Date()) {
      toast.error("Cannot add slots in the past");
      return;
    }

    createSlot.mutate({
      startTime: startDateTime.toISOString(),
      endTime: endDateTime.toISOString(),
    });
  };

  const handleDeleteSlot = (slotId: string) => {
    deleteSlot.mutate(slotId);
  };

  if (isLoading) {
    return <LoadingSkeleton type="card" rows={3} />;
  }

  if (error) {
    return (
      <ErrorState message="Failed to load availability" onRetry={refetch} />
    );
  }

  const isPending = createSlot.isPending || deleteSlot.isPending;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Time Slot</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Select Date</Label>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => date < new Date()}
                className="rounded-md border"
              />
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="startTime">Start Time</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  step="1800"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endTime">End Time</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  step="1800"
                />
              </div>
              <Button
                onClick={handleAddSlot}
                disabled={isPending}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Slot
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Availability Slots</CardTitle>
        </CardHeader>
        <CardContent>
          {slots && slots.length > 0 ? (
            <div className="space-y-2">
              {slots.map((slot: AvailabilitySlot) => (
                <div
                  key={slot.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">
                        {format(new Date(slot.startTime), "EEEE, MMM d, yyyy")}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(slot.startTime), "h:mm a")} -{" "}
                        {format(new Date(slot.endTime), "h:mm a")}
                      </p>
                    </div>
                  </div>
                  {!slot.isBooked && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteSlot(slot.id)}
                      disabled={isPending}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<Clock className="h-12 w-12 text-muted-foreground" />}
              title="No slots added"
              message="Add your first availability slot to start receiving bookings."
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
