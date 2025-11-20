import { Hero, FeaturesSection, SecuritySection, TestimonialsSection } from "@/components";

export default function HomePage() {
  return (
    <div className="space-y-10 pb-24">
      <Hero />
      <FeaturesSection />
      <SecuritySection />
      <TestimonialsSection />
    </div>
  );
}


