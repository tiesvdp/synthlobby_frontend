import { title } from "@/components/primitives"
import { motion } from "framer-motion"
import { SynthCarousel } from "../synth/synthCarousel"

export function FeaturedSynthsSection() {
  return (
    <section className="w-full my-16 py-4 relative">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <h2 className={`${title({ size: "sm" })}`}>
            <span className="text-[#c026d3]">Featured</span> Synths
          </h2>
        </motion.div>
        <SynthCarousel />
      </div>
    </section>
  )
}
