import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { filterSchema, FilterForm } from "../schemas";
import { TutorQueryParams } from "../types/tutor.types";

export const useTutorFilters = (initialFilters: TutorQueryParams = {}) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([
    initialFilters.minPrice || 0,
    initialFilters.maxPrice || 100,
  ]);

  const form = useForm<FilterForm>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      search: initialFilters.search || "",
      category: initialFilters.category || "",
      minPrice: initialFilters.minPrice || 0,
      maxPrice: initialFilters.maxPrice || 100,
      rating: initialFilters.rating?.toString() || "",
    },
  });

  const buildFilters = (data: FilterForm): TutorQueryParams => {
    const filters: TutorQueryParams = {};

    if (data.search?.trim()) filters.search = data.search.trim();
    if (data.category && data.category !== "all")
      filters.category = data.category;
    if (data.minPrice && data.minPrice > 0) filters.minPrice = data.minPrice;
    if (data.maxPrice && data.maxPrice < 200) filters.maxPrice = data.maxPrice;
    if (data.rating && data.rating !== "all")
      filters.rating = parseInt(data.rating);

    return filters;
  };

  const hasActiveFilters = () => {
    const values = form.getValues();
    return !!(
      values.search ||
      (values.category && values.category !== "all") ||
      values.minPrice !== 0 ||
      values.maxPrice !== 100 ||
      (values.rating && values.rating !== "all")
    );
  };

  return {
    ...form,
    priceRange,
    setPriceRange,
    buildFilters,
    hasActiveFilters: hasActiveFilters(),
  };
};
