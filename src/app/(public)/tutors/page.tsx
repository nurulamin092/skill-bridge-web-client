"use client";

import TutorCard from "@/features/tutors/components/TutorCard";
import { useTutors } from "@/features/tutors/hooks/useTutors";

export default function TutorsListPage() {
  const { data: tutors, isLoading, isError } = useTutors();
  if (isLoading) {
    return <p>Loading tutor...</p>;
  }
  if (isError) {
    return <p>Failed to load tutors.</p>;
  }
  if (!tutors || tutors.length === 0) {
    return <p>No tutors found.</p>;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {tutors.map((tutor) => (
        <TutorCard
          key={tutor.id}
          tutor={{
            id: tutor.id,
            name: tutor.user.name,
            hourlyRate: tutor.hourlyRate,
            experience: tutor.experience,
            rating: tutor.avgRating,
            categories: tutor.tutorCategories.map((tc) => tc.category.name),
          }}
        />
      ))}
    </div>
  );
}
