"use client";

import { useState } from "react";
import { TutorFilters } from "@/features/tutors/components/TutorFilters/index";
import { useTutors } from "@/features/tutors/hooks/useTutors";
import {
  TutorQueryParams,
  TutorCardData,
} from "@/features/tutors/types/tutor.types";
import TutorCard from "@/features/tutors/components/TutorCard";

export default function TutorsPage() {
  const [filters, setFilters] = useState<TutorQueryParams>({});
  const { data: tutors, isLoading } = useTutors(filters);

  const tutorCards: TutorCardData[] =
    tutors?.map((tutor) => ({
      id: tutor.id,
      name: tutor.user.name,
      hourlyRate: tutor.hourlyRate,
      experience: tutor.experience,
      rating: tutor.avgRating,
      categories: tutor.tutorCategories.map((tc) => tc.category.name),
      image: tutor.user.image,
      bio: tutor.bio,
    })) || [];

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-3">
          <TutorFilters onFilterChange={setFilters} />
        </div>

        <div className="col-span-9">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
          ) : tutorCards.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No tutors found matching your criteria.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tutorCards.map((tutor) => (
                <TutorCard key={tutor.id} tutor={tutor} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export const dynamic = "force-dynamic";
