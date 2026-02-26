import { apiFetch } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { User } from "better-auth/types";
import { toast } from "sonner";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  image?: string;
  role: "ADMIN" | "TUTOR" | "STUDENT";
  isBanned: boolean;
  createdAt: string;
  tutorProfile?: {
    id: string;
    isApproved: boolean;
    hourlyRate?: number;
    experience?: number;
    bio?: string;
  };
}
export const useAdminUsers = () => {
  return useQuery({
    queryKey: ["admin-users"],
    queryFn: async (): Promise<AdminUser[]> => {
      const response = await apiFetch<{ success: boolean; data: AdminUser[] }>(
        "/admin/users",
      );
      return response.data;
    },
  });
};

export const useUpdateUserStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      isBanned,
    }: {
      userId: string;
      isBanned: boolean;
    }) => {
      const response = await apiFetch<{ success: boolean; data: User }>(
        `/admin/users/${userId}/status`,
        {
          method: "PATCH",
          body: JSON.stringify({ isBanned }),
        },
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
      toast.success("User status updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update user status");
    },
  });
};

export const useApproveTutor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (tutorId: string) => {
      const response = await apiFetch<{ success: boolean; data: User }>(
        `/admin/tutor/${tutorId}/approved`,
        {
          method: "PATCH",
        },
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
      toast.success("Tutor approved successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to approve tutor");
    },
  });
};
export const useUserDetails = (userId: string) => {
  return useQuery({
    queryKey: ["admin-user", userId],
    queryFn: async (): Promise<User> => {
      const response = await apiFetch<{ success: boolean; data: User }>(
        `/admin/users/${userId}`,
      );
      return response.data;
    },
    enabled: !!userId,
  });
};
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      const response = await apiFetch<{
        success: boolean;
        data: { message: string };
      }>(`/admin/users/${userId}`, {
        method: "DELETE",
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      toast.success("User deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete user");
    },
  });
};
