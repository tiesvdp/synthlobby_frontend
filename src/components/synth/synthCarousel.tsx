import { useEffect, useState } from "react"
import { Card, CardBody, CardFooter } from "@heroui/card"
import { Button } from "@heroui/button"
import { Image } from "@heroui/image"
import { HeartIcon } from "@/components/heartIcon.tsx"
import { useSynths } from "@/context/synthContext.tsx"
import { motion } from "framer-motion"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

export function SynthCarousel() {
  const { synths, setSynths } = useSynths()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  // Get featured synths - we'll use the first 8 synths for the carousel
  const featuredSynths = synths.slice(0, 8)

  // Number of cards to show based on screen size
  const [cardsToShow, setCardsToShow] = useState(3)

  useEffect(() => {
    // Set cards to show based on window width
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsToShow(1)
      } else if (window.innerWidth < 1024) {
        setCardsToShow(2)
      } else {
        setCardsToShow(3)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    // Set loaded state
    if (synths.length > 0) {
      setIsLoaded(true)
    }

    return () => window.removeEventListener("resize", handleResize)
  }, [synths])

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + cardsToShow >= featuredSynths.length ? 0 : prevIndex + 1))
  }

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? Math.max(0, featuredSynths.length - cardsToShow) : prevIndex - 1))
  }

  const handleToggleLike = (id) => {
    setSynths((prev) => prev.map((s) => (s.id === id ? { ...s, liked: !s.liked } : s)))
  }

  if (!isLoaded || featuredSynths.length === 0) {
    return (
      <div className="w-full flex justify-center items-center py-20">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-64 bg-default-200 rounded mb-4"></div>
          <div className="h-64 w-full max-w-md bg-default-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      <div className="flex overflow-hidden">
        <motion.div
          className="flex"
          initial={{ x: 0 }}
          animate={{ x: -currentIndex * (100 / cardsToShow) + "%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {featuredSynths.map((synth, index) => {
            const name =
              synth.source?.toLowerCase().includes("bax") || synth.source?.toLowerCase().includes("musicstore")
                ? synth.naam
                : `${synth.merk} ${synth.naam}`

            return (
              <div
                key={synth.id}
                className={`w-full shrink-0`}
                style={{ width: `${100 / cardsToShow}%`, padding: "0 0.5rem" }}
              >
                <Card className="h-full">
                  <CardBody className="p-0">
                    <div className="relative pt-[56.25%] bg-default-100">
                      <Image
                        removeWrapper
                        alt={name}
                        className="object-cover absolute top-0 left-0 w-full h-full z-0"
                        src={synth.afbeelding || "/placeholder.svg"}
                      />
                      <div className="absolute top-2 right-2 z-10">
                        <Button
                          isIconOnly
                          aria-label="Like"
                          className="bg-background/60 backdrop-blur-md"
                          radius="full"
                          size="sm"
                          onClick={() => handleToggleLike(synth.id)}
                        >
                          <HeartIcon filled={synth.liked} />
                        </Button>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                        <p className="text-white font-bold truncate">{name}</p>
                      </div>
                    </div>
                  </CardBody>
                  <CardFooter className="flex justify-between items-center">
                    <div>
                      <p className="text-default-500 text-sm">{synth.source}</p>
                      <p className="font-bold text-lg">{synth.prijs ? `€${synth.prijs}` : "Price unavailable"}</p>
                    </div>
                    <Button size="sm" color="primary" variant="flat" radius="full" className="font-medium">
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            )
          })}
        </motion.div>
      </div>

      {/* Navigation buttons */}
      <Button
        isIconOnly
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-background/60 backdrop-blur-md z-10"
        radius="full"
        variant="flat"
        onClick={handlePrev}
      >
        <ChevronLeftIcon />
      </Button>

      <Button
        isIconOnly
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-background/60 backdrop-blur-md z-10"
        radius="full"
        variant="flat"
        onClick={handleNext}
      >
        <ChevronRightIcon />
      </Button>

      {/* Dots indicator */}
      <div className="flex justify-center mt-4 gap-1">
        {Array.from({ length: Math.ceil(featuredSynths.length / cardsToShow) }).map((_, index) => (
          <button
            key={index}
            className={`h-2 rounded-full transition-all ${
              Math.floor(currentIndex / cardsToShow) === index ? "w-6 bg-primary" : "w-2 bg-default-200"
            }`}
            onClick={() => setCurrentIndex(index * cardsToShow)}
          />
        ))}
      </div>
    </div>
  )
}
