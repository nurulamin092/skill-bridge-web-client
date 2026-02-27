"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Clock, DollarSign, Calendar } from "lucide-react";
import { SingleTutor } from "../../types/tutor.types";

interface ProfileHeaderProps {
  tutor: SingleTutor;
  onBookSession: () => void;
  isBookDisabled: boolean;
}

export function ProfileHeader({
  tutor,
  onBookSession,
  isBookDisabled,
}: ProfileHeaderProps) {
  const initials = tutor.user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="bg-linear-to-r from-primary/10 to-secondary/10 rounded-lg p-8 mb-8">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <Avatar className="h-24 w-24 border-4 border-background">
          <AvatarImage src={tutor.user.image || ""} alt={tutor.user.name} />
          <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{tutor.user.name}</h1>

          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">
                {tutor.avgRating.toFixed(1)}
              </span>
              <span className="text-muted-foreground">
                ({tutor.reviews?.length || 0} reviews)
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <span>{tutor.experience}+ years experience</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="h-5 w-5 text-muted-foreground" />
              <span className="font-semibold text-primary">
                ${tutor.hourlyRate}
              </span>
              <span className="text-muted-foreground">/hour</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {tutor.tutorCategories.map((tc) => (
              <Badge key={tc.category.id} variant="secondary">
                {tc.category.name}
              </Badge>
            ))}
          </div>

          <Button size="lg" onClick={onBookSession} disabled={isBookDisabled}>
            <Calendar className="mr-2 h-4 w-4" />
            Book a Session
          </Button>
        </div>
      </div>
    </div>
  );
}
