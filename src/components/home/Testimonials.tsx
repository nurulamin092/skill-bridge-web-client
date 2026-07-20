"use client";

import React from "react";
import { Star, Quote, Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";
import Image from "next/image";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
  initials: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Mathematics Student",
    content:
      "SkillBridge helped me find an amazing calculus tutor. My grades have improved significantly! The platform is incredibly intuitive and the tutors are top-notch.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    initials: "SJ",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Programming Student",
    content:
      "The platform is incredibly easy to use. I found a React expert within minutes and booked my first session. Best investment I've made for my career!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    initials: "MC",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Language Learner",
    content:
      "My Spanish tutor is fantastic! The flexible scheduling makes it easy to fit lessons into my busy schedule. I've become conversational in just 3 months!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    initials: "ER",
  },
];

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("active");
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    const elements = sectionRef.current?.querySelectorAll(".reveal");
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-white/1">
      <div className="container px-4 mx-auto">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 px-5 py-2 mb-6 text-sm font-medium bg-indigo-500/10">
            <Sparkles className="h-4 w-4 text-indigo-400" />
            <span className="text-indigo-300">Student Stories</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-gradient tracking-tight">
            What Our Students Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Join thousands of satisfied students who have transformed their
            learning experience with SkillBridge.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <div
              key={testimonial.id}
              className="reveal glass rounded-2xl p-7 transition-all duration-400 hover:-translate-y-2 hover:border-indigo-500/20 hover:shadow-2xl hover:shadow-black/20 relative"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <Quote className="h-10 w-10 text-indigo-500/20 mb-4" />

              <div className="flex items-center gap-4 mb-5">
                {/* Avatar with next/image */}
                <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-indigo-500/30 shrink-0">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                    unoptimized
                    onError={(e) => {
                      // Hide image and show initials fallback
                      const img = e.target as HTMLImageElement;
                      img.style.display = "none";
                      const parent = img.parentElement;
                      if (parent) {
                        const fallback =
                          parent.querySelector(".fallback-initials");
                        if (fallback)
                          (fallback as HTMLElement).style.display = "flex";
                      }
                    }}
                  />
                  {/* Fallback initials */}
                  <div className="fallback-initials absolute inset-0 hidden items-center justify-center bg-linear-to-br from-indigo-500 to-violet-500 text-white font-bold text-sm">
                    {testimonial.initials}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, si) => (
                  <Star
                    key={si}
                    className={`h-4 w-4 ${
                      si < testimonial.rating
                        ? "fill-amber-400 text-amber-400"
                        : "text-slate-700"
                    }`}
                  />
                ))}
              </div>

              <p className="text-muted-foreground leading-relaxed text-[15px]">
                {testimonial.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
