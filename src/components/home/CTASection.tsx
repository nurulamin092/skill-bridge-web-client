"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, GraduationCap } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("active");
        });
      },
      { threshold: 0.1 },
    );

    const elements = sectionRef.current?.querySelectorAll(".reveal");
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w175 h-125 bg-indigo-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="container px-4 mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center reveal">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-gradient tracking-tight">
            Ready to Start Learning?
          </h2>
          <p className="text-muted-foreground text-lg mb-10 leading-relaxed max-w-xl mx-auto">
            Join thousands of students who are already transforming their skills
            with expert tutors. Your first session is just a click away.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="h-14 px-8 rounded-xl bg-linear-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white font-semibold text-base transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-indigo-500/25"
            >
              <Link href="/tutors">
                Find Your Tutor
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-14 px-8 rounded-xl border-white/15 hover:bg-white/5 hover:border-indigo-500/30 text-base transition-all"
            >
              <Link href="/become-tutor">
                <GraduationCap className="mr-2 h-5 w-5" />
                Become a Tutor
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
