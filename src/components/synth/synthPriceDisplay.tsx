import { FunctionComponent, useMemo } from "react";
import { calculateRecentPriceChange } from "@/utils/priceUtils";
import { Synth } from "@/models/synths";

interface SynthPriceDisplayProps {
  synth: Synth;
}

const SynthPriceDisplay: FunctionComponent<SynthPriceDisplayProps> = ({
  synth,
}) => {
  const { currentPrice, previousPrice, percentChange } = useMemo(
    () => calculateRecentPriceChange(synth.prices),
    [synth.prices]
  );

  return (
    <div className="flex items-center gap-2 mt-2 sm:mt-1">
      {previousPrice !== null && (
        <span className="text-gray-400 text-base line-through font-medium">
          €{previousPrice}
        </span>
      )}
      {currentPrice !== null ? (
        <span className="font-bold text-xl text-[#c026d3]">
          €{currentPrice}
        </span>
      ) : (
        <p className="text-tiny uppercase font-bold text-gray-400">
          no price available
        </p>
      )}
      {percentChange !== null && (
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
