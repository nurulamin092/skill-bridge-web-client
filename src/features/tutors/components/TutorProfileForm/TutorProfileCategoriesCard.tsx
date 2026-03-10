"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FieldErrors } from "react-hook-form";
import { CategoryCheckbox } from "./CategoryCheckbox";
import { CategoryTypes } from "@/features/categories/types/category.types";
import { LoadingSkeleton } from "@/components/common/feedback/LoadingSkeleton";

export function TutorProfileCategoriesCard({
  categories,
  selectedCategoryIds,
  onChangeCategory,
  errors,
  isLoading,
}: {
  categories?: CategoryTypes[];
  selectedCategoryIds: string[];
  onChangeCategory: (id: string, checked: boolean) => void;
  errors: FieldErrors<{ categoryIds: string[] }>;
  isLoading: boolean;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Subjects You Teach</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isLoading ? (
            <LoadingSkeleton type="card" rows={2} />
          ) : (
            <>
              <div className="grid gap-2 grid-cols-2 md:grid-cols-3">
                {categories?.map((category) => (
                  <CategoryCheckbox
                    key={category.id}
                    category={category}
                    checked={selectedCategoryIds.includes(category.id)}
                    onChange={(checked) =>
                      onChangeCategory(category.id, checked)
                    }
                  />
                ))}
              </div>
              {errors.categoryIds && (
                <p className="text-sm text-destructive">
                  {errors.categoryIds.message}
                </p>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
