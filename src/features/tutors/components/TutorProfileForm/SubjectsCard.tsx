"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingSkeleton } from "@/components/common/feedback/LoadingSkeleton";
import { CategoryTypes } from "@/features/categories/types/category.types";
import { CategoryCheckbox } from "./CategoryCheckbox";

interface SubjectsCardProps {
  categories: CategoryTypes[];
  selectedCategoryIds: string[];
  onCategoryChange: (categoryId: string, checked: boolean) => void;
  error?: string;
  isLoading: boolean;
}

export function SubjectsCard({
  categories,
  selectedCategoryIds,
  onCategoryChange,
  error,
  isLoading,
}: SubjectsCardProps) {
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
                      onCategoryChange(category.id, checked)
                    }
                  />
                ))}
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
