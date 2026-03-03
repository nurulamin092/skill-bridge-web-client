"use client";

import { useStudentProfile } from "../../hooks/useStudentProfile";
import { useStudentBookings } from "../../hooks/useStudentBookings";
import { Calendar, Clock, DollarSign, Star } from "lucide-react";
import { ProfileHeader } from "./ProfileHeader";
import { PersonalInfo } from "./PersonalInfo";
import { StatsCard } from "./StatsCard";
import { RecentBookings } from "./RecentBookings";

import { LoadingSkeleton } from "@/components/common/feedback/LoadingSkeleton";
import { ErrorState } from "@/components/common/feedback/ErrorState";

export function StudentProfile() {
  const {
    data: profile,
    isLoading: profileLoading,
    error: profileError,
    refetch: refetchProfile,
  } = useStudentProfile();

  const {
    data: bookings,
    isLoading: bookingsLoading,
    error: bookingsError,
  } = useStudentBookings();

  const isLoading = profileLoading || bookingsLoading;
  const error = profileError || bookingsError;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <LoadingSkeleton type="card" rows={3} />
        <LoadingSkeleton type="card" rows={2} />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorState
        message="Failed to load profile"
        onRetry={() => {
          refetchProfile();
        }}
      />
    );
  }

  if (!profile) {
    return <ErrorState message="Profile not found" onRetry={refetchProfile} />;
  }

  const upcomingBookings =
    bookings?.filter((b) => b.status === "CONFIRMED") || [];

  const pastBookings = bookings?.filter((b) => b.status !== "CONFIRMED") || [];

  const stats = [
    {
      title: "Total Bookings",
      value: bookings?.length || 0,
      icon: Calendar,
      color: "text-blue-500",
      bg: "bg-blue-100 dark:bg-blue-900/20",
    },
    {
      title: "Upcoming",
      value: upcomingBookings.length,
      icon: Clock,
      color: "text-green-500",
      bg: "bg-green-100 dark:bg-green-900/20",
    },
    {
      title: "Completed",
      value: pastBookings.filter((b) => b.status === "COMPLETED").length,
      icon: Star,
      color: "text-yellow-500",
      bg: "bg-yellow-100 dark:bg-yellow-900/20",
    },
    {
      title: "Total Spent",
      value: `$${pastBookings.reduce((sum, b) => sum + b.priceSnapshot, 0)}`,
      icon: DollarSign,
      color: "text-purple-500",
      bg: "bg-purple-100 dark:bg-purple-900/20",
    },
  ];

  return (
    <div className="space-y-6">
      <ProfileHeader profile={profile} />

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      <PersonalInfo profile={profile} />

      {upcomingBookings.length > 0 && (
        <RecentBookings
          bookings={upcomingBookings.slice(0, 3)}
          title="Upcoming Sessions"
        />
      )}

      {pastBookings.length > 0 && (
        <RecentBookings
          bookings={pastBookings.slice(0, 3)}
          title="Past Sessions"
        />
      )}
    </div>
  );
}
