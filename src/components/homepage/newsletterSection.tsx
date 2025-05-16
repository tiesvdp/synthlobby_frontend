import { useState } from "react"
import { Button } from "@heroui/button"
import { Input } from "@heroui/input"
import { motion } from "framer-motion"

export function NewsletterSection() {
  const [email, setEmail] = useState("")

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    alert(`Thanks for subscribing with ${email}!`)
    setEmail("")
  }

  return (
    <section className="w-full py-20 relative">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-[#fad6ff] rounded-2xl p-10 shadow-lg relative overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-purple-200 opacity-30 blur-xl"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-pink-200 opacity-30 blur-xl"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
            <div>
              <h3 className="text-2xl font-bold mb-2">
                Stay Updated on <span className="text-[#c026d3]">Price Drops</span>
              </h3>
              <p className="text-default-500 mt-2">
                Subscribe to our newsletter and never miss a deal on your dream synth.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
              <Input
                type="email"
                label="Email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow"
                required
              />
              <Button
                type="submit"
                className="bg-[#c026d3] text-white rounded-full px-6 hover:bg-[#a21caf] transition-colors"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
