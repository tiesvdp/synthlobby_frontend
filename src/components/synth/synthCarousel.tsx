import { useEffect, useState, useMemo } from "react";
import { HeartIcon } from "@/components/heartIcon.tsx";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { motion } from "framer-motion";
import { calculateRecentPriceChange } from "@/utils/priceUtils.ts";
import { useGetSynths } from "@/api/synths";
import { Spinner } from "@heroui/react";
import { useUserPreferences } from "@/context/userPreferencesContext";
import { formatSynthName } from "@/utils/nameUtils";

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

    const synthsWithChange = [];
    for (const synth of synths) {
      if (!Array.isArray(synth.prices) || synth.prices.length < 2) continue;

      const sortedPrices = [...synth.prices].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      const recentPrices = sortedPrices.slice(0, 5).map((p) => p.price);
      const uniquePrices = new Set(recentPrices);

      if (uniquePrices.size > 1) {
        let maxChange = 0;
        for (let i = 1; i < recentPrices.length; i++) {
          const prev = recentPrices[i];
          const curr = recentPrices[i - 1];
          if (prev && curr && prev !== 0) {
            const relChange = Math.abs((curr - prev) / prev);
            if (relChange > maxChange) maxChange = relChange;
          }
        }
        synthsWithChange.push({ ...synth, maxRelativeChange: maxChange });
      }
    }

    return synthsWithChange
      .sort((a, b) => b.maxRelativeChange - a.maxRelativeChange)
      .slice(0, 8); // Limit to top 8 most changed
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
              const { currentPrice, previousPrice, percentChange } =
                calculateRecentPriceChange(synth.prices);

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
                          className="object-cover absolute top-0 left-0 w-full h-full transition-transform duration-500 hover:scale-110"
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
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                        <p className="text-white font-bold truncate">
                          {formatSynthName(synth)}
                        </p>
                      </div>
                    </div>
                    <div className="p-4 flex justify-between items-center bg-white">
                      <div>
                        <p className="text-default-500 text-sm">
                          {synth.source}
                        </p>
                        <div className="flex items-center gap-2">
                          {previousPrice !== null &&
                            previousPrice !== currentPrice && (
                              <span className="text-gray-400 text-base line-through font-medium">
                                €{previousPrice}
                              </span>
                            )}
                          {currentPrice !== null && (
                            <span className="font-bold text-xl text-[#c026d3]">
                              €{currentPrice}
                            </span>
                          )}
                          {percentChange !== null &&
                            previousPrice !== currentPrice && (
                              <span
                                className={`ml-2 px-2 py-1 rounded text-xs font-semibold ${
                                  percentChange > 0
                                    ? "bg-red-100 text-red-700"
                                    : "bg-green-100 text-green-700"
                                }`}
                              >
                                {percentChange > 0 ? "+" : ""}
                                {percentChange.toFixed(1)}%
                              </span>
                            )}
                        </div>
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
