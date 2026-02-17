import { apiFetch } from "@/lib/api";
import { Tutor, TutorQueryParams } from "../types/tutor.types";

export const getTutors = async (
  params?: TutorQueryParams,
): Promise<Tutor[]> => {
  const query = new URLSearchParams();
  if (params?.category) {
    query.append("category", params.category);
  }
  if (params?.minPrice) {
    query.append("minPrice", String(params.minPrice));
  }
  if (params?.maxPrice) {
    query.append("maxPrice", String(params.maxPrice));
  }
  if (params?.rating) {
    query.append("rating", String(params.rating));
  }

  const endpoint = `/tutors${query.toString() ? `?${query}` : ""}`;

  const response = await apiFetch<{ success: boolean; data: Tutor[] }>(
    endpoint,
  );

  return response.data;
};
