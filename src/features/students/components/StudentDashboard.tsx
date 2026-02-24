"use client";

import { useMyBookings } from "@/features/bookings/hooks/useBooking";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, Star, DollarSign } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookingList } from "@/features/bookings/components/BookingList";

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

      {upcomingBookings.length > 0 && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Next Sessions</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/student/upcoming">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingBookings.slice(0, 3).map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
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
                      Details
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">All Sessions</h2>
        <Tabs defaultValue="upcoming" className="space-y-4">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past Sessions</TabsTrigger>
            <TabsTrigger value="all">All Bookings</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            <BookingList filter="upcoming" />
          </TabsContent>

          <TabsContent value="past">
            <BookingList filter="past" />
          </TabsContent>

          <TabsContent value="all">
            <BookingList filter="all" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
