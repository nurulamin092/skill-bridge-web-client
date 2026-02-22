"use client";

import { useTutor } from "../hooks/useTutor";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { Star, Clock, DollarSign, Calendar, MessageSquare } from "lucide-react";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { useRouter } from "next/navigation";
// import { useState } from "react";
import { toast } from "sonner";
import { SingleTutor } from "../types/tutor.types";
import ReviewCard from "@/features/reviews/components/ReviewCard";

interface TutorProfileProps {
  id: string;
}

export function TutorProfile({ id }: TutorProfileProps) {
  const { data: tutor, isLoading, error } = useTutor(id);
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  if (isLoading) return <div>Loading...</div>;
  if (error || !tutor) return <div>Tutor not found</div>;

  const tutorData = tutor as SingleTutor;
  const initials = tutor.user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const handleBookSession = () => {
    if (!isAuthenticated) {
      router.push(`/login?callbackUrl=/tutors/${id}`);
      return;
    }
    if (user?.role !== "STUDENT") {
      toast.error("Only student can book session");
      return;
    }
  };

  return (
    <>
      <div className="max-w-6xl mx-auto">
        <div className="bg-linear-to-r from-primary/10 to-secondary/10 rounded-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <Avatar className="h-24 w-24 border-4 border-background">
              <AvatarImage
                src={tutorData.user.image || ""}
                alt={tutorData.user.name}
              />
              <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{tutorData.user.name}</h1>

              <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">
                    {tutorData.avgRating.toFixed(1)}
                  </span>
                  <span className="text-muted-foreground">
                    ({tutorData.reviews?.length || 0} reviews)
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <span>{tutorData.experience}+ years experience</span>
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="h-5 w-5 text-muted-foreground" />
                  <span className="font-semibold text-primary">
                    ${tutorData.hourlyRate}
                  </span>
                  <span className="text-muted-foreground">/hour</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {tutorData.tutorCategories.map((tc) => (
                  <Badge key={tc.category.id} variant="secondary">
                    {tc.category.name}
                  </Badge>
                ))}
              </div>

              <Button
                size="lg"
                onClick={handleBookSession}
                disabled={user?.role === "TUTOR" || user?.role === "ADMIN"}
              >
                <Calendar className="mr-2 h-4 w-4" />
                Book a Session
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="about" className="space-y-4">
          <TabsList>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="availability">Availability</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>About {tutorData.user.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-line">
                  {tutorData.bio || "No bio provided."}
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="availability" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Available Time Slots</CardTitle>
              </CardHeader>
              <CardContent>
                {tutorData.availabilities?.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {tutorData.availabilities.map((slot) => (
                      <Card key={slot.id} className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">
                              {format(new Date(slot.startTime), "MMM dd, yyyy")}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {format(new Date(slot.startTime), "h:mm a")} -
                              {format(new Date(slot.endTime), "h:mm a")}
                            </p>
                          </div>
                          <Button
                            size="sm"
                            onClick={handleBookSession}
                            disabled={
                              !isAuthenticated || user?.role !== "STUDENT"
                            }
                          >
                            Book
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    No available slots at the moment.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-4">
            {tutorData.reviews && tutorData.reviews.length > 0 ? (
              <div className="space-y-4">
                {tutorData.reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-8 text-center">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">No reviews yet.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
