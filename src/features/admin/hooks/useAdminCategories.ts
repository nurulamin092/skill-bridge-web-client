import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Category } from "../types/admin.types";
import { apiFetch } from "@/lib/api";
import { toast } from "sonner";

export const useAdminCategories = () => {
  return useQuery({
    queryKey: ["admin-categories"],
    queryFn: async (): Promise<Category[]> => {
      const response = await apiFetch<{ success: boolean; data: Category[] }>(
        "/admin/categories",
      );
      return response.data;
    },
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { name: string; slug: string }) => {
      const response = await apiFetch<{ success: boolean; data: Category }>(
        "/admin/categories",
        {
          method: "POST",
          body: JSON.stringify(data),
        },
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
      toast.success("Category created successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create category");
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      ...data
    }: {
      id: string;
      name?: string;
      slug?: string;
    }) => {
      const response = await apiFetch<{ success: boolean; data: Category }>(
        `/admin/categories/${id}`,
        {
          method: "PUT",
          body: JSON.stringify(data),
        },
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
      toast.success("Category updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update category");
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (categoryId: string) => {
      const response = await apiFetch<{
        success: boolean;
        data: { message: string };
      }>(`/admin/categories/${categoryId}`, {
        method: "DELETE",
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
      toast.success("Category deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete category");
    },
  });
};
