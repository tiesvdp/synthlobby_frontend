import { type FunctionComponent, memo, Suspense, useState } from "react";
import { Card } from "@heroui/react";
import { Button } from "@heroui/button";
import { motion } from "framer-motion";
import { Line } from "react-chartjs-2";
import { HeartIcon } from "@/components/heartIcon.tsx";
import type { Synth } from "@/models/synths.ts";
import { useAuth } from "@/context/authContext";
import { usePriceChart, Granularity } from "@/hooks/usePriceChart";
import SynthPriceDisplay from "./synthPriceDisplay";
import CompareButton from "./compareButton";
import { formatSynthName } from "@/utils/nameUtils";
import ActionButtonWrapper from "../actionButtonWrapper";

interface SynthCardProps {
  synth: Synth;
  liked: boolean;
  isCompared: boolean;
  onToggleLike: (id: string) => void;
  onToggleCompare: (id: string) => void;
}

const GranularityButton = ({
  mode,
  label,
  granularity,
  setGranularity,
}: {
  mode: Granularity;
  label: string;
  granularity: Granularity;
  setGranularity: (g: Granularity) => void;
}) => (
  <button
    onClick={() => setGranularity(mode)}
    className={`flex items-center justify-center w-7 h-7 text-xs rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-1 ${
      granularity === mode
        ? "bg-purple-700 text-white font-semibold shadow-sm"
        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
    }`}
  >
    {label}
  </button>
);

const SynthCard: FunctionComponent<SynthCardProps> = ({
  synth,
  liked,
  isCompared,
  onToggleLike,
  onToggleCompare,
}) => {
  const [granularity, setGranularity] = useState<Granularity>("day");
  const { chartData, chartOptions } = usePriceChart([synth], granularity);

  const getAvailabilityStyle = (availability: string) => {
    switch (availability.toLowerCase()) {
      case "in stock":
        return "bg-green-100 text-green-800 border-green-200";
      case "sold out":
        return "bg-red-100 text-red-800 border-red-200";
      case "available soon":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const { currentUser } = useAuth();
  const isAuthenticated = !!currentUser;

  return (
    <Card
      className="w-full flex flex-col lg:flex-row p-4 gap-4 lg:gap-6"
      id={synth.id + synth.source}
    >
      <div className="w-full lg:w-1/3 flex-shrink-0">
        <a
          href={synth.href}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full rounded-xl block cursor-pointer aspect-square"
          tabIndex={0}
          aria-label={`Open ${name} on source site`}
        >
          <Suspense
            fallback={
              <div className="w-full rounded-xl bg-gray-200 aspect-square" />
            }
          >
            <motion.div
              animate={{ opacity: 1, scale: 1 }}
              className="w-full h-full"
              initial={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img
                alt="Card background"
                className="object-cover rounded-xl w-full h-full p-2"
                src={synth.image || "/placeholder.svg"}
              />
            </motion.div>
          </Suspense>
        </a>
      </div>
      <div className="w-full lg:w-2/3 flex flex-col">
        <div className="flex flex-col items-start">
          <div className="flex justify-between w-full flex-col sm:flex-row sm:items-start">
            <div className="pe-4">
              <h4 className="font-bold text-large text-start">
                {formatSynthName(synth)}
              </h4>
            </div>
            <div className="min-w-fit mt-1 sm:mt-0 flex-shrink-0 flex">
              <span
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${getAvailabilityStyle(
                  synth.availability
                )}`}
              >
                {synth.availability}
              </span>
            </div>
          </div>
          <SynthPriceDisplay synth={synth} />
        </div>
        <div className="mt-4 flex flex-col flex-grow">
          <div className="flex justify-end gap-2 mb-2">
            <GranularityButton
              mode="day"
              label="D"
              granularity={granularity}
              setGranularity={setGranularity}
            />
            <GranularityButton
              mode="week"
              label="W"
              granularity={granularity}
              setGranularity={setGranularity}
            />
            <GranularityButton
              mode="month"
              label="M"
              granularity={granularity}
              setGranularity={setGranularity}
            />
            <GranularityButton
              mode="year"
              label="Y"
              granularity={granularity}
              setGranularity={setGranularity}
            />
          </div>
          <div className="relative flex-grow min-h-[150px]">
            <Line data={chartData} options={chartOptions as any} />
          </div>
        </div>
        <div className="flex justify-between items-center mt-4 pt-2 border-t">
          <div className="px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wide bg-purple-100 text-purple-800 border border-purple-200">
            {synth.source}
          </div>
          <div className="flex items-center gap-1 w-auto">
            <CompareButton
              isCompared={isCompared}
              onPress={() => onToggleCompare(synth.id)}
            />
            <ActionButtonWrapper>
              <Button
                isIconOnly
                aria-label="Like"
                className="bg-transparent w-9 h-9 min-w-0"
                disableRipple={true}
                onPress={() => onToggleLike(synth.id)}
                isDisabled={!isAuthenticated}
              >
                <HeartIcon filled={liked} />
              </Button>
            </ActionButtonWrapper>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default memo(SynthCard);
