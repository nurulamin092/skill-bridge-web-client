"use client";

import { useMyBookings } from "@/features/bookings/hooks/useBooking";
import { Calendar, Clock, Star, DollarSign } from "lucide-react";
import { StatsGrid } from "./StatsGrid";

import { SessionsTabs } from "./SessionsTabs";
import { QuickActions } from "./QuickActions";

import { PageHeader } from "@/components/common/layout/PageHeader";
import { LoadingSkeleton } from "@/components/common/feedback/LoadingSkeleton";
import { ErrorState } from "@/components/common/feedback/ErrorState";
import { UpcomingPreview } from "./UpcomingPreview";

interface StudentDashboardClientProps {
  user: {
    id: string;
    name: string;
    email: string;
    image?: string;
  };
}

export function StudentDashboardClient({ user }: StudentDashboardClientProps) {
  const { data: bookings, isLoading, error, refetch } = useMyBookings();

  const upcomingBookings =
    bookings?.filter(
      (b) =>
        b.status === "CONFIRMED" &&
        new Date(b.availability.startTime) > new Date(),
    ) || [];

  const completedBookings =
    bookings?.filter((b) => b.status === "COMPLETED") || [];

  const totalSpent = completedBookings.reduce(
    (sum, b) => sum + (b.priceSnapshot || 0),
    0,
  );

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
      value: `$${totalSpent}`,
      icon: DollarSign,
      color: "text-purple-500",
      bg: "bg-purple-100 dark:bg-purple-900/20",
    },
  ];

  if (isLoading) {
    return (
      <div className="space-y-6 p-6">
        <LoadingSkeleton type="card" rows={4} />
        <LoadingSkeleton type="table" rows={3} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <ErrorState
          title="Failed to load dashboard"
          message="There was an error loading your dashboard data. Please try again."
          onRetry={refetch}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title={`Welcome back, ${user.name}!`}
        description="Here's what's happening with your learning journey"
      />

      <StatsGrid stats={stats} />

      <QuickActions hasUpcoming={upcomingBookings.length > 0} />

      {upcomingBookings.length > 0 && (
        <UpcomingPreview bookings={upcomingBookings.slice(0, 3)} />
      )}

      <SessionsTabs />
    </div>
  );
}
