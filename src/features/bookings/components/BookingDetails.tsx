"use client";

import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, DollarSign, User, Star } from "lucide-react";
import Link from "next/link";
import { Booking } from "../types/booking.types";

interface BookingDetailsProps {
  booking: Booking;
}

const statusConfig = {
  CONFIRMED: {
    label: "Confirmed",
    className:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
  },
  COMPLETED: {
    label: "Completed",
    className: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
  },
  CANCELLED: {
    label: "Cancelled",
    className: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
  },
  NO_SHOW: {
    label: "No Show",
    className: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100",
  },
};

export function BookingDetails({ booking }: BookingDetailsProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Booking Details</h1>
        <Button variant="outline" asChild>
          <Link href="/student">Back to Dashboard</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Session with {booking.tutor.user.name}</CardTitle>
            <Badge className={statusConfig[booking.status].className}>
              {statusConfig[booking.status].label}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h3 className="font-semibold">Date & Time</h3>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4" />
                {format(
                  new Date(booking.availability.startTime),
                  "EEEE, MMMM dd, yyyy",
                )}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4" />
                {format(
                  new Date(booking.availability.startTime),
                  "h:mm a",
                )} - {format(new Date(booking.availability.endTime), "h:mm a")}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">Payment</h3>
              <div className="flex items-center gap-2 text-sm">
                <DollarSign className="h-4 w-4" />
                <span className="font-medium">${booking.priceSnapshot}</span>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold mb-2">Tutor Information</h3>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{booking.tutor.user.name}</span>
            </div>
          </div>

          {booking.review && (
            <div className="border-t pt-4">
              <h3 className="font-semibold mb-2">Your Review</h3>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star <= booking.review!.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  ({booking.review.rating}/5)
                </span>
              </div>
              {booking.review.comment && (
                <p className="text-sm text-muted-foreground">
                  &quot{booking.review.comment}&quot
                </p>
              )}
            </div>
          )}

          <div className="border-t pt-4 text-sm text-muted-foreground">
            <p>Booking ID: {booking.id}</p>
            <p>Created: {format(new Date(booking.createdAt), "PPp")}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
