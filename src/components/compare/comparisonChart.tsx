import { useMemo, useState } from "react";
import { Card, CardBody, Spinner } from "@heroui/react";
import { Line } from "react-chartjs-2";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { useGetSynths } from "@/api/synths";
import { useUserPreferences } from "@/context/userPreferencesContext";
import { Synth } from "@/models/synths";
import { usePriceChart } from "@/hooks/usePriceChart";
import { formatSynthName } from "@/utils/nameUtils";
import { Granularity, TimeframeDurations } from "@/models/pricechart";
import SynthPriceDisplay from "../synth/synthPriceDisplay";

const GranularityButton = ({
  mode,
  label,
  activeGranularity,
  setGranularity,
}: {
  mode: Granularity;
  label: string;
  activeGranularity: Granularity;
  setGranularity: (g: Granularity) => void;
}) => (
  <button
    onClick={() => setGranularity(mode)}
    className={`px-3 py-1 text-xs rounded-md transition-colors ${
      activeGranularity === mode
        ? "bg-purple-700 text-white"
        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
    }`}
  >
    {label}
  </button>
);

const ComparisonItem = ({
  synth,
  onRemove,
}: {
  synth: Synth;
  onRemove: (id: string) => void;
}) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3, type: "spring" }}
      className="relative group flex items-center gap-4 bg-white p-3 rounded-xl shadow-sm border border-transparent hover:border-purple-200 transition-all"
    >
      <a
        href={synth.href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-shrink-0"
      >
        <img
          src={synth.image || "/placeholder.svg"}
          alt={formatSynthName(synth)}
          className="w-20 h-20 object-cover rounded-lg"
        />
      </a>
      <div className="flex-grow overflow-hidden">
        <p
          className="font-bold text-gray-800 truncate text-base"
          title={formatSynthName(synth)}
        >
          {formatSynthName(synth)}
        </p>
        <SynthPriceDisplay synth={synth} />
        <p className="text-sm text-gray-500 truncate">{synth.source}</p>
      </div>
      <button
        onClick={() => onRemove(synth.id)}
        className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-all opacity-100 lg:opacity-0 lg:group-hover:opacity-100"
        aria-label={`Remove ${formatSynthName(synth)} from comparison`}
      >
        <IoClose size={20} />
      </button>
    </motion.div>
  );
};

export default function ComparisonChart() {
  const { data: allSynths, isLoading: isLoadingSynths } = useGetSynths();
  const {
    compareSynthIds,
    toggleCompare,
    isLoading: isLoadingPrefs,
  } = useUserPreferences();

  const [activeGranularity, setActiveGranularity] =
    useState<Granularity>("day");

  const timeframeDurations: TimeframeDurations = {
    day: 8,
    week: 6,
    month: 6,
    year: 3,
  };

  const synthsToCompare = useMemo(() => {
    if (!allSynths || compareSynthIds.size === 0) return [];
    return allSynths.filter((synth) => compareSynthIds.has(synth.id));
  }, [allSynths, compareSynthIds]);

  const { chartData, chartOptions } = usePriceChart(synthsToCompare, {
    activeGranularity,
    durations: timeframeDurations,
  });

  if (isLoadingSynths || isLoadingPrefs) {
    return (
      <div className="flex justify-center items-center h-96">
        <Spinner label="Loading Comparison..." color="secondary" />
      </div>
    );
  }

  return (
    <Card className="w-full flex flex-col p-4 sm:p-6 flex-grow min-h-[600px] bg-white/80 shadow-lg overflow-hidden">
      <CardBody className="flex flex-col items-center w-full">
        <div className="flex flex-col-reverse lg:flex-row w-full gap-8 items-start justify-center">
          <div className="w-full lg:w-2/3 flex-shrink-0 min-h-[350px] md:min-h-[500px] flex flex-col">
            <div className="flex justify-between items-center mb-2 px-4">
              <h3 className="text-lg font-semibold text-[#7c1fa2]">
                Price History
              </h3>
              <div className="flex items-center gap-2">
                <GranularityButton
                  mode="day"
                  label="D"
                  activeGranularity={activeGranularity}
                  setGranularity={setActiveGranularity}
                />
                <GranularityButton
                  mode="week"
                  label="W"
                  activeGranularity={activeGranularity}
                  setGranularity={setActiveGranularity}
                />
                <GranularityButton
                  mode="month"
                  label="M"
                  activeGranularity={activeGranularity}
                  setGranularity={setActiveGranularity}
                />
                <GranularityButton
                  mode="year"
                  label="Y"
                  activeGranularity={activeGranularity}
                  setGranularity={setActiveGranularity}
                />
              </div>
            </div>
            <div className="relative w-full flex-grow">
              {synthsToCompare.length > 0 ? (
                <Line data={chartData} options={chartOptions as any} />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-500 bg-gray-50 rounded-xl p-4">
                  <p className="font-semibold text-lg">
                    Your comparison list is empty.
                  </p>
                  <p className="mt-2 text-sm text-center max-w-xs">
                    Add synths to your comparison list from the browse page to
                    see their price history here.
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="w-full lg:w-1/3 flex flex-col items-center lg:items-start">
            <h3 className="text-lg font-semibold mb-4 text-[#7c1fa2] text-center lg:text-left">
              Comparing ({synthsToCompare.length})
            </h3>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              <AnimatePresence>
                {synthsToCompare.map((synth) => (
                  <ComparisonItem
                    key={synth.id}
                    synth={synth}
                    onRemove={toggleCompare}
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
