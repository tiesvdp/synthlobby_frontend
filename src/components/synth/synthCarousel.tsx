"use client";

import { useEffect, useState } from "react";
import { useSynths } from "@/context/synthContext.tsx";
import { HeartIcon } from "@/components/heartIcon.tsx";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import type { Synth } from "@/models/synths.ts";
import { motion } from "framer-motion";

export function SynthCarousel() {
  const { synths, setSynths } = useSynths();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const featuredSynths = synths.slice(0, 8);

  // Number of cards to show based on screen size
  const [cardsToShow, setCardsToShow] = useState(3);

  useEffect(() => {
    // Set cards to show based on window width
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsToShow(1);
      } else if (window.innerWidth < 1024) {
        setCardsToShow(2);
      } else {
        setCardsToShow(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Set loaded state
    if (featuredSynths.length > 0) {
      setIsLoaded(true);
    }

    return () => window.removeEventListener("resize", handleResize);
  }, [featuredSynths]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 >= featuredSynths.length - cardsToShow + 1
        ? 0
        : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0
        ? Math.max(0, featuredSynths.length - cardsToShow)
        : prevIndex - 1
    );
  };

  const handleToggleLike = (id: Synth["id"]) => {
    setSynths((prev: Synth[]) =>
      prev.map((s: Synth) => (s.id === id ? { ...s, liked: !s.liked } : s))
    );
  };

  // Auto-advance carousel
  useEffect(() => {
    if (isHovering) return; // Don't auto-advance when user is hovering

    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, isHovering, featuredSynths.length]);

  if (!isLoaded || featuredSynths.length === 0) {
    return (
      <div className="w-full flex justify-center items-center py-20">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-64 bg-default-200 rounded mb-4"></div>
          <div className="h-64 w-full max-w-md bg-default-200 rounded"></div>
        </div>
      </div>
    );
  }

  // If we don't have enough musicstore synths, show a message
  if (featuredSynths.length < 3) {
    return (
      <div className="text-center py-10">
        <p>Not enough synths available. Check back soon!</p>
      </div>
    );
  }

  return (
    <div
      className="relative pb-8"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Carousel container with shadow and border */}
      <div className="rounded-xl overflow-hidden shadow-lg border border-purple-100 bg-white">
        <div className="flex overflow-hidden">
          <motion.div
            className="flex w-full"
            initial={false}
            animate={{ x: `-${currentIndex * (100 / cardsToShow)}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {featuredSynths.map((synth) => {
              const name = synth.name || `${synth.brand} ${synth.name}`;

              return (
                <motion.div
                  key={synth.id}
                  className="w-full shrink-0 border-2 border-pink-100 p-3 bg-gradient-to-r from-purple-100 to-pink-100"
                  style={{ width: `${100 / cardsToShow}%` }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="overflow-hidden border-none shadow-none h-full">
                    <div className="relative pt-[75%] bg-default-100 rounded-t-lg overflow-hidden">
                      <img
                        alt={name}
                        className="object-cover absolute top-0 left-0 w-full h-full transition-transform duration-500 hover:scale-110"
                        src={synth.image || "/placeholder.svg"}
                      />
                      <div className="absolute top-2 right-2">
                        <Button
                          isIconOnly
                          aria-label="Like"
                          className="bg-white/80 backdrop-blur-sm"
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
                    <div className="p-4 flex justify-between items-center bg-white">
                      <div>
                        <p className="text-default-500 text-sm">
                          {synth.source}
                        </p>
                        <p className="font-bold text-lg">
                          {synth.price
                            ? `€${synth.price}`
                            : "Price unavailable"}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Navigation controls - centered with arrows on either side of dots */}
      <div className="flex justify-center items-center mt-4 gap-4">
        <Button
          isIconOnly
          className="bg-white shadow-md hover:bg-purple-50 transition-colors"
          size="sm"
          radius="full"
          onClick={handlePrev}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </Button>

        {/* Dots indicator */}
        <div className="flex justify-center gap-1">
          {Array.from({
            length: Math.ceil(featuredSynths.length - cardsToShow + 1),
          }).map((_, index) => (
            <button
              key={index}
              className={`h-2 rounded-full transition-all ${
                currentIndex === index ? "w-6 bg-[#c026d3]" : "w-2 bg-gray-200"
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>

        <Button
          isIconOnly
          className="bg-white shadow-md hover:bg-purple-50 transition-colors"
          size="sm"
          radius="full"
          onClick={handleNext}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </Button>
      </div>
    </div>
  );
}
