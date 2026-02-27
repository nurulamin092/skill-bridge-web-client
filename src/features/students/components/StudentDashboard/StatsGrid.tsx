"use client";

import { StatsCard } from "@/components/common/cards/StatsCard";
import { LucideIcon } from "lucide-react";

interface Stat {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  bg: string;
}

interface StatsGridProps {
  stats: Stat[];
}

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatsCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          color={stat.color}
          bg={stat.bg}
        />
      ))}
    </div>
  );
}
