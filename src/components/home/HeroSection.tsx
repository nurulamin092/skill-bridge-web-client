"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Sparkles, Star, Calendar, Video } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import Image from "next/image";

// ─── Schema ───
const searchSchema = z.object({
  query: z.string().min(1, "Search query is required"),
});

type SearchForm = z.infer<typeof searchSchema>;

// ─── Fallback Tutor Images ───
const fallbackImages = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
];

export function HeroSection() {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchForm>({
    resolver: zodResolver(searchSchema),
  });

  const onSubmit = (data: SearchForm) => {
    router.push(`/tutors?search=${encodeURIComponent(data.query)}`);
  };

  // Intersection Observer for reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1 },
    );

    const elements = sectionRef.current?.querySelectorAll(".reveal-hero");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // ─── Inline animation keyframes (Tailwind v4 compatible) ───
  const floatingOrbsStyle = {
    animation: "float 8s ease-in-out infinite",
  };

  const particleFloatStyle = (delay: number) => ({
    animation: `particle-float ${5 + delay}s ease-in-out infinite`,
    animationDelay: `${delay * 0.8}s`,
  });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center py-20 md:py-28 overflow-hidden"
    >
      {/* ─── Animated Background ─── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <div
          className="absolute w125 h-125 rounded-full opacity-30 blur-[100px] top-[10%] left-[5%]"
          style={{
            background: "radial-gradient(circle, #6366f1 0%, transparent 70%)",
            ...floatingOrbsStyle,
          }}
        />
        <div
          className="absolute w-100 h-100 rounded-full opacity-25 blur-[100px] top-[20%] right-[10%]"
          style={{
            background: "radial-gradient(circle, #8b5cf6 0%, transparent 70%)",
            ...floatingOrbsStyle,
            animationDelay: "-2s",
          }}
        />
        <div
          className="absolute w-75 h-75 rounded-full opacity-20 blur-[100px] bottom-[10%] left-[30%]"
          style={{
            background: "radial-gradient(circle, #ec4899 0%, transparent 70%)",
            ...floatingOrbsStyle,
            animationDelay: "-4s",
          }}
        />
        {/* Grid Pattern (Tailwind v4 friendly) */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            maskImage:
              "radial-gradient(ellipse at center, black 40%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 40%, transparent 80%)",
          }}
        />
        {/* Floating Particles */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-indigo-400/50"
            style={{
              top: `${15 + i * 12}%`,
              left: `${8 + i * 15}%`,
              ...particleFloatStyle(i),
            }}
          />
        ))}
      </div>

      <div className="container relative z-10 px-4 mx-auto">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* ─── Left Content ─── */}
            <div className="text-center lg:text-left">
              <div className="reveal-hero inline-flex items-center gap-2 rounded-full border border-indigo-500/20 px-5 py-2 mb-8 text-sm font-medium bg-indigo-500/10 backdrop-blur-sm">
                <Sparkles className="h-4 w-4 text-indigo-400" />
                <span className="text-indigo-300">
                  Trusted by 10,000+ students worldwide
                </span>
              </div>

              <h1 className="reveal-hero text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-[1.1]">
                Connect with{" "}
                <span className="text-gradient-accent">Expert Tutors</span>,
                <br />
                <span className="text-gradient">Learn Without Limits</span>
              </h1>

              <p className="reveal-hero text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Discover verified tutors across hundreds of subjects, book
                one-on-one sessions instantly, and achieve your learning goals
                with confidence.
              </p>

              {/* ─── Search Form ─── */}
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="reveal-hero max-w-xl mx-auto lg:mx-0 mb-6"
              >
                <div className="glass search-focus rounded-2xl p-1.5 flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      placeholder="Search tutors, subjects, or skills..."
                      className="pl-12 h-14 bg-transparent border-0 text-foreground placeholder:text-muted-foreground/60 focus-visible:ring-0 focus-visible:ring-offset-0 text-base"
                      {...register("query")}
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="h-14 px-6 bg-linear-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white font-semibold rounded-xl transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-indigo-500/25"
                  >
                    Search
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="ml-2"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Button>
                </div>
                {errors.query && (
                  <p className="text-sm text-red-400 mt-2 text-left pl-4">
                    {errors.query.message}
                  </p>
                )}
              </form>

              {/* ─── Popular Tags ─── */}
              <div className="reveal-hero flex flex-wrap justify-center lg:justify-start gap-2 mb-8">
                <span className="text-sm text-muted-foreground">Popular:</span>
                {["React", "IELTS", "Mathematics", "Physics", "English"].map(
                  (tag) => (
                    <button
                      key={tag}
                      onClick={() => router.push(`/tutors?search=${tag}`)}
                      className="px-3 py-1.5 rounded-full text-sm bg-white/5 border border-white/10 text-muted-foreground hover:bg-white/10 hover:text-foreground hover:border-indigo-500/30 transition-all cursor-pointer"
                    >
                      {tag}
                    </button>
                  ),
                )}
              </div>

              {/* ─── Stats ─── */}
              <div className="reveal-hero grid grid-cols-2 md:grid-cols-4 gap-3 max-w-lg mx-auto lg:mx-0">
                {[
                  { value: "500+", label: "Expert Tutors", icon: "👨‍🏫" },
                  { value: "50+", label: "Subjects", icon: "📚" },
                  { value: "10K+", label: "Students", icon: "👥" },
                  { value: "98%", label: "Satisfaction", icon: "⭐" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="glass glass-hover rounded-2xl p-4 text-center relative stat-glow"
                  >
                    <div className="text-2xl font-extrabold text-gradient mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ─── Right Side – Floating Cards ─── */}
            <div className="hidden lg:block relative h-125">
              {/* Main Tutor Card */}
              <div
                className="absolute top-0 right-0 w-72 glass rounded-2xl p-4 hero-float-card"
                style={{ animationDelay: "0s" }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-indigo-500/30">
                    <Image
                      src={fallbackImages[0]}
                      alt="Tutor"
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Sarah Johnson</h4>
                    <p className="text-xs text-indigo-400">
                      Senior React Tutor
                    </p>
                  </div>
                  <span className="ml-auto px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-medium">
                    Online
                  </span>
                </div>
                <div className="flex items-center gap-1 mb-3">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-sm font-medium">4.9</span>
                  <span className="text-xs text-muted-foreground">
                    · 520 Reviews
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs text-muted-foreground">Hourly Rate</p>
                    <p className="text-lg font-bold text-gradient">
                      $25
                      <span className="text-sm font-normal text-muted-foreground">
                        /hr
                      </span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Completed</p>
                    <p className="text-sm font-semibold text-emerald-400">
                      1,240 Sessions
                    </p>
                  </div>
                </div>
              </div>

              {/* Session Card */}
              <div className="absolute top-[45%] right-[15%] w-64 glass rounded-2xl p-4 hero-float-card hero-float-card-delay-1">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Upcoming Session</h4>
                    <p className="text-xs text-muted-foreground">
                      Today · 7:30 PM
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                  <Video className="h-3.5 w-3.5" />
                  <span>60 Minutes</span>
                  <span className="ml-auto px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400">
                    Live
                  </span>
                </div>
              </div>

              {/* Success Card */}
              <div className="absolute bottom-[5%] right-[5%] w-56 glass rounded-2xl p-4 hero-float-card hero-float-card-delay-2">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#4ade80"
                      strokeWidth="2"
                    >
                      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                      <polyline points="16 7 22 7 22 13" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Student Success
                    </p>
                    <p className="text-xl font-bold text-gradient">98%</p>
                  </div>
                </div>
                <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full w-[98%] rounded-full bg-linear-to-r from-emerald-400 to-emerald-500" />
                </div>
              </div>

              {/* Decorative Particles */}
              <div className="absolute top-[20%] left-[10%] w-3 h-3 rounded-full bg-indigo-500/40 animate-pulse" />
              <div
                className="absolute bottom-[30%] left-[5%] w-2 h-2 rounded-full bg-violet-500/40 animate-pulse"
                style={{ animationDelay: "1s" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
