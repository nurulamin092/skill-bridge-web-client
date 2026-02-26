"use client";

import { useAdminStats } from "../hooks/useAdminStats";
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
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { toast } from "sonner";

interface RecentUser {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: string;
  createdAt: string;
}

interface RecentBooking {
  id: string;
  student: {
    name: string;
  };
  tutor: {
    user: {
      name: string;
    };
  };
  createdAt: string;
  status: string;
}

interface CategoryStat {
  id: string;
  name: string;
  tutorCount: number;
}

export function AdminDashboard() {
  const { data: stats, isLoading, error, refetch } = useAdminStats();

  const handleRefresh = () => {
    refetch();
    toast.success("Dashboard refreshed");
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-10 w-24" />
        </div>
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
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

  if (error) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-destructive mb-4">Failed to load dashboard data</p>
          <Button onClick={handleRefresh} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!stats) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground mb-4">No data available</p>
          <Button onClick={handleRefresh} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </CardContent>
      </Card>
    );
  }

  const statCards = [
    {
      title: "Total Users",
      value: stats.overview?.totalUsers ?? 0,
      icon: Users,
      color: "text-blue-500",
      bg: "bg-blue-100 dark:bg-blue-900/20",
    },
    {
      title: "Total Tutors",
      value: stats.overview?.tutors?.total ?? 0,
      icon: UserCheck,
      color: "text-green-500",
      bg: "bg-green-100 dark:bg-green-900/20",
    },
    {
      title: "Total Students",
      value: stats.overview?.totalStudents ?? 0,
      icon: Users,
      color: "text-purple-500",
      bg: "bg-purple-100 dark:bg-purple-900/20",
    },
    {
      title: "Pending Tutors",
      value: stats.overview?.pendingTutorApproved ?? 0,
      icon: Clock,
      color: "text-yellow-500",
      bg: "bg-yellow-100 dark:bg-yellow-900/20",
    },
    {
      title: "Total Bookings",
      value: stats.overview?.bookings?.total ?? 0,
      icon: BookOpen,
      color: "text-indigo-500",
      bg: "bg-indigo-100 dark:bg-indigo-900/20",
    },
    {
      title: "Today's Bookings",
      value: stats.overview?.bookings?.today ?? 0,
      icon: TrendingUp,
      color: "text-pink-500",
      bg: "bg-pink-100 dark:bg-pink-900/20",
    },
    {
      title: "Total Revenue",
      value: `$${stats.overview?.revenue?.total ?? 0}`,
      icon: DollarSign,
      color: "text-emerald-500",
      bg: "bg-emerald-100 dark:bg-emerald-900/20",
    },
    {
      title: "Weekly Revenue",
      value: `$${stats.overview?.revenue?.weekly ?? 0}`,
      icon: TrendingUp,
      color: "text-orange-500",
      bg: "bg-orange-100 dark:bg-orange-900/20",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here &apos s what &apos s happening on your platform
          </p>
        </div>
        <Button variant="outline" onClick={handleRefresh} size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
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
              {stats.recentActivity?.users &&
              stats.recentActivity.users.length > 0 ? (
                (stats.recentActivity.users as RecentUser[]).map((user) => (
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
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No recent users
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentActivity?.bookings &&
              stats.recentActivity.bookings.length > 0 ? (
                (stats.recentActivity.bookings as RecentBooking[]).map(
                  (booking) => (
                    <div
                      key={booking.id}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <p className="font-medium">{booking.student?.name}</p>
                        <p className="text-sm text-muted-foreground">
                          with {booking.tutor?.user?.name}
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(booking.createdAt), "MMM dd")}
                      </p>
                    </div>
                  ),
                )
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No recent bookings
                </p>
              )}
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
            {stats.categories && stats.categories.length > 0 ? (
              (stats.categories as CategoryStat[]).map((category) => (
                <div key={category.id} className="p-3 border rounded-lg">
                  <p className="font-medium">{category.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {category.tutorCount ?? 0} tutors
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground col-span-full text-center py-4">
                No categories available
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
