"use client";

import { useState } from "react";
import {
  useUpdateUserStatus,
  useApproveTutor,
  useAdminUsers,
} from "../hooks/useAdminUsers";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, UserCheck, Ban, CheckCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { format } from "date-fns";

interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: "ADMIN" | "TUTOR" | "STUDENT";
  isBanned: boolean;
  createdAt: string;
  tutorProfile?: {
    id: string;
    isApproved: boolean;
  };
}

export function UserManagement() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");

  const { data: users, isLoading, error } = useAdminUsers();
  const { mutate: updateUserStatus } = useUpdateUserStatus();
  const { mutate: approveTutor } = useApproveTutor();

  const filteredUsers = (users as User[] | undefined)?.filter((user: User) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());

    const matchesRole = roleFilter === "all" || user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  const handleBanUser = (userId: string, currentStatus: boolean) => {
    updateUserStatus({ userId, isBanned: !currentStatus });
  };

  const handleApproveTutor = (tutorId: string) => {
    approveTutor(tutorId);
  };

  const getRoleBadge = (role: string) => {
    const styles = {
      ADMIN:
        "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100",
      TUTOR:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
      STUDENT: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
    };
    return styles[role as keyof typeof styles] || "";
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-destructive">Failed to load users</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">User Management</h1>
        <p className="text-muted-foreground mt-1">
          Manage students, tutors, and administrators
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="ADMIN">Admins</SelectItem>
                <SelectItem value="TUTOR">Tutors</SelectItem>
                <SelectItem value="STUDENT">Students</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers?.map((user: User) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.image || ""} alt={user.name} />
                        <AvatarFallback>
                          {user.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getRoleBadge(user.role)}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {user.isBanned ? (
                      <Badge variant="destructive">Banned</Badge>
                    ) : user.role === "TUTOR" && user.tutorProfile ? (
                      user.tutorProfile.isApproved ? (
                        <Badge className="bg-green-100 text-green-800">
                          Approved
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-yellow-600">
                          Pending
                        </Badge>
                      )
                    ) : (
                      <Badge variant="outline" className="text-green-600">
                        Active
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {format(new Date(user.createdAt), "MMM dd, yyyy")}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {user.role === "TUTOR" &&
                        user.tutorProfile &&
                        !user.tutorProfile.isApproved && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-green-600"
                            onClick={() =>
                              handleApproveTutor(user.tutorProfile!.id)
                            }
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                        )}
                      <Button
                        size="sm"
                        variant={user.isBanned ? "outline" : "destructive"}
                        onClick={() => handleBanUser(user.id, user.isBanned)}
                      >
                        {user.isBanned ? (
                          <>
                            <UserCheck className="h-4 w-4 mr-1" />
                            Unban
                          </>
                        ) : (
                          <>
                            <Ban className="h-4 w-4 mr-1" />
                            Ban
                          </>
                        )}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
