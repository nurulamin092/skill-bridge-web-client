"use client";

import { useAdminStats } from "../../hooks/useAdminStats";
import { CategoriesSummary } from "./CategoriesSummary";
import { DashboardError } from "./DashboardError";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardSkeleton } from "./DashboardSkeleton";
import { NoData } from "./NoData";
import { RecentActivity } from "./RecentActivity";
import { StatsGrid } from "./StatsGrid";

export function AdminDashboard() {
  const { data: stats, isLoading, error, refetch } = useAdminStats();

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return <DashboardError onRefresh={refetch} />;
  }

  if (!stats) {
    return <NoData onRefresh={refetch} />;
  }

  return (
    <div className="space-y-6">
      <DashboardHeader onRefresh={refetch} />
      <StatsGrid stats={stats} />
      <RecentActivity recentActivity={stats.recentActivity} />
      <CategoriesSummary categories={stats.categories} />
    </div>
  );
}
