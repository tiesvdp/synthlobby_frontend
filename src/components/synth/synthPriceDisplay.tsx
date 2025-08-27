import { FunctionComponent, useMemo } from "react";
import { calculateRecentPriceChange, hasRecentPrice } from "@/utils/priceUtils";
import { Synth } from "@/models/synths";

interface SynthPriceDisplayProps {
  synth: Synth;
}

const SynthPriceDisplay: FunctionComponent<SynthPriceDisplayProps> = ({
  synth,
}) => {
  const priceData = useMemo(() => {
    if (!hasRecentPrice(synth)) {
      return { isPriceAvailableToday: false };
    }

    const { currentPrice, previousPrice, percentChange } =
      calculateRecentPriceChange(synth.prices);

    return {
      isPriceAvailableToday: true,
      currentPrice,
      previousPrice,
      percentChange,
    };
  }, [synth]);

  if (!priceData.isPriceAvailableToday) {
    return (
      <div className="flex items-center gap-2 mt-2 sm:mt-1 h-[28px]">
        <p className="text-sm text-gray-500 italic">
          Price currently not available
        </p>
      </div>
    );
  }

  const { currentPrice, previousPrice, percentChange } = priceData;

  return (
    <div className="flex items-center gap-2 mt-2 sm:mt-1">
      {previousPrice !== null && (
        <span className="text-gray-400 text-base line-through font-medium">
          €{previousPrice}
        </span>
      )}
      {currentPrice !== null && (
        <span className="font-bold text-xl text-[#c026d3]">
          €{currentPrice}
        </span>
      )}
      {percentChange !== null && percentChange !== undefined && (
        <span
          className={`ml-2 px-2.5 py-1 rounded-lg text-xs font-semibold border ${
            percentChange > 0
              ? "bg-red-100 text-red-800 border-red-200"
              : "bg-green-100 text-green-800 border-green-200"
          }`}
        >
          {percentChange > 0 ? "▲" : "▼"} {Math.abs(percentChange).toFixed(1)}%
        </span>
      )}
    </div>
  );
};

export default SynthPriceDisplay;
