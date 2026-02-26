"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
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
import { UserTableRow } from "./UserTableRow";
import { AdminUser } from "../../hooks/useAdminUsers";

interface UserTableProps {
  users: AdminUser[];
  roleFilter: string;
  onRoleFilterChange: (value: string) => void;
  onViewDetails: (user: AdminUser) => void;
  onBanUser: (userId: string, currentStatus: boolean) => void;
  onApproveTutor: (tutorId: string) => void;
  isUpdating: boolean;
  isApproving: boolean;
}

export function UserTable({
  users,
  roleFilter,
  onRoleFilterChange,
  onViewDetails,
  onBanUser,
  onApproveTutor,
  isUpdating,
  isApproving,
}: UserTableProps) {
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>
                <Select value={roleFilter} onValueChange={onRoleFilterChange}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="ADMIN">Admins</SelectItem>
                    <SelectItem value="TUTOR">Tutors</SelectItem>
                    <SelectItem value="STUDENT">Students</SelectItem>
                  </SelectContent>
                </Select>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <UserTableRow
                key={user.id}
                user={user}
                onViewDetails={onViewDetails}
                onBanUser={onBanUser}
                onApproveTutor={onApproveTutor}
                isUpdating={isUpdating}
                isApproving={isApproving}
              />
            ))}
          </TableBody>
        </Table>

        <div className="border-t px-4 py-3 text-sm text-muted-foreground">
          Showing {users.length} users
        </div>
      </CardContent>
    </Card>
  );
}
