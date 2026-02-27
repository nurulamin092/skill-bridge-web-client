"use client";

import { Calendar } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { format } from "date-fns";
import { SectionHeader } from "@/components/common/layout/SectionHeader";
import { Booking } from "@/features/bookings/types/booking.types";

interface UpcomingPreviewProps {
  bookings: Booking[];
}

export function UpcomingPreview({ bookings }: UpcomingPreviewProps) {
  if (bookings.length === 0) return null;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <SectionHeader
          title="Next Sessions"
          viewAllLink="/student/upcoming"
          viewAllText="View All"
        />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{booking.tutor.user.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {format(
                      new Date(booking.availability.startTime),
                      "EEE, MMM d, h:mm a",
                    )}
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href={`/student/bookings/${booking.id}`}>Details</Link>
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
