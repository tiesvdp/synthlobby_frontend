import { Button } from "@heroui/button"
import { useNavigate } from "react-router-dom"
import { title, subtitle } from "@/components/primitives"
import DefaultLayout from "@/layouts/default"
import { Card, CardBody } from "@heroui/card"
import { Input } from "@heroui/input"
import { useState } from "react"
import { motion } from "framer-motion"
import { Chip } from "@heroui/chip"
import { SearchIcon, TrendingUpIcon, ZapIcon } from "lucide-react"
import { SynthCarousel } from "@/components/synth/synthCarousel"

export default function IndexPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")

  function handleClick() {
    navigate("/synths")
  }

  const handleSubscribe = (e) => {
    e.preventDefault()
    // Handle newsletter subscription
    alert(`Thanks for subscribing with ${email}!`)
    setEmail("")
  }

  return (
    <DefaultLayout>
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <span className={`${title()}`}>Ditch the hunt!&nbsp;</span>{" "}
          <span className={title({ color: "violet" })}>the cheapest keyboards,&nbsp;</span>
          <br />
          <span className={title()}>curated for you.</span>
          <div className={subtitle({ class: "mt-4" })}>SynthLobby scans the web for the best deals.</div>
        </div>

        <div className="flex gap-3">
          <Button
            className="bg-gradient-to-b from-[#FF1CF7] to-[#b249f8] shadow-lg"
            radius="full"
            size="lg"
            variant="shadow"
            onClick={handleClick}
          >
            <span className="font-medium text-white text-lg">Explore Synths</span>
          </Button>
        </div>
      </section>

      {/* Featured Synths Carousel */}
      <section className="w-full py-10">
        <div className="container mx-auto px-4">
          <h2 className={title({ size: "sm", class: "mb-6" })}>
            <span className={title({ color: "violet" })}>Featured</span> Synths
          </h2>
          <SynthCarousel />
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-16 bg-gradient-to-b from-background/60 to-background/5 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <h2 className={`${title({ size: "sm" })} text-center mb-12`}>
            Why Choose <span className={title({ color: "violet" })}>SynthLobby</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardBody className="flex flex-col items-center text-center p-6">
                  <div className="rounded-full bg-primary/10 p-4 mb-4">
                    <SearchIcon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Smart Search</h3>
                  <p className="text-default-500">
                    Find exactly what you're looking for with our powerful filtering system.
                  </p>
                </CardBody>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardBody className="flex flex-col items-center text-center p-6">
                  <div className="rounded-full bg-primary/10 p-4 mb-4">
                    <TrendingUpIcon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Price Tracking</h3>
                  <p className="text-default-500">
                    We continuously monitor prices across multiple retailers to find the best deals.
                  </p>
                </CardBody>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardBody className="flex flex-col items-center text-center p-6">
                  <div className="rounded-full bg-primary/10 p-4 mb-4">
                    <ZapIcon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Real-time Updates</h3>
                  <p className="text-default-500">Get notified instantly when prices drop on your favorite synths.</p>
                </CardBody>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              <span className={title({ size: "sm", color: "violet" })}>500+</span>
              <span className="text-default-500">Synths Tracked</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              <span className={title({ size: "sm", color: "violet" })}>20+</span>
              <span className="text-default-500">Retailers</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              <span className={title({ size: "sm", color: "violet" })}>€10K+</span>
              <span className="text-default-500">Saved by Users</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              <span className={title({ size: "sm", color: "violet" })}>5K+</span>
              <span className="text-default-500">Happy Musicians</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="w-full py-16 bg-gradient-to-b from-background/60 to-background/5 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <h2 className={`${title({ size: "sm" })} mb-8`}>
            Popular <span className={title({ color: "violet" })}>Categories</span>
          </h2>

          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            {[
              "Analog Synths",
              "Digital Keyboards",
              "MIDI Controllers",
              "Modular Systems",
              "Drum Machines",
              "Grooveboxes",
              "Workstations",
              "Samplers",
              "Eurorack",
              "Vintage",
            ].map((category) => (
              <Chip
                key={category}
                variant="shadow"
                classNames={{
                  base: "bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30",
                  content: "drop-shadow shadow-black text-white font-semibold",
                }}
                size="lg"
                onClick={() => navigate("/synths")}
                className="cursor-pointer hover:scale-105 transition-transform"
              >
                {category}
              </Chip>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="w-full py-16">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border-none">
            <CardBody className="py-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className={title({ size: "sm" })}>
                    Stay Updated on <span className={title({ color: "violet" })}>Price Drops</span>
                  </h3>
                  <p className="text-default-500 mt-2 mb-4">
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
                  <Button type="submit" className="bg-gradient-to-b from-[#FF1CF7] to-[#b249f8]" radius="full">
                    Subscribe
                  </Button>
                </form>
              </div>
            </CardBody>
          </Card>
        </div>
      </section>

      {/* Final CTA */}
      <section className="w-full py-16 text-center">
        <div className="container mx-auto px-4">
          <h2 className={title({ size: "md" })}>
            Ready to find your <span className={title({ color: "violet" })}>perfect synth?</span>
          </h2>
          <p className={subtitle({ class: "mt-4 mb-8" })}>
            Join thousands of musicians who've already found their dream gear at the best prices.
          </p>
          <Button
            className="bg-gradient-to-b from-[#FF1CF7] to-[#b249f8] shadow-lg"
            radius="full"
            size="lg"
            variant="shadow"
            onClick={handleClick}
          >
            <span className="font-medium text-white text-lg">Start Browsing Now</span>
          </Button>
        </div>
      </section>
    </DefaultLayout>
  )
}
