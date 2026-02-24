"use client";

import { format } from "date-fns";
import {
  Calendar,
  Clock,
  DollarSign,
  User,
  AlertCircle,
  Star,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import Link from "next/link";
import { useCancelBooking, useMyBookings } from "../hooks/useBooking";

const statusConfig = {
  CONFIRMED: {
    label: "Confirmed",
    className:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 border-green-200",
  },
  COMPLETED: {
    label: "Completed",
    className:
      "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 border-blue-200",
  },
  CANCELLED: {
    label: "Cancelled",
    className:
      "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100 border-red-200",
  },
  NO_SHOW: {
    label: "No Show",
    className:
      "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100 border-gray-200",
  },
};

interface BookingListProps {
  filter?: "upcoming" | "past" | "all";
}

export function BookingList({ filter = "all" }: BookingListProps) {
  const { data: bookings, isLoading, error } = useMyBookings();
  const { mutate: cancelBooking, isPending: isCancelling } = useCancelBooking();
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const handleCancel = (bookingId: string) => {
    setCancellingId(bookingId);
    cancelBooking(bookingId, {
      onSettled: () => {
        setCancellingId(null);
      },
    });
  };

  const canCancel = (startTime: string) => {
    const sessionStart = new Date(startTime);
    const now = new Date();
    const hoursDifference =
      (sessionStart.getTime() - now.getTime()) / (1000 * 60 * 60);
    return hoursDifference > 24;
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-32" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-destructive">
        <CardContent className="py-8 text-center">
          <AlertCircle className="h-12 w-12 mx-auto mb-4 text-destructive" />
          <p className="text-destructive font-medium">
            Failed to load bookings. Please try again.
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => window.location.reload()}
          >
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!bookings || bookings.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">No Bookings Yet</h3>
          <p className="text-muted-foreground mb-4 max-w-sm mx-auto">
            You haven&apos;t booked any sessions yet. Browse our expert tutors
            and start learning today!
          </p>
          <Button asChild size="lg">
            <Link href="/tutors">Browse Tutors</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Filter logic
  const now = new Date();
  const filteredBookings = bookings.filter((booking) => {
    if (filter === "upcoming") {
      return (
        booking.status === "CONFIRMED" &&
        new Date(booking.availability.startTime) > now
      );
    }
    if (filter === "past") {
      return (
        booking.status !== "CONFIRMED" ||
        new Date(booking.availability.startTime) <= now
      );
    }
    return true;
  });

  if (filteredBookings.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <p className="text-muted-foreground">
            {filter === "upcoming"
              ? "No upcoming sessions found."
              : filter === "past"
                ? "No past sessions found."
                : "No bookings found."}
          </p>
          {filter === "upcoming" && (
            <Button asChild className="mt-4">
              <Link href="/tutors">Find a Tutor</Link>
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {filteredBookings.map((booking) => {
        const isUpcoming =
          booking.status === "CONFIRMED" &&
          new Date(booking.availability.startTime) > now;
        const canUserCancel =
          isUpcoming && canCancel(booking.availability.startTime);
        const isThisCancelling = isCancelling && cancellingId === booking.id;

        return (
          <Card
            key={booking.id}
            className="overflow-hidden hover:shadow-md transition-shadow"
          >
            <div
              className={`h-1 w-full ${
                booking.status === "CONFIRMED"
                  ? "bg-green-500"
                  : booking.status === "COMPLETED"
                    ? "bg-blue-500"
                    : "bg-gray-300"
              }`}
            />

            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <CardTitle className="text-xl">
                    Session with {booking.tutor.user.name}
                  </CardTitle>
                  <CardDescription className="mt-1">
                    Booking ID: {booking.id.slice(0, 8)}...
                  </CardDescription>
                </div>
                <Badge className={statusConfig[booking.status].className}>
                  {statusConfig[booking.status].label}
                </Badge>
              </div>
            </CardHeader>

            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span>
                    {format(
                      new Date(booking.availability.startTime),
                      "MMM dd, yyyy",
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span>
                    {format(new Date(booking.availability.startTime), "h:mm a")}{" "}
                    - {format(new Date(booking.availability.endTime), "h:mm a")}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="font-medium">${booking.priceSnapshot}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="truncate">{booking.tutor.user.name}</span>
                </div>
              </div>
            </CardContent>

            <CardFooter className="bg-muted/30 flex flex-col sm:flex-row gap-3 sm:justify-between">
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/tutors/${booking.tutor.id}`}>View Tutor</Link>
                </Button>
                {booking.status === "COMPLETED" && !booking.review && (
                  <Button size="sm" asChild variant="secondary">
                    <Link href={`/student/reviews/new?booking=${booking.id}`}>
                      <Star className="h-4 w-4 mr-1" />
                      Review
                    </Link>
                  </Button>
                )}
              </div>

              {booking.status === "CONFIRMED" && isUpcoming && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      size="sm"
                      disabled={!canUserCancel || isThisCancelling}
                    >
                      {isThisCancelling ? "Cancelling..." : "Cancel Booking"}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Cancel this session?</AlertDialogTitle>
                      <AlertDialogDescription>
                        {canUserCancel ? (
                          <>
                            Are you sure you want to cancel your session with{" "}
                            <span className="font-medium">
                              {booking.tutor.user.name}
                            </span>
                            ? This action cannot be undone.
                          </>
                        ) : (
                          <>
                            You cannot cancel this session because it&apos;s
                            less than 24 hours away. Please contact support if
                            you need assistance.
                          </>
                        )}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Go Back</AlertDialogCancel>
                      {canUserCancel && (
                        <AlertDialogAction
                          onClick={() => handleCancel(booking.id)}
                          className="bg-destructive hover:bg-destructive/90"
                        >
                          Yes, Cancel Booking
                        </AlertDialogAction>
                      )}
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}

              {booking.status === "COMPLETED" && booking.review && (
                <Badge variant="outline" className="text-green-600">
                  Review Submitted
                </Badge>
              )}
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
