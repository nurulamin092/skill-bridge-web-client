// src/components/home/CategoriesSection.tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/features/categories/api/category.service";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import {
  BookOpen,
  Calculator,
  Languages,
  Code,
  Music,
  Palette,
  FlaskConical,
  Globe,
} from "lucide-react";

const categoryIcons: Record<string, React.ReactNode> = {
  mathematics: <Calculator className="h-8 w-8" />,
  science: <FlaskConical className="h-8 w-8" />,
  programming: <Code className="h-8 w-8" />,
  languages: <Languages className="h-8 w-8" />,
  music: <Music className="h-8 w-8" />,
  art: <Palette className="h-8 w-8" />,
  geography: <Globe className="h-8 w-8" />,
  default: <BookOpen className="h-8 w-8" />,
};

export function CategoriesSection() {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  return (
    <section className="py-16">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Browse by Category
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore thousands of tutors across various subjects and find the
            perfect match for your learning goals.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-32 w-full rounded-lg" />
            ))
          ) : categories && categories.length > 0 ? (
            categories.slice(0, 8).map((category) => (
              <Link
                key={category.id}
                href={`/tutors?category=${category.slug}`}
              >
                <Card className="group cursor-pointer hover:shadow-md transition-all hover:-translate-y-1">
                  <CardContent className="p-6 text-center">
                    <div className="mb-3 text-primary group-hover:scale-110 transition-transform">
                      {categoryIcons[category.slug] || categoryIcons.default}
                    </div>
                    <h3 className="font-semibold mb-1">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {category.tutorCount || 0}+ Tutors
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No categories available</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
