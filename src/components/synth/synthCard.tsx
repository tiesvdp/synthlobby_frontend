import { FunctionComponent, memo, Suspense, useMemo, useState } from "react";
import { Card, CardHeader, CardBody, Image } from "@heroui/react";
import { Button } from "@heroui/button";
import { motion } from "framer-motion";
import { Line } from "react-chartjs-2";
import {
  subDays,
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
import { Synth } from "@/models/synths.ts";
import { TooltipItem } from "chart.js";

type PricePoint = {
  date: Date;
  price: number;
};

const generatePriceHistory = (
  basePrice: number,
  days: number
): PricePoint[] => {
  const history: PricePoint[] = [];
  let currentPrice = Math.round(basePrice / 10) * 10 - 1;
  const today = new Date();
  let i = days - 1;

  while (i >= 0) {
    const randomFactor = Math.random();
    let duration = Math.floor(Math.random() * 21) + 14;

    if (randomFactor > 0.95) {
      const change =
        (Math.floor(Math.random() * 5) + 2) *
        10 *
        (Math.random() > 0.5 ? 1 : -1);
      currentPrice = Math.round((currentPrice + change) / 10) * 10 - 1;
    } else if (randomFactor > 0.85) {
      const priceBeforeSale = currentPrice;
      const salePrice = Math.round((priceBeforeSale * 0.9) / 5) * 5 - 1;
      const saleDuration = Math.floor(Math.random() * 6) + 3;

      for (let j = 0; j < saleDuration && i >= 0; j++) {
        history.push({ date: subDays(today, i), price: salePrice });
        i--;
      }
      currentPrice = priceBeforeSale;
    } else {
      const change = (Math.floor(Math.random() * 3) - 1) * 5;
      currentPrice += change;
    }

    currentPrice = Math.max(Math.round(basePrice * 0.75), currentPrice);
    currentPrice = Math.min(Math.round(basePrice * 1.4), currentPrice);

    for (let j = 0; j < duration && i >= 0; j++) {
      history.push({ date: subDays(today, i), price: currentPrice });
      i--;
    }
  }

  return history.sort((a, b) => a.date.getTime() - b.date.getTime());
};

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
  // --- DEVELOPMENT TOGGLE ---
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

  const priceHistory: PricePoint[] = useMemo(() => {
    if (USE_FAKE_DATA) {
      return generatePriceHistory(synth.price || 1000, 365 * 5);
    }
    return (synth.prices || []).map((p) => ({
      ...p,
      date: new Date(p.date),
    }));
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
            callback: function (_: any, index: number) {
              const currentDate = filteredPriceHistory[index]?.date;
              if (!currentDate) return null;
              if (granularity === "day") return format(currentDate, "d MMM");

              let tickDates: Date[] = [];
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

  return (
    <Card
      className="w-full flex flex-col py-4 flex-grow min-h-[650px]"
      id={synth.id + synth.source}
    >
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h4 className="font-bold text-large text-start">{name}</h4>
        <p className="text-tiny uppercase font-bold">
          {synth.price ? `€${synth.price}` : "geen prijs beschikbaar"}
        </p>
        <small className="text-default-500">{synth.availability}</small>
      </CardHeader>
      <CardBody className="overflow-visible py-2 flex flex-col justify-between">
        <a
          href={synth.href}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full rounded-xl block cursor-pointer"
          tabIndex={0}
          aria-label={`Open ${name} on source site`}
        >
          <Suspense
            fallback={
              <div className="w-full rounded-xl">
                <div className="object-cover rounded-xl flex-grow w-full pb-[100%]" />
              </div>
            }
          >
            <motion.div
              animate={{ opacity: 1, scale: 1 }}
              className="w-full rounded-xl"
              initial={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                alt="Card background"
                className="object-cover rounded-xl"
                src={synth.image}
                width="100%"
              />
            </motion.div>
          </Suspense>
        </a>
        <div className="px-2 mt-4 flex flex-col flex-grow">
          <div className="flex justify-end gap-2 mb-2">
            <GranularityButton mode="day" label="D" />
            <GranularityButton mode="week" label="W" />
            <GranularityButton mode="month" label="M" />
            <GranularityButton mode="year" label="Y" />
          </div>
          <div className="relative h-48">
            <Line data={chartData} options={chartOptions as any} />
          </div>
        </div>
        <div className="flex justify-between items-center mt-4 px-2">
          <p className="text-start text-tiny uppercase font-bold">
            {synth.source}
          </p>
          <Button
            isIconOnly
            aria-label="Like"
            className="bg-transparent"
            disableRipple={true}
            onClick={handleClick}
          >
            <HeartIcon filled={liked} />
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default memo(SynthCard);
