import { FeaturedTutors } from "@/components/home/FeaturedTutors";
import { HeroSection } from "@/components/home/HeroSection";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Testimonials } from "@/components/home/Testimonials";

export default async function HomePage() {
  return (
    <main>
      <HeroSection />
      <FeaturedTutors />
      <HowItWorks />
      <Testimonials />
    </main>
  );
}
