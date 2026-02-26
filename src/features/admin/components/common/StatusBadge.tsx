"use client";

import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: "active" | "banned" | "approved" | "pending";
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const styles = {
    active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
    banned: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
    approved:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
    pending:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
  };

  const labels = {
    active: "Active",
    banned: "Banned",
    approved: "Approved",
    pending: "Pending",
  };

  return <Badge className={styles[status]}>{labels[status]}</Badge>;
}
