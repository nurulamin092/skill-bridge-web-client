"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  BookOpen,
  UserCheck,
  Clock,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { useAdminStats } from "../hooks/useAdminStats";

export function AdminDashboard() {
  const { data: stats, isLoading, error } = useAdminStats();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-8 w-16" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-destructive">Failed to load dashboard data</p>
        </CardContent>
      </Card>
    );
  }

  const statCards = [
    {
      title: "Total Users",
      value: stats.overview.totalUsers,
      icon: Users,
      color: "text-blue-500",
      bg: "bg-blue-100 dark:bg-blue-900/20",
    },
    {
      title: "Total Tutors",
      value: stats.overview.tutors.total,
      icon: UserCheck,
      color: "text-green-500",
      bg: "bg-green-100 dark:bg-green-900/20",
    },
    {
      title: "Total Students",
      value: stats.overview.totalStudents,
      icon: Users,
      color: "text-purple-500",
      bg: "bg-purple-100 dark:bg-purple-900/20",
    },
    {
      title: "Pending Tutors",
      value: stats.overview.pendingTutorApproved,
      icon: Clock,
      color: "text-yellow-500",
      bg: "bg-yellow-100 dark:bg-yellow-900/20",
    },
    {
      title: "Total Bookings",
      value: stats.overview.bookings.total,
      icon: BookOpen,
      color: "text-indigo-500",
      bg: "bg-indigo-100 dark:bg-indigo-900/20",
    },
    {
      title: "Today's Bookings",
      value: stats.overview.bookings.today,
      icon: TrendingUp,
      color: "text-pink-500",
      bg: "bg-pink-100 dark:bg-pink-900/20",
    },
    {
      title: "Total Revenue",
      value: `$${stats.overview.revenue.total}`,
      icon: DollarSign,
      color: "text-emerald-500",
      bg: "bg-emerald-100 dark:bg-emerald-900/20",
    },
    {
      title: "Weekly Revenue",
      value: `$${stats.overview.revenue.weekly}`,
      icon: TrendingUp,
      color: "text-orange-500",
      bg: "bg-orange-100 dark:bg-orange-900/20",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back! Here &apos;s what &apos s happening on your platform
        </p>
      </div>

      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.title}
              className="hover:shadow-md transition-shadow"
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <div className={`p-2 rounded-full ${stat.bg}`}>
                    <Icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentActivity.users.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(user.createdAt), "MMM dd")}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentActivity.bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium">{booking.student.name}</p>
                    <p className="text-sm text-muted-foreground">
                      with {booking.tutor.user.name}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(booking.createdAt), "MMM dd")}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
            {stats.categories.map((category) => (
              <div key={category.id} className="p-3 border rounded-lg">
                <p className="font-medium">{category.name}</p>
                <p className="text-sm text-muted-foreground">
                  {category.tutorCount} tutors
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
