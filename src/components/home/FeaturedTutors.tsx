// src/components/home/FeaturedTutors.tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import { getTutors } from "@/features/tutors/api/tutor.service";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Sparkles, ArrowRight, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// ─── Types ───
interface Tutor {
  id: string;
  userId?: string;
  user?: {
    name: string;
    image?: string | null;
  } | null;
  hourlyRate?: number | null;
  experience?: number | null;
  avgRating?: number | null;
  bio?: string | null;
  tutorCategories?: Array<{ category: { name: string } }> | null;
}

// ─── Fallback Images ───
const fallbackTutorImages = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=300&fit=crop",
];

const fallbackAvatars = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
];

// ─── Utility ───
const getReviewCount = (id: string) => {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash << 5) - hash + id.charCodeAt(i);
    hash = hash & hash;
  }
  return Math.abs(hash % 400) + 50;
};

export function FeaturedTutors() {
  const {
    data: tutors,
    isLoading,
    error,
  } = useQuery<Tutor[]>({
    queryKey: ["featured-tutors"],
    queryFn: () => getTutors({ featured: true }),
  });

  const sectionRef = useRef<HTMLElement>(null);
  const [, setHasObserved] = useState(false);

  useEffect(() => {
    const currentRef = sectionRef.current;
    if (!currentRef) return;

    const timer = setTimeout(() => {
      const elements = currentRef.querySelectorAll(".reveal");
      console.log(`🔍 Observer পাওয়া এলিমেন্ট: ${elements.length}টি`);

      if (elements.length === 0) {
        console.warn("⚠️ কোনো .reveal এলিমেন্ট পাওয়া যায়নি!");
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("active");
              console.log(" active:", entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
      );

      elements.forEach((el) => observer.observe(el));
      setHasObserved(true);

      return () => observer.disconnect();
    }, 100);

    return () => clearTimeout(timer);
  }, [tutors, isLoading]);

  // ─── Error State ───
  if (error) {
    return (
      <section className="py-16 bg-muted/50">
        <div className="container px-4 mx-auto text-center">
          <p className="text-red-500">❌ Failed to load featured tutors.</p>
        </div>
      </section>
    );
  }

  // ─── Loading State ───
  if (isLoading) {
    return (
      <section className="py-16 bg-muted/50">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured Tutors
            </h2>
            <p className="text-muted-foreground">Loading...</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-56 w-full rounded-2xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ─── Empty State ───
  if (!tutors || tutors.length === 0) {
    return (
      <section className="py-16 bg-muted/50">
        <div className="container px-4 mx-auto text-center">
          <p className="text-yellow-500"> No featured tutors found.</p>
        </div>
      </section>
    );
  }

  // ─── Main Render ───
  const tutorList = tutors.slice(0, 4);

  return (
    <section ref={sectionRef} className="py-16 bg-muted/50 relative">
      <div className="container px-4 mx-auto">
        {/* Header */}
        <div className="text-center mb-12 reveal">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 px-5 py-2 mb-4 text-sm font-medium bg-indigo-500/10">
            <Sparkles className="h-4 w-4 text-indigo-400" />
            <span className="text-indigo-300">Top Rated</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient tracking-tight">
            Featured Tutors
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base leading-relaxed">
            Learn from our top-rated expert tutors with years of experience.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tutorList.map((tutor, i) => {
            const tutorName = tutor.user?.name ?? "Unknown Tutor";
            const tutorImage =
              tutor.user?.image ??
              fallbackTutorImages[i % fallbackTutorImages.length];
            const avatarImage =
              tutor.user?.image ?? fallbackAvatars[i % fallbackAvatars.length];
            const categories =
              tutor.tutorCategories
                ?.map((tc) => tc.category.name)
                .slice(0, 2)
                .join(", ") ?? "No categories";
            const avgRating = tutor.avgRating ?? 0;
            const experience = tutor.experience ?? 0;
            const hourlyRate = tutor.hourlyRate ?? 0;
            const reviewCount = getReviewCount(tutor.id);

            return (
              <div
                key={tutor.id}
                className="reveal group glass rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:border-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/10"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Cover Image */}
                <div className="relative overflow-hidden h-48">
                  <Image
                    src={tutorImage}
                    alt={tutorName}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-background via-background/20 to-transparent" />
                  <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-medium backdrop-blur-sm">
                    Online
                  </div>
                </div>

                {/* Tutor Info */}
                <div className="p-5 relative">
                  <div className="flex items-start gap-3 -mt-10 mb-3">
                    <div className="relative w-14 h-14 rounded-full border-3 border-background overflow-hidden">
                      <Image
                        src={avatarImage}
                        alt={tutorName}
                        fill
                        className="object-cover"
                        sizes="56px"
                        unoptimized
                      />
                    </div>
                    <div className="pt-10">
                      <h3 className="font-bold text-base truncate max-w-37.5">
                        {tutorName}
                      </h3>
                      <p className="text-indigo-400 text-xs truncate max-w-37.5">
                        {categories}
                      </p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex">
                      {[...Array(5)].map((_, si) => (
                        <Star
                          key={si}
                          className={`h-3.5 w-3.5 ${
                            si < Math.floor(avgRating)
                              ? "fill-amber-400 text-amber-400"
                              : "text-slate-600"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {avgRating.toFixed(1)} ({reviewCount} reviews)
                    </span>
                  </div>

                  {/* Footer */}
                  <div className="flex justify-between items-center pt-3 border-t border-white/5">
                    <span className="text-xs text-muted-foreground">
                      {experience}+ years
                    </span>
                    <span className="font-bold text-indigo-300 text-lg">
                      ${hourlyRate}
                      <span className="text-sm font-normal text-muted-foreground">
                        /hr
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12 reveal">
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-12 px-8 rounded-xl border-white/15 hover:bg-white/5 hover:border-indigo-500/30 transition-all"
          >
            <Link href="/tutors">
              Browse All Tutors
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
