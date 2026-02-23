"use client";

import { useMyBookings } from "@/features/bookings/hooks/useBooking";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, Star, DollarSign } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface StudentDashboardClientProps {
  user: {
    id: string;
    name: string;
    email: string;
    image?: string;
  };
}

export function StudentDashboardClient({ user }: StudentDashboardClientProps) {
  const { data: bookings, isLoading } = useMyBookings();

  const upcomingBookings =
    bookings?.filter(
      (b) =>
        b.status === "CONFIRMED" &&
        new Date(b.availability.startTime) > new Date(),
    ) || [];

  const completedBookings =
    bookings?.filter((b) => b.status === "COMPLETED") || [];

  const stats = [
    {
      title: "Upcoming Sessions",
      value: upcomingBookings.length,
      icon: Calendar,
      color: "text-blue-500",
      bg: "bg-blue-100 dark:bg-blue-900/20",
    },
    {
      title: "Completed Sessions",
      value: completedBookings.length,
      icon: Clock,
      color: "text-green-500",
      bg: "bg-green-100 dark:bg-green-900/20",
    },
    {
      title: "Reviews Given",
      value: bookings?.filter((b) => b.review).length || 0,
      icon: Star,
      color: "text-yellow-500",
      bg: "bg-yellow-100 dark:bg-yellow-900/20",
    },
    {
      title: "Total Spent",
      value: `$${completedBookings.reduce((sum, b) => sum + (b.priceSnapshot || 0), 0)}`,
      icon: DollarSign,
      color: "text-purple-500",
      bg: "bg-purple-100 dark:bg-purple-900/20",
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Welcome back, {user?.name}!</h1>
        <p className="text-muted-foreground mt-1">
          Here&apos;s what&apos;s happening with your learning journey
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bg}`}>
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          {upcomingBookings.length > 0 ? (
            <div className="space-y-4">
              {upcomingBookings.slice(0, 3).map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <p className="font-medium">{booking.tutor.user.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(booking.availability.startTime), "PPP")}{" "}
                      at{" "}
                      {format(
                        new Date(booking.availability.startTime),
                        "h:mm a",
                      )}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/student/bookings/${booking.id}`}>
                      View Details
                    </Link>
                  </Button>
                </div>
              ))}
              {upcomingBookings.length > 3 && (
                <Button variant="link" asChild className="w-full">
                  <Link href="/student/upcoming">View All Sessions →</Link>
                </Button>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
              <p className="text-muted-foreground">No upcoming sessions</p>
              <Button asChild className="mt-4">
                <Link href="/tutors">Find a Tutor</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
