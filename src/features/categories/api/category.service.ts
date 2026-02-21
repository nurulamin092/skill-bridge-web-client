import { apiFetch } from "@/lib/api";

export interface Category {
  id: string;
  name: string;
  slug: string;
  tutorCount?: number;
}

export const getCategories = async (): Promise<Category[]> => {
  const response = await apiFetch<{ success: boolean; data: Category[] }>(
    `/categories/`,
  );
  return response.data;
};

export const getCategoryBySlug = async (slug: string): Promise<Category[]> => {
  const response = await apiFetch<{ success: boolean; data: Category[] }>(
    `/categories/${slug}`,
  );
  return response.data;
};
