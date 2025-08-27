import { useEffect, useState, useMemo } from "react";
import { HeartIcon } from "@/components/heartIcon.tsx";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { motion } from "framer-motion";
import { useGetSynths } from "@/api/synths";
import { Spinner } from "@heroui/react";
import { useUserPreferences } from "@/context/userPreferencesContext";
import { formatSynthName } from "@/utils/nameUtils";
import { calculateRecentPriceChange } from "@/utils/priceUtils";
import SynthPriceDisplay from "./synthPriceDisplay";

export function SynthCarousel() {
  const { data: synths, isLoading: isLoadingSynths } = useGetSynths();
  const {
    likedSynthIds,
    toggleLike,
    isLoading: isLoadingLikes,
  } = useUserPreferences();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [cardsToShow, setCardsToShow] = useState(3);

  const changedSynths = useMemo(() => {
    if (!synths) return [];

    const synthsWithChange = synths
      .map((synth) => {
        const { percentChange } = calculateRecentPriceChange(synth.prices, 5);
        if (percentChange !== null && percentChange !== 0) {
          return { ...synth, maxRelativeChange: Math.abs(percentChange) };
        }
        return null;
      })
      .filter(
        (
          synth
        ): synth is (typeof synths)[number] & { maxRelativeChange: number } =>
          synth !== null
      )
      .sort((a, b) => b.maxRelativeChange - a.maxRelativeChange)
      .slice(0, 8);

    return synthsWithChange;
  }, [synths]);

  useEffect(() => {
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
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      const numItems = changedSynths.length;
      if (numItems <= cardsToShow) return 0;
      const nextIndex = prevIndex + 1;
      return nextIndex >= numItems - cardsToShow + 1 ? 0 : nextIndex;
    });
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      const numItems = changedSynths.length;
      if (numItems <= cardsToShow) return 0;
      return prevIndex === 0
        ? Math.max(0, numItems - cardsToShow)
        : prevIndex - 1;
    });
  };

  useEffect(() => {
    if (isHovering || changedSynths.length <= cardsToShow) return;

    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, isHovering, changedSynths.length, cardsToShow]);

  if (isLoadingSynths || isLoadingLikes) {
    return (
      <div className="w-full flex justify-center items-center py-20">
        <Spinner color="secondary" label="Loading Trending Synths..." />
      </div>
    );
  }

  if (changedSynths.length < 3) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">
          Not enough trending synths to display right now.
        </p>
      </div>
    );
  }

  return (
    <div
      className="relative pb-8"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="rounded-xl overflow-hidden shadow-lg border border-purple-100 bg-white">
        <div className="flex overflow-hidden">
          <motion.div
            className="flex w-full"
            initial={false}
            animate={{ x: `-${currentIndex * (100 / cardsToShow)}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {changedSynths.map((synth) => {
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
                      <a
                        href={synth.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full h-full absolute top-0 left-0 block cursor-pointer"
                        tabIndex={0}
                        aria-label={`Open ${formatSynthName(
                          synth
                        )} on source site`}
                      >
                        <img
                          alt={formatSynthName(synth)}
                          className="object-contain bg-white absolute top-0 left-0 w-full h-full transition-transform duration-500 hover:scale-110"
                          src={synth.image || "/placeholder.svg"}
                        />
                      </a>
                      <div className="absolute top-2 right-2">
                        <Button
                          isIconOnly
                          aria-label="Like"
                          className="bg-white/80 backdrop-blur-sm"
                          size="sm"
                          onPress={() => toggleLike(synth.id)}
                        >
                          <HeartIcon filled={likedSynthIds.has(synth.id)} />
                        </Button>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <p className="text-white font-bold truncate">
                          {formatSynthName(synth)}
                        </p>
                      </div>
                    </div>
                    <div className="p-4 pt-3 flex justify-between items-center bg-white">
                      <div>
                        <SynthPriceDisplay synth={synth} />
                        <p className="text-default-500 text-sm">
                          {synth.source}
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

      <div className="flex justify-center items-center mt-4 gap-4">
        <Button
          isIconOnly
          className="bg-white shadow-md hover:bg-purple-50 transition-colors"
          size="sm"
          radius="full"
          onPress={handlePrev}
          isDisabled={changedSynths.length <= cardsToShow}
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

        <div className="flex justify-center gap-1">
          {Array.from({
            length: Math.max(0, changedSynths.length - cardsToShow + 1),
          }).map((_, index) => (
            <button
              key={index}
              className={`h-2 rounded-full transition-all ${
                currentIndex === index ? "w-6 bg-[#c026d3]" : "w-2 bg-gray-200"
              }`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <Button
          isIconOnly
          className="bg-white shadow-md hover:bg-purple-50 transition-colors"
          size="sm"
          radius="full"
          onPress={handleNext}
          isDisabled={changedSynths.length <= cardsToShow}
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
