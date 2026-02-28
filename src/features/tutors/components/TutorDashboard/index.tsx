"use client";

import { useMyTutorReviews } from "../../hooks/useTutorReviews";
import { useTutorProfile } from "../../hooks/useTutorProfile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Star, Calendar, Users, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

import { PageHeader } from "@/components/common/layout/PageHeader";
import { ErrorState } from "@/components/common/feedback/ErrorState";
import { StatsGrid } from "./StatsGrid";
import { ReviewsTab } from "./ReviewsTab";
import { SessionsTab } from "./SessionsTab";
import { AvailabilityTab } from "./AvailabilityTab";

export function TutorDashboard() {
  const { data: profile, isLoading: profileLoading } = useTutorProfile();

  const {
    data: reviews,
    isLoading: reviewsLoading,
    error,
    refetch,
  } = useMyTutorReviews({
    enabled: profile?.isApproved === true,
  });

  const isLoading = profileLoading || (profile?.isApproved && reviewsLoading);

  if (profile && !profile.isApproved) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <AlertCircle className="h-12 w-12 mx-auto mb-4 text-yellow-500" />
          <h2 className="text-2xl font-bold mb-2">Profile Pending Approval</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Your tutor profile is currently under review by our admin team. You
            &apos; ll be able to access all features once approved.
          </p>
        </CardContent>
      </Card>
    );
  }

  const totalReviews = reviews?.length || 0;
  const averageRating = reviews?.length
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(
        1,
      )
    : "0.0";

  const stats = [
    {
      title: "Total Reviews",
      value: totalReviews,
      icon: Star,
      color: "text-yellow-500",
      bg: "bg-yellow-100 dark:bg-yellow-900/20",
    },
    {
      title: "Average Rating",
      value: averageRating,
      icon: Star,
      color: "text-purple-500",
      bg: "bg-purple-100 dark:bg-purple-900/20",
    },
    {
      title: "Total Sessions",
      value: "0",
      icon: Calendar,
      color: "text-blue-500",
      bg: "bg-blue-100 dark:bg-blue-900/20",
    },
    {
      title: "Students",
      value: "0",
      icon: Users,
      color: "text-green-500",
      bg: "bg-green-100 dark:bg-green-900/20",
    },
  ];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-64" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <ErrorState
        title="Failed to load dashboard"
        message="There was an error loading your dashboard data."
        onRetry={refetch}
      />
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Tutor Dashboard"
        description="Manage your sessions and reviews"
      />

      <StatsGrid stats={stats} />

      <Tabs defaultValue="reviews" className="space-y-4">
        <TabsList>
          <TabsTrigger value="reviews">Reviews Received</TabsTrigger>
          <TabsTrigger value="sessions">Upcoming Sessions</TabsTrigger>
          <TabsTrigger value="availability">Availability</TabsTrigger>
        </TabsList>

        <TabsContent value="reviews" className="space-y-4">
          <ReviewsTab reviews={reviews} />
        </TabsContent>

        <TabsContent value="sessions">
          <SessionsTab />
        </TabsContent>

        <TabsContent value="availability">
          <AvailabilityTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
