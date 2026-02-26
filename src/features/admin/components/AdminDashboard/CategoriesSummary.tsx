"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CategoryStat {
  id: string;
  name: string;
  tutorCount: number;
}

interface CategoriesSummaryProps {
  categories?: CategoryStat[];
}

export function CategoriesSummary({ categories }: CategoriesSummaryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Categories</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
          {categories && categories.length > 0 ? (
            categories.map((category) => (
              <div key={category.id} className="p-3 border rounded-lg">
                <p className="font-medium">{category.name}</p>
                <p className="text-sm text-muted-foreground">
                  {category.tutorCount ?? 0} tutors
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground col-span-full text-center py-4">
              No categories available
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
