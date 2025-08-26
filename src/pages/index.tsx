import { AccountCtaSection } from "@/components/homepage/accountCtaSection";
import { CtaSection } from "@/components/homepage/ctaSection";
import { FeaturesSection } from "@/components/homepage/featuresSection";
import { HeroSection } from "@/components/homepage/heroSection";
import { HowItWorksSection } from "@/components/homepage/howItWorksSection";
import { StatsSection } from "@/components/homepage/statsSection";
import { FeaturedSynthsSection } from "@/components/homepage/synthsSection";
import DefaultLayout from "@/layouts/default";
import "@/styles/heroClipPath.css";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <HeroSection />
      <FeaturedSynthsSection />
      <HowItWorksSection />
      <StatsSection />
      <FeaturesSection />
      <AccountCtaSection />

      <CtaSection />
    </DefaultLayout>
  );
}
