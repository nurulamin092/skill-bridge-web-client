"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

type Role = "STUDENT" | "TUTOR" | "ADMIN";

const role: Role = "STUDENT";

const menuData: Record<Role, { title: string; url: string }[]> = {
  STUDENT: [
    { title: "Dashboard", url: "/student" },
    { title: "Courses", url: "/student/courses" },
  ],
  TUTOR: [
    { title: "Dashboard", url: "/tutor" },
    { title: "My Students", url: "/tutor/students" },
  ],
  ADMIN: [
    { title: "Dashboard", url: "/admin" },
    { title: "Users", url: "/admin/users" },
  ],
};

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const items = menuData[role];

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="px-2 py-2 font-semibold text-lg">{role} PANEL</div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url}>{item.title}</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
