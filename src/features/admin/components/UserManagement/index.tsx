"use client";

import { useState } from "react";
import {
  useAdminUsers,
  useUpdateUserStatus,
  useApproveTutor,
  AdminUser,
} from "../../hooks/useAdminUsers";
import { PageHeader } from "../common/PageHeader";
import { SearchFilter } from "../common/SearchFilter";
import { RefreshButton } from "../common/RefreshButton";
import { LoadingSkeleton } from "../common/LoadingSkeleton";
import { ErrorState } from "../common/ErrorState";
import { EmptyState } from "../common/EmptyState";

import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { UserDetailsDialog } from "./UserDetailsDialog";
import { UserTable } from "./UserTable";

export function UserManagement() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const queryClient = useQueryClient();
  const { data: users, isLoading, error, refetch } = useAdminUsers();
  const { mutate: updateUserStatus, isPending: isUpdating } =
    useUpdateUserStatus();
  const { mutate: approveTutor, isPending: isApproving } = useApproveTutor();

  const userList = Array.isArray(users) ? users : [];

  const filteredUsers = userList.filter((user: AdminUser) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleBanUser = (userId: string, currentStatus: boolean) => {
    updateUserStatus(
      { userId, isBanned: !currentStatus },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["admin-users"] });
          queryClient.refetchQueries({ queryKey: ["admin-users"] });
          toast.success(
            currentStatus
              ? "User unbanned successfully"
              : "User banned successfully",
          );
        },
      },
    );
  };

  const handleApproveTutor = (tutorId: string) => {
    approveTutor(tutorId, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["admin-users"] });
        queryClient.refetchQueries({ queryKey: ["admin-users"] });
        toast.success("Tutor approved successfully");
      },
    });
  };

  const handleRefresh = () => {
    refetch();
    toast.success("Data refreshed");
  };

  const viewUserDetails = (user: AdminUser) => {
    setSelectedUser(user);
    setIsDetailsOpen(true);
  };

  const handleRoleFilterChange = (value: string) => {
    setRoleFilter(value);
  };

  if (isLoading) {
    return <LoadingSkeleton rows={8} />;
  }

  if (error) {
    return <ErrorState onRetry={handleRefresh} />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="User Management"
        description="Manage students, tutors, and administrators"
        action={
          <RefreshButton onRefresh={handleRefresh} isLoading={isLoading} />
        }
      />

      <SearchFilter
        value={search}
        onChange={setSearch}
        placeholder="Search by name or email..."
      />

      {filteredUsers.length === 0 ? (
        <EmptyState
          message={
            userList.length === 0 ? "No users found" : "No matching users found"
          }
          clearSearch={search ? () => setSearch("") : undefined}
        />
      ) : (
        <UserTable
          users={filteredUsers}
          roleFilter={roleFilter}
          onRoleFilterChange={handleRoleFilterChange}
          onViewDetails={viewUserDetails}
          onBanUser={handleBanUser}
          onApproveTutor={handleApproveTutor}
          isUpdating={isUpdating}
          isApproving={isApproving}
        />
      )}

      <UserDetailsDialog
        open={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
        user={selectedUser}
        onBanUser={handleBanUser}
        onApproveTutor={handleApproveTutor}
        isUpdating={isUpdating}
        isApproving={isApproving}
      />
    </div>
  );
}
