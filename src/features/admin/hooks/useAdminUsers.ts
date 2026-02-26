import { apiFetch } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { User } from "better-auth/types";
import { toast } from "sonner";

export const useAdminUsers = () => {
  return useQuery({
    queryKey: ["admin-users"],
    queryFn: async (): Promise<User[]> => {
      const response = await apiFetch<{ success: boolean; data: User[] }>(
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
        `/admin/users/${userId}/status`, // URL এ userId use করুন
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
