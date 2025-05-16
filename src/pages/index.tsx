"use client"
import { CategoriesSection } from "@/components/homepage/categoriesSection"
import { CtaSection } from "@/components/homepage/ctaSection"
import { FeaturesSection } from "@/components/homepage/featuresSection"
import { HeroSection } from "@/components/homepage/heroSection"
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
