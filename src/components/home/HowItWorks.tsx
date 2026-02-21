"use client";

import { Search, Calendar, Video, Star } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Find a Tutor",
    description:
      "Browse through our list of expert tutors and find the perfect match for your needs.",
    color: "text-blue-500",
    bg: "bg-blue-100 dark:bg-blue-900/20",
  },
  {
    icon: Calendar,
    title: "Book a Session",
    description:
      "Choose a time that works for you and book your session instantly.",
    color: "text-green-500",
    bg: "bg-green-100 dark:bg-green-900/20",
  },
  {
    icon: Video,
    title: "Start Learning",
    description: "Connect with your tutor and start your learning journey.",
    color: "text-purple-500",
    bg: "bg-purple-100 dark:bg-purple-900/20",
  },
  {
    icon: Star,
    title: "Leave a Review",
    description: "Share your experience and help others find the best tutors.",
    color: "text-yellow-500",
    bg: "bg-yellow-100 dark:bg-yellow-900/20",
  },
];

export function HowItWorks() {
  return (
    <section className="py-16 bg-muted/50">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get started with SkillBridge in four simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="text-center">
                <div className="relative">
                  <div
                    className={`w-20 h-20 mx-auto rounded-full ${step.bg} flex items-center justify-center mb-6`}
                  >
                    <Icon className={`h-10 w-10 ${step.color}`} />
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-[60%] w-full h-0.5 bg-border">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-border" />
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
