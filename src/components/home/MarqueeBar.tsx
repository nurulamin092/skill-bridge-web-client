"use client";

import {
  Star,
  GraduationCap,
  BookOpen,
  Users,
  Zap,
  Shield,
  DollarSign,
  Globe,
} from "lucide-react";

const items = [
  { icon: Star, text: "4.9 Average Rating" },
  { icon: GraduationCap, text: "500+ Expert Tutors" },
  { icon: BookOpen, text: "50+ Subjects" },
  { icon: Users, text: "10,000+ Students" },
  { icon: Zap, text: "Instant Booking" },
  { icon: Shield, text: "Secure Payments" },
  { icon: DollarSign, text: "Money-back Guarantee" },
  { icon: Globe, text: "Global Community" },
];

export function MarqueeBar() {
  const doubledItems = [...items, ...items];

  return (
    <div className="overflow-hidden border-y border-white/5 bg-white/5 py-4">
      <div className="marquee-track">
        {doubledItems.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 whitespace-nowrap text-sm text-muted-foreground"
          >
            <item.icon className="h-4 w-4 text-indigo-400" />
            {item.text}
          </div>
        ))}
      </div>
    </div>
  );
}
