"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Calendar,
  Clock,
  Star,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";

const menuItems = [
  {
    title: "Overview",
    href: "/student",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    title: "Upcoming Sessions",
    href: "/student/upcoming",
    icon: Calendar,
  },
  {
    title: "Past Sessions",
    href: "/student/past",
    icon: Clock,
  },
  {
    title: "My Reviews",
    href: "/student/reviews",
    icon: Star,
  },
  {
    title: "Profile",
    href: "/student/profile",
    icon: User,
  },
  {
    title: "Settings",
    href: "/student/settings",
    icon: Settings,
  },
];

export function StudentSidebar() {
  const pathname = usePathname();

  const { user, logout } = useAuth();

  const initials =
    user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "ST";

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8 shrink-0">
            <AvatarImage src={user?.image || ""} alt={user?.name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col truncate group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-semibold">{user?.name}</span>
            <span className="text-xs text-muted-foreground capitalize">
              {user?.role?.toLowerCase()}
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);

            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  tooltip={item.title}
                  className="w-full"
                >
                  <Link href={item.href} className="flex items-center gap-3">
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="truncate">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={user?.image} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-medium">{user?.name}</p>
            <p className="truncate text-xs text-muted-foreground">
              {user?.email}
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={() => logout()}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
