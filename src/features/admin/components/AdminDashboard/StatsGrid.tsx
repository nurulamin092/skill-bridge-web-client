"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Users,
  BookOpen,
  UserCheck,
  Clock,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import { AdminStats } from "../../types/admin.types";
interface StatsGridProps {
  stats: AdminStats;
}

export function StatsGrid({ stats }: StatsGridProps) {
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
    <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {statCards.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title} className="hover:shadow-md transition-shadow">
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
  );
}
