import { useQuery } from "@tanstack/react-query";
import { AdminStats } from "../types/admin.types";
import { apiFetch } from "@/lib/api";

export const useAdminStats = () => {
  return useQuery({
    queryKey: ["admin-users"],
    queryFn: async (): Promise<AdminStats> => {
      const response = await apiFetch<{ success: boolean; data: AdminStats }>(
        "/admin/stats",
      );
      return response.data;
    },
  });
};
