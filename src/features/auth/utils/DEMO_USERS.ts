import { BookOpen, Crown, GraduationCap, Shield } from "lucide-react";

export const DEMO_USERS = [
  {
    role: "Student",
    email: "rushda@gmail.com",
    password: "pass1234",
    icon: GraduationCap,
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    border: "hover:border-blue-200 dark:hover:border-blue-800",
  },
  {
    role: "Tutor",
    email: "foyzul@t.com",
    password: "pass1234",
    icon: BookOpen,
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    border: "hover:border-emerald-200 dark:hover:border-emerald-800",
  },
  {
    role: "Admin",
    email: "super@admin.com",
    password: "Pass@3097",
    icon: Shield,
    color: "text-purple-500",
    bg: "bg-purple-50 dark:bg-purple-950/30",
    border: "hover:border-purple-200 dark:hover:border-purple-800",
  },
  {
    role: "Super Admin",
    email: "super@admin.com",
    password: "Pass@3097",
    icon: Crown,
    color: "text-amber-500",
    bg: "bg-amber-50 dark:bg-amber-950/30",
    border: "hover:border-amber-200 dark:hover:border-amber-800",
  },
];
