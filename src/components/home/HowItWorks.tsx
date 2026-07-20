"use client";

import { Search, Calendar, Video, Star, Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";

const steps = [
  {
    icon: Search,
    title: "Find a Tutor",
    description:
      "Browse through our list of expert tutors and find the perfect match for your needs.",
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
    gradient: "from-indigo-500/20 to-violet-500/20",
  },
  {
    icon: Calendar,
    title: "Book a Session",
    description:
      "Choose a time that works for you and book your session instantly with one click.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    gradient: "from-emerald-500/20 to-teal-500/20",
  },
  {
    icon: Video,
    title: "Start Learning",
    description:
      "Connect with your tutor via video call and start your personalized learning journey.",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    gradient: "from-violet-500/20 to-purple-500/20",
  },
  {
    icon: Star,
    title: "Leave a Review",
    description:
      "Share your experience and help others find the best tutors in the community.",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    gradient: "from-amber-500/20 to-orange-500/20",
  },
];

export function HowItWorks() {
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
    <section ref={sectionRef} className="py-24 relative">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-20 reveal">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 px-5 py-2 mb-6 text-sm font-medium bg-indigo-500/10">
            <Sparkles className="h-4 w-4 text-indigo-400" />
            <span className="text-indigo-300">Simple Process</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-gradient tracking-tight">
            How It Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Get started with SkillBridge in four simple steps and begin your
            learning journey today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="reveal text-center relative"
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[60%] w-[calc(100%-20px)] h-0.5">
                    <div
                      className={`w-full h-full bg-linear-to-r ${step.gradient}`}
                    />
                  </div>
                )}

                {/* Step Number + Icon */}
                <div className="relative inline-block mb-6">
                  <div
                    className={`w-20 h-20 mx-auto rounded-2xl ${step.bg} ${step.border} border-2 flex items-center justify-center transition-transform duration-300 hover:scale-105`}
                  >
                    <Icon className={`h-9 w-9 ${step.color}`} />
                  </div>
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-linear-to-r from-indigo-500 to-violet-500 flex items-center justify-center text-white text-xs font-bold shadow-lg">
                    {index + 1}
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-[15px] max-w-65 mx-auto">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
