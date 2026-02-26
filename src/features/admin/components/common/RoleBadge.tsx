"use client";

import { Badge } from "@/components/ui/badge";

interface RoleBadgeProps {
  role: "ADMIN" | "TUTOR" | "STUDENT";
}

export function RoleBadge({ role }: RoleBadgeProps) {
  const styles = {
    ADMIN:
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100",
    TUTOR: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
    STUDENT: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
  };

  return <Badge className={styles[role]}>{role}</Badge>;
}
