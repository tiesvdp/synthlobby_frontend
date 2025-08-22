import { title } from "@/components/primitives";
import { motion } from "framer-motion";
import { SynthCarousel } from "../synth/synthCarousel";
import React from "react";
import FallBack from "../fallBack";
import LastRefreshed from "../lastRefreshed";

export function FeaturedSynthsSection() {
  return (
    <section className="w-full lg:my-16 my-8 py-4 relative">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-6 xl:mb-8"
        >
          <h2 className={`${title({ size: "sm" })}`}>
            Recent <span className="text-[#c026d3]">Price</span> Changes
          </h2>
          <div className="lg:hidden mt-4">
            <React.Suspense fallback={<FallBack text="Loading..." />}>
              <LastRefreshed />
            </React.Suspense>
          </div>
        </motion.div>
        <SynthCarousel />
      </div>
    </section>
  );
}
