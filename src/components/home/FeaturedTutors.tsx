// src/components/home/FeaturedTutors.tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import { getTutors } from "@/features/tutors/api/tutor.service";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import TutorCard from "@/features/tutors/components/TutorCard";

export function FeaturedTutors() {
  const {
    data: tutors,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["featured-tutors"],
    queryFn: () => getTutors({ featured: true }),
  });

  if (error) {
    return (
      <section className="py-16 bg-muted/50">
        <div className="container px-4 mx-auto text-center">
          <p className="text-red-500">Failed to load featured tutors</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-muted/50">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured Tutors
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Learn from our top-rated expert tutors with years of experience in
            their respective fields.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-48 w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))
          ) : tutors && tutors.length > 0 ? (
            tutors.slice(0, 4).map((tutor) => (
              <TutorCard
                key={tutor.id}
                tutor={{
                  id: tutor.id,
                  name: tutor.user.name,
                  hourlyRate: tutor.hourlyRate,
                  experience: tutor.experience,
                  rating: tutor.avgRating,
                  categories: tutor.tutorCategories.map(
                    (tc) => tc.category.name,
                  ),
                  image: tutor.user.image,
                  bio: tutor.bio,
                }}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">
                No featured tutors available
              </p>
            </div>
          )}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg" variant="outline">
            <Link href="/tutors">
              Browse All Tutors
              <span className="ml-2">→</span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
