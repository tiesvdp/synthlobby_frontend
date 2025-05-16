"use client"
import { CategoriesSection } from "@/components/homepage/categoriesSection"
import { CtaSection } from "@/components/homepage/ctaSection"
import { FeaturesSection } from "@/components/homepage/featuresSection"
import { HeroSection } from "@/components/homepage/heroSection"
import { HeroSectionAlt1 } from "@/components/homepage/heroSectionAlt1"
import { HeroSectionAlt2 } from "@/components/homepage/heroSectionAlt2"
import { HeroSectionAlt3 } from "@/components/homepage/heroSectionAlt3"
import { NewsletterSection } from "@/components/homepage/newsletterSection"
import { StatsSection } from "@/components/homepage/statsSection"
import { FeaturedSynthsSection } from "@/components/homepage/synthsSection"
import DefaultLayout from "@/layouts/default"
import "@/styles/heroClipPath.css"

export default function IndexPage() {
  return (
    <DefaultLayout>
      <HeroSection />
      <FeaturedSynthsSection />
      <FeaturesSection />
      <StatsSection />
      <CategoriesSection />
      <NewsletterSection />
      <CtaSection />
    </DefaultLayout>
  )
}
