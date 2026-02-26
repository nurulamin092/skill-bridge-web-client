"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserCheck, Ban, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { RoleBadge } from "../common/RoleBadge";
import { AdminUser } from "../../hooks/useAdminUsers";

interface UserDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: AdminUser | null;
  onBanUser: (userId: string, currentStatus: boolean) => void;
  onApproveTutor: (tutorId: string) => void;
  isUpdating: boolean;
  isApproving: boolean;
}

export function UserDetailsDialog({
  open,
  onOpenChange,
  user,
  onBanUser,
  onApproveTutor,
  isUpdating,
  isApproving,
}: UserDetailsDialogProps) {
  if (!user) return null;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
          <DialogDescription>
            Complete information about this user
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* User Header */}
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.image || ""} alt={user.name} />
              <AvatarFallback className="text-lg">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-muted-foreground">{user.email}</p>
              <div className="flex gap-2 mt-2">
                <RoleBadge role={user.role} />
                {user.isBanned && <Badge variant="destructive">Banned</Badge>}
              </div>
            </div>
          </div>

          {/* User Information Grid */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Basic Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">User ID:</span>
                    <span className="font-mono text-xs">{user.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Joined:</span>
                    <span>{format(new Date(user.createdAt), "PPP")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <span
                      className={
                        user.isBanned ? "text-destructive" : "text-green-600"
                      }
                    >
                      {user.isBanned ? "Banned" : "Active"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {user.role === "TUTOR" && user.tutorProfile && (
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3">Tutor Profile</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Approval:</span>
                      <Badge
                        className={
                          user.tutorProfile.isApproved
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {user.tutorProfile.isApproved ? "Approved" : "Pending"}
                      </Badge>
                    </div>
                    {user.tutorProfile.hourlyRate && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Rate:</span>
                        <span>${user.tutorProfile.hourlyRate}/hr</span>
                      </div>
                    )}
                    {user.tutorProfile.experience && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Experience:
                        </span>
                        <span>{user.tutorProfile.experience} years</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 border-t pt-4">
            {user.role === "TUTOR" &&
              user.tutorProfile &&
              !user.tutorProfile.isApproved && (
                <Button
                  variant="default"
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => {
                    onApproveTutor(user.tutorProfile!.id);
                    onOpenChange(false);
                  }}
                  disabled={isApproving}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve Tutor
                </Button>
              )}

            <Button
              variant={user.isBanned ? "outline" : "destructive"}
              onClick={() => {
                onBanUser(user.id, user.isBanned);
                onOpenChange(false);
              }}
              disabled={isUpdating}
            >
              {user.isBanned ? (
                <>
                  <UserCheck className="h-4 w-4 mr-2" />
                  Unban User
                </>
              ) : (
                <>
                  <Ban className="h-4 w-4 mr-2" />
                  Ban User
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
