import { CategoriesSection } from "@/components/home/CategoriesSection";
import { FeaturedTutors } from "@/components/home/FeaturedTutors";
import { HeroSection } from "@/components/home/HeroSection";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Testimonials } from "@/components/home/Testimonials";
import { MarqueeBar } from "@/components/home/MarqueeBar";
import { CTASection } from "@/components/home/CTASection";

export default async function HomePage() {
  return (
    <main className="relative overflow-hidden bg-background">
      <HeroSection />
      <MarqueeBar />
      <FeaturedTutors />
      <CategoriesSection />
      <HowItWorks />
      <Testimonials />
      <CTASection />
    </main>
  );
}
export const dynamic = "force-dynamic";
