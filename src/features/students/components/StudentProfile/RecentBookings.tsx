"use client";

import { format } from "date-fns";
import { Calendar, Clock, DollarSign, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { StudentBooking } from "../../types/student.types";

interface RecentBookingsProps {
  bookings: StudentBooking[];
  title: string;
}

const statusColors = {
  CONFIRMED:
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
  COMPLETED: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
  CANCELLED: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
  NO_SHOW: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100",
};

export function RecentBookings({ bookings, title }: RecentBookingsProps) {
  if (bookings.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            No {title.toLowerCase()} found
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors gap-4"
          >
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{booking.tutor.user.name}</span>
                <Badge className={statusColors[booking.status]}>
                  {booking.status}
                </Badge>
              </div>

              {booking.availability && (
                <>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {format(
                      new Date(booking.availability.startTime),
                      "MMM dd, yyyy",
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {format(
                      new Date(booking.availability.startTime),
                      "h:mm a",
                    )}{" "}
                    - {format(new Date(booking.availability.endTime), "h:mm a")}
                  </div>
                </>
              )}

              <div className="flex items-center gap-2 text-sm">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">${booking.priceSnapshot}</span>
              </div>
            </div>

            <Button variant="outline" size="sm" asChild>
              <Link href={`/student/bookings/${booking.id}`}>View Details</Link>
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
