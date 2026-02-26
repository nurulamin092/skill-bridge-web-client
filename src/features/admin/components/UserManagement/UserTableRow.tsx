"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { UserCheck, Ban, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { RoleBadge } from "../common/RoleBadge";
import { StatusBadge } from "../common/StatusBadge";
import { AdminUser } from "../../hooks/useAdminUsers";

interface UserTableRowProps {
  user: AdminUser;
  onViewDetails: (user: AdminUser) => void;
  onBanUser: (userId: string, currentStatus: boolean) => void;
  onApproveTutor: (tutorId: string) => void;
  isUpdating: boolean;
  isApproving: boolean;
}

export function UserTableRow({
  user,
  onViewDetails,
  onBanUser,
  onApproveTutor,
  isUpdating,
  isApproving,
}: UserTableRowProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getStatus = (): "active" | "banned" | "approved" | "pending" => {
    if (user.isBanned) return "banned";
    if (user.role === "TUTOR" && user.tutorProfile) {
      return user.tutorProfile.isApproved ? "approved" : "pending";
    }
    return "active";
  };

  return (
    <TableRow
      className="cursor-pointer hover:bg-muted/50 transition-colors"
      onClick={() => onViewDetails(user)}
    >
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.image || ""} alt={user.name} />
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{user.name}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>
      </TableCell>

      <TableCell>
        <RoleBadge role={user.role} />
      </TableCell>

      <TableCell>
        <StatusBadge status={getStatus()} />
      </TableCell>

      <TableCell>{format(new Date(user.createdAt), "MMM dd, yyyy")}</TableCell>

      <TableCell className="text-right">
        <div
          className="flex justify-end gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          {user.role === "TUTOR" &&
            user.tutorProfile &&
            !user.tutorProfile.isApproved && (
              <Button
                size="sm"
                variant="outline"
                className="text-green-600 hover:text-green-700"
                onClick={() => onApproveTutor(user.tutorProfile!.id)}
                disabled={isApproving}
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Approve
              </Button>
            )}

          <Button
            size="sm"
            variant={user.isBanned ? "outline" : "destructive"}
            onClick={() => onBanUser(user.id, user.isBanned)}
            disabled={isUpdating}
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
  );
}
