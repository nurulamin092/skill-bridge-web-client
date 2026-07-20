"use client";

import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/features/categories/api/category.service";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import {
  BookOpen,
  Calculator,
  Languages,
  Code,
  Music,
  Palette,
  FlaskConical,
  Globe,
  Sparkles,
  Atom,
  Dna,
  Brain,
  PenTool,
  History,
  Mountain,
} from "lucide-react";
import { useEffect, useRef } from "react";

const categoryConfig: Record<
  string,
  { icon: React.ElementType; color: string; bg: string }
> = {
  mathematics: {
    icon: Calculator,
    color: "text-indigo-400",
    bg: "bg-indigo-500/15",
  },
  algebra: {
    icon: Calculator,
    color: "text-indigo-400",
    bg: "bg-indigo-500/15",
  },
  calculus: {
    icon: Calculator,
    color: "text-indigo-400",
    bg: "bg-indigo-500/15",
  },
  science: {
    icon: FlaskConical,
    color: "text-emerald-400",
    bg: "bg-emerald-500/15",
  },
  physics: { icon: Atom, color: "text-emerald-400", bg: "bg-emerald-500/15" },
  chemistry: {
    icon: FlaskConical,
    color: "text-emerald-400",
    bg: "bg-emerald-500/15",
  },
  biochemistry: {
    icon: Dna,
    color: "text-emerald-400",
    bg: "bg-emerald-500/15",
  },
  biology: { icon: Dna, color: "text-emerald-400", bg: "bg-emerald-500/15" },
  programming: { icon: Code, color: "text-pink-400", bg: "bg-pink-500/15" },
  "web development": {
    icon: Code,
    color: "text-pink-400",
    bg: "bg-pink-500/15",
  },
  javascript: { icon: Code, color: "text-pink-400", bg: "bg-pink-500/15" },
  python: { icon: Code, color: "text-pink-400", bg: "bg-pink-500/15" },
  languages: {
    icon: Languages,
    color: "text-amber-400",
    bg: "bg-amber-500/15",
  },
  english: { icon: Languages, color: "text-amber-400", bg: "bg-amber-500/15" },
  "english literature": {
    icon: BookOpen,
    color: "text-amber-400",
    bg: "bg-amber-500/15",
  },
  music: { icon: Music, color: "text-violet-400", bg: "bg-violet-500/15" },
  art: { icon: Palette, color: "text-sky-400", bg: "bg-sky-500/15" },
  geography: { icon: Globe, color: "text-red-400", bg: "bg-red-500/15" },
  astronomy: {
    icon: Mountain,
    color: "text-indigo-400",
    bg: "bg-indigo-500/15",
  },
  history: { icon: History, color: "text-orange-400", bg: "bg-orange-500/15" },
  psychology: { icon: Brain, color: "text-rose-400", bg: "bg-rose-500/15" },
  writing: { icon: PenTool, color: "text-teal-400", bg: "bg-teal-500/15" },
  default: { icon: BookOpen, color: "text-indigo-400", bg: "bg-indigo-500/15" },
};

export function CategoriesSection() {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

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

  const getCategoryConfig = (slug: string, name: string) => {
    const slugLower = slug.toLowerCase();
    const nameLower = name.toLowerCase();
    return (
      categoryConfig[slugLower] ||
      categoryConfig[nameLower] ||
      categoryConfig.default
    );
  };

  return (
    <section ref={sectionRef} className="py-24 bg-white/1">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16 reveal">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 px-5 py-2 mb-6 text-sm font-medium bg-indigo-500/10">
            <Sparkles className="h-4 w-4 text-indigo-400" />
            <span className="text-indigo-300">Explore Subjects</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-gradient tracking-tight">
            Browse by Category
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Explore thousands of tutors across various subjects and find the
            perfect match for your learning goals.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <Skeleton
                key={i}
                className="h-36 w-full rounded-2xl bg-white/5 reveal"
              />
            ))
          ) : categories && categories.length > 0 ? (
            categories.slice(0, 8).map((category, i) => {
              const config = getCategoryConfig(category.slug, category.name);
              const Icon = config.icon;

              return (
                <Link
                  key={category.id}
                  href={`/tutors?category=${category.slug}`}
                  className="reveal group"
                  style={{ transitionDelay: `${i * 50}ms` }}
                >
                  <div className="glass glass-hover rounded-2xl p-6 text-center transition-all duration-400 hover:-translate-y-1.5 relative overflow-hidden h-full">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 ${config.bg}`}
                    >
                      <Icon className={`h-7 w-7 ${config.color}`} />
                    </div>
                    <h3 className="font-semibold mb-1.5 text-base">
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {category.tutorCount || 0}+ Tutors
                    </p>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No categories available</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
