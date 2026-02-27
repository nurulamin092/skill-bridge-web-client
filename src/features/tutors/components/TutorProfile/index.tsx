"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { BookingModal } from "@/features/bookings/components/BookingModal";
import { useTutor } from "../../hooks/useTutor";
import { ProfileHeader } from "./ProfileHeader";
import { AboutTab } from "./AboutTab";
import { AvailabilityTab } from "./AvailabilityTab";
import { ReviewsTab } from "./ReviewsTab";

interface TutorProfileProps {
  id: string;
}

export function TutorProfile({ id }: TutorProfileProps) {
  const { data: tutor, isLoading, error } = useTutor(id);
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  if (isLoading) return <div>Loading...</div>;
  if (error || !tutor) return <div>Tutor not found</div>;

  const handleBookSession = () => {
    if (!isAuthenticated) {
      router.push(`/login?callbackUrl=/tutors/${id}`);
      return;
    }
    if (user?.role !== "STUDENT") {
      toast.error("Only student can book session");
      return;
    }
    setIsBookingModalOpen(true);
  };

  const isBookDisabled = user?.role === "TUTOR" || user?.role === "ADMIN";

  return (
    <>
      <div className="max-w-6xl mx-auto">
        <ProfileHeader
          tutor={tutor}
          onBookSession={handleBookSession}
          isBookDisabled={isBookDisabled}
        />

        <Tabs defaultValue="about" className="space-y-4">
          <TabsList>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="availability">Availability</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="about">
            <AboutTab bio={tutor.bio} name={tutor.user.name} />
          </TabsContent>

          <TabsContent value="availability">
            <AvailabilityTab
              availabilities={tutor.availabilities}
              onBookSession={handleBookSession}
              isBookDisabled={isBookDisabled}
            />
          </TabsContent>

          <TabsContent value="reviews">
            <ReviewsTab reviews={tutor.reviews} />
          </TabsContent>
        </Tabs>
      </div>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        tutor={tutor}
      />
    </>
  );
}
