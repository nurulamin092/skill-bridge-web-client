import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { apiFetch } from "@/lib/api";
import { User } from "better-auth/types";
import { toast } from "sonner";

export const useUsers = () => {
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
      tutorId,
      isBanned,
    }: {
      tutorId: string;
      isBanned: boolean;
    }) => {
      const response = await apiFetch<{ success: boolean; data: User }>(
        `/admin/users/${tutorId}/status`,
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
        `/admin/users/${tutorId}/status`,
        {
          method: "PATCH",
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
