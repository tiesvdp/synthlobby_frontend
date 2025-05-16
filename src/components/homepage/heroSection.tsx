import { Button } from "@heroui/button"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { title } from "../primitives"

export function HeroSection() {
  const navigate = useNavigate()

  function handleClick() {
    navigate("/synths")
  }

  return (
    <section className="relative overflow-hidden">
      {/* Background with diagonal clip path */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2d064d] to-[#7c1fa2] clip-hero-path"></div>      
      <div className="container mx-auto px-4 py-16 md:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-start text-white ps-3"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Ditch the hunt! <span className={title({ color: "violet" })}>the cheapest keyboards,</span>{" "}
              <span className="whitespace-nowrap">curated for you.</span>
            </h1>
            <p className="text-lg text-gray-200 mb-6">SynthLobby scans the web for the best deals.</p>
            <Button
              className="bg-gradient-to-b from-[#FF1CF7] to-[#b249f8] shadow-lg"
              radius="full"
              size="lg"
              onClick={handleClick}
            >
              <span className="font-medium text-white text-lg">Explore Synths</span>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative mt-8 md:mt-0"
          >
            <div className="relative overflow-hidden rounded-[2rem] md:rounded-[3rem] shadow-2xl me-2">
              <img
                src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                alt="Music studio with synthesizers"
                className="w-full h-auto"
              />
                <div className="absolute inset-0 bg-gradient-to-t from-[#7c1fa2]/40 to-transparent"></div>              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white font-bold text-xl ps-2">Find your perfect sound</p>
                <p className="text-gray-200 ps-2">Compare prices across all major retailers</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
