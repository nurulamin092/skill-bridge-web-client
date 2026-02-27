"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { TutorQueryParams } from "../../types/tutor.types";
import { FilterForm, filterSchema } from "../../schemas";
import { FilterHeader } from "./FilterHeader";
import { SearchFilter } from "./SearchFilter";
import { CategoryFilter } from "./CategoryFilter";
import { PriceFilter } from "./PriceFilter";
import { RatingFilter } from "./RatingFilter";

interface TutorFiltersProps {
  onFilterChange: (filters: TutorQueryParams) => void;
  initialFilters?: TutorQueryParams;
}

export function TutorFilters({
  onFilterChange,
  initialFilters = {},
}: TutorFiltersProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>([
    initialFilters.minPrice || 0,
    initialFilters.maxPrice || 100,
  ]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm<FilterForm>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      search: initialFilters.search || "",
      category: initialFilters.category || "",
      minPrice: initialFilters.minPrice || 0,
      maxPrice: initialFilters.maxPrice || 100,
      rating: initialFilters.rating?.toString() || "",
    },
  });

  const watchCategory = useWatch({ control, name: "category" });
  const watchRating = useWatch({ control, name: "rating" });
  const watchSearch = useWatch({ control, name: "search" });

  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
    setValue("minPrice", value[0]);
    setValue("maxPrice", value[1]);
  };

  const onSubmit = (data: FilterForm) => {
    const filters: TutorQueryParams = {};

    if (data.search?.trim()) filters.search = data.search.trim();
    if (data.category && data.category !== "all")
      filters.category = data.category;
    if (data.minPrice && data.minPrice > 0) filters.minPrice = data.minPrice;
    if (data.maxPrice && data.maxPrice < 200) filters.maxPrice = data.maxPrice;
    if (data.rating && data.rating !== "all")
      filters.rating = parseInt(data.rating);

    onFilterChange(filters);
  };

  const handleClearFilters = () => {
    reset({
      search: "",
      category: "",
      minPrice: 0,
      maxPrice: 100,
      rating: "",
    });
    setPriceRange([0, 100]);
    onFilterChange({});
  };

  const hasActiveFilters = Boolean(
    watchSearch ||
    (watchCategory && watchCategory !== "all") ||
    priceRange[0] > 0 ||
    priceRange[1] < 100 ||
    (watchRating && watchRating !== "all"),
  );

  return (
    <Card className="sticky top-20">
      <CardHeader>
        <CardTitle>
          <FilterHeader
            hasActiveFilters={hasActiveFilters}
            onClear={handleClearFilters}
          />
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <SearchFilter register={register} error={errors.search?.message} />
        <CategoryFilter
          value={watchCategory}
          onChange={(v) => setValue("category", v)}
        />
        <PriceFilter value={priceRange} onChange={handlePriceChange} />
        <RatingFilter
          value={watchRating}
          onChange={(v) => setValue("rating", v)}
        />
      </CardContent>

      <CardFooter>
        <Button onClick={handleSubmit(onSubmit)} className="w-full" size="lg">
          Apply Filters
        </Button>
      </CardFooter>
    </Card>
  );
}
