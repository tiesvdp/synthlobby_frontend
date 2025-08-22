import {
  type FunctionComponent,
  memo,
  Suspense,
  useMemo,
  useState,
} from "react";
import { Card } from "@heroui/react";
import { Button } from "@heroui/button";
import { motion } from "framer-motion";
import { Line } from "react-chartjs-2";
import {
  format,
  subWeeks,
  startOfWeek,
  isSameDay,
  subMonths,
  startOfMonth,
  subYears,
  startOfYear,
} from "date-fns";
import { HeartIcon } from "@/components/heartIcon.tsx";
import type { Synth } from "@/models/synths.ts";
import type { TooltipItem } from "chart.js";
import {
  calculateRecentPriceChange,
  generatePriceHistory,
} from "@/utils/priceUtils.ts";
import type { PricePoint } from "@/models/prices";

interface SynthCardProps {
  synth: Synth;
  liked: boolean;
  onToggleLike: (id: string) => void;
}

type Granularity = "day" | "week" | "month" | "year";

const SynthCard: FunctionComponent<SynthCardProps> = ({
  synth,
  liked,
  onToggleLike,
}) => {
  const USE_FAKE_DATA = false;

  const [granularity, setGranularity] = useState<Granularity>("day");

  const handleClick = () => {
    onToggleLike(synth.id);
  };

  const name =
    synth.source.toLowerCase().includes("bax") ||
    synth.source.toLowerCase().includes("musicstore")
      ? synth.name
      : `${synth.brand} ${synth.name}`;

  const { currentPrice, previousPrice, percentChange } = useMemo(
    () => calculateRecentPriceChange(synth.prices),
    [synth.prices]
  );

  const priceHistory: PricePoint[] = useMemo(() => {
    let arr: PricePoint[];
    if (USE_FAKE_DATA) {
      arr = generatePriceHistory(synth.price || 1000, 365 * 5);
    } else {
      arr = (synth.prices || []).map((p) => ({
        ...p,
        date: new Date(p.date),
      }));
    }
    return arr.sort((a, b) => a.date.getTime() - b.date.getTime());
  }, [synth.price, synth.prices]);

  const { chartData, chartOptions } = useMemo(() => {
    const today = new Date();
    let filteredPriceHistory: PricePoint[];

    switch (granularity) {
      case "day":
        filteredPriceHistory = priceHistory.slice(-5);
        break;
      case "week":
        filteredPriceHistory = priceHistory.slice(-35);
        break;
      case "month":
        const fiveMonthsAgo = startOfMonth(subMonths(today, 4));
        filteredPriceHistory = priceHistory.filter(
          (p) => p.date >= fiveMonthsAgo
        );
        break;
      case "year":
      default:
        filteredPriceHistory = priceHistory;
        break;
    }

    if (!filteredPriceHistory || filteredPriceHistory.length === 0) {
      return { chartData: { labels: [], datasets: [] }, chartOptions: {} };
    }

    const chartData = {
      labels: filteredPriceHistory.map((p) => format(p.date, "yyyy-MM-dd")),
      datasets: [
        {
          data: filteredPriceHistory.map((p) => p.price),
          tension: 0,
          borderColor: "rgb(137, 53, 171)",
          borderWidth: 2,
          pointBackgroundColor: "rgb(137, 53, 171)",
          pointBorderColor: "#fff",
          pointBorderWidth: 0,
          pointRadius: () => (granularity === "day" ? 4 : 0),
        },
      ],
    };

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          displayColors: false,
          padding: 10,
          mode: "index" as const,
          intersect: false,
          callbacks: {
            title: (context: TooltipItem<"line">[]) =>
              format(filteredPriceHistory[context[0].dataIndex].date, "PPP"),
            label: (context: TooltipItem<"line">) => `€${context.parsed.y}`,
          },
        },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: {
            autoSkip: false,
            maxRotation: 0,
            callback: (_: any, index: number) => {
              const currentDate = filteredPriceHistory[index]?.date;
              if (!currentDate) return null;
              if (granularity === "day") return format(currentDate, "d MMM");

              const tickDates: Date[] = [];
              for (let i = 0; i < 5; i++) {
                if (granularity === "week")
                  tickDates.push(startOfWeek(subWeeks(today, i)));
                if (granularity === "month")
                  tickDates.push(startOfMonth(subMonths(today, i)));
                if (granularity === "year")
                  tickDates.push(startOfYear(subYears(today, i)));
              }
              const isTickDate = tickDates.some((td) =>
                isSameDay(currentDate, td)
              );

              if (isTickDate) {
                if (granularity === "week") return format(currentDate, "dd/MM");
                if (granularity === "month")
                  return format(currentDate, "MMM yy");
                if (granularity === "year") return format(currentDate, "yyyy");
              }
              return null;
            },
          },
        },
        y: {
          ticks: {
            autoSkip: true,
            maxTicksLimit: 5,
            callback: (value: any) => `€${value}`,
          },
        },
      },
    };
    return { chartData, chartOptions };
  }, [priceHistory, granularity]);

  const GranularityButton = ({
    mode,
    label,
  }: {
    mode: Granularity;
    label: string;
  }) => (
    <button
      onClick={() => setGranularity(mode)}
      className={`px-3 py-1 text-xs rounded-md transition-colors ${
        granularity === mode
          ? "bg-purple-700 text-white"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      }`}
    >
      {label}
    </button>
  );

  const getAvailabilityStyle = (availability: string) => {
    switch (availability.toLowerCase()) {
      case "in stock":
        return "bg-green-100 text-green-700 border border-green-200";
      case "sold out":
        return "bg-red-100 text-red-700 border border-red-200";
      case "available soon":
        return "bg-orange-100 text-orange-700 border border-orange-200";
      default:
        return "bg-gray-100 text-gray-600 border border-gray-200";
    }
  };

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
          <div className="flex justify-between w-full flex-col sm:flex-row">
            <div>
              <h4 className="font-bold text-large text-start">{name}</h4>
            </div>
            <div className="w-fit">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${getAvailabilityStyle(
                  synth.availability
                )}`}
              >
                {synth.availability}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-2 sm:mt-0">
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
              <p className="text-tiny uppercase font-bold">
                geen prijs beschikbaar
              </p>
            )}
            {percentChange !== null && (
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

        <div className="mt-4 flex flex-col flex-grow">
          <div className="flex justify-end gap-2 mb-2">
            <GranularityButton mode="day" label="D" />
            <GranularityButton mode="week" label="W" />
            <GranularityButton mode="month" label="M" />
            <GranularityButton mode="year" label="Y" />
          </div>
          <div className="relative flex-grow min-h-[150px]">
            <Line data={chartData} options={chartOptions as any} />
          </div>
        </div>

        <div className="flex justify-between items-center mt-4 pt-2 border-t">
          <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-md border border-purple-200">
            <p className="text-start text-xs font-bold uppercase tracking-wide">
              {synth.source}
            </p>
          </div>
          <Button
            isIconOnly
            aria-label="Like"
            className="bg-transparent"
            disableRipple={true}
            onPress={handleClick}
          >
            <HeartIcon filled={liked} />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default memo(SynthCard);
