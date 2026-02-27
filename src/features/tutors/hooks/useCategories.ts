import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { CategoryTypes } from "@/features/categories/types/category.types";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async (): Promise<CategoryTypes[]> => {
      const response = await apiFetch<{
        success: boolean;
        data: CategoryTypes[];
      }>("/categories");
      return response.data;
    },
  });
}
