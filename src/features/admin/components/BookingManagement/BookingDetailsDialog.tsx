"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, XCircle } from "lucide-react";
import { format } from "date-fns";
import { Booking } from "./types";

interface BookingDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  booking: Booking | null;
  onCancelBooking?: (bookingId: string) => void;
}

const statusColors = {
  CONFIRMED:
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
  COMPLETED: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
  CANCELLED: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
  NO_SHOW: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100",
};

export function BookingDetailsDialog({
  open,
  onOpenChange,
  booking,
  onCancelBooking,
}: BookingDetailsDialogProps) {
  if (!booking) return null;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Booking Details</DialogTitle>
          <DialogDescription>
            Complete information about this booking
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex justify-end">
            <Badge className={statusColors[booking.status]}>
              {booking.status}
            </Badge>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Student Information
                </h3>
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={booking.student.image || ""}
                      alt={booking.student.name}
                    />
                    <AvatarFallback>
                      {getInitials(booking.student.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{booking.student.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {booking.student.email}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Tutor Information
                </h3>
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={booking.tutor.user.image || ""}
                      alt={booking.tutor.user.name}
                    />
                    <AvatarFallback>
                      {getInitials(booking.tutor.user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{booking.tutor.user.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {booking.tutor.user.email}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">Session Details</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date:</span>
                  <span className="font-medium">
                    {format(
                      new Date(booking.availability.startTime),
                      "EEEE, MMMM dd, yyyy",
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Time:</span>
                  <span className="font-medium">
                    {format(new Date(booking.availability.startTime), "h:mm a")}{" "}
                    - {format(new Date(booking.availability.endTime), "h:mm a")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="font-medium">
                    {Math.round(
                      (new Date(booking.availability.endTime).getTime() -
                        new Date(booking.availability.startTime).getTime()) /
                        (1000 * 60),
                    )}{" "}
                    minutes
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount:</span>
                  <span className="font-medium text-lg">
                    ${booking.priceSnapshot}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {booking.review && (
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">Student Review</h3>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`text-lg ${
                          star <= booking.review!.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({booking.review.rating}/5)
                  </span>
                </div>
                {booking.review.comment && (
                  <p className="text-sm text-muted-foreground mt-2">
                    &quot;{booking.review.comment}&quot;
                  </p>
                )}
              </CardContent>
            </Card>
          )}

          <div className="text-xs text-muted-foreground border-t pt-4">
            <div className="flex justify-between">
              <span>Booking ID: {booking.id}</span>
              <span>Created: {format(new Date(booking.createdAt), "PPp")}</span>
            </div>
          </div>

          {booking.status === "CONFIRMED" && onCancelBooking && (
            <div className="flex justify-end">
              <Button
                variant="destructive"
                onClick={() => {
                  onCancelBooking(booking.id);
                  onOpenChange(false);
                }}
              >
                <XCircle className="h-4 w-4 mr-2" />
                Cancel Booking
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
