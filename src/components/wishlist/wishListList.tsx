import { useMemo, useState } from "react";
import { Card, CardBody } from "@heroui/react";
import { Line } from "react-chartjs-2";
import { useSynths } from "@/context/synthContext.tsx";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  TooltipItem,
} from "chart.js";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
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

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

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

type Granularity = "day" | "week" | "month" | "year";

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
    className={`px-3 py-1 text-xs rounded-md transition-colors ${
      granularity === mode
        ? "bg-purple-700 text-white"
        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
    }`}
  >
    {label}
  </button>
);

export default function WishListList() {
  // --- DEVELOPMENT TOGGLE ---
  const USE_FAKE_DATA = false;

  const { synths, setSynths } = useSynths();
  const likedSynths = synths.filter((item) => item.liked);
  const [granularity, setGranularity] = useState<Granularity>("day");

  const { chartData, chartOptions } = useMemo(() => {
    let synthsWithPriceHistory;

    if (USE_FAKE_DATA) {
      synthsWithPriceHistory = likedSynths.map((synth) => ({
        ...synth,
        prices: generatePriceHistory(synth.price || 1000, 365 * 5),
      }));
    } else {
      synthsWithPriceHistory = likedSynths.map((synth) => ({
        ...synth,
        prices: (synth.prices || []).map((p) => ({
          ...p,
          date: new Date(p.date),
        })),
      }));
    }

    const today = new Date();
    const synthsWithFilteredHistory = synthsWithPriceHistory.map((synth) => {
      let filteredPrices: PricePoint[];
      switch (granularity) {
        case "day":
          filteredPrices = synth.prices.slice(-5);
          break;
        case "week":
          filteredPrices = synth.prices.slice(-35);
          break;
        case "month":
          const fiveMonthsAgo = startOfMonth(subMonths(today, 4));
          filteredPrices = synth.prices.filter((p) => p.date >= fiveMonthsAgo);
          break;
        case "year":
        default:
          filteredPrices = synth.prices;
          break;
      }
      return { ...synth, prices: filteredPrices };
    });

    const allDateObjects = [
      ...new Set(
        synthsWithFilteredHistory.flatMap((s) =>
          s.prices.map((p) => format(p.date, "yyyy-MM-dd"))
        )
      ),
    ]
      .sort()
      .map((dateStr) => new Date(dateStr));

    if (allDateObjects.length === 0) {
      return { chartData: { labels: [], datasets: [] }, chartOptions: {} };
    }

    const datasets = synthsWithFilteredHistory.map((synth, idx) => {
      const priceMap = new Map(
        synth.prices.map((p) => [format(p.date, "yyyy-MM-dd"), p.price])
      );
      const color = `hsl(${(idx * 360) / likedSynths.length}, 70%, 50%)`;
      return {
        label: `${synth.name} (${synth.source})`,
        data: allDateObjects.map(
          (date) => priceMap.get(format(date, "yyyy-MM-dd")) ?? null
        ),
        fill: false,
        borderColor: color,
        backgroundColor: color,
        tension: 0,
        pointRadius: granularity === "day" ? 4 : 0,
        pointBorderColor: "#fff",
        pointBorderWidth: 1,
        pointHitRadius: 10,
      };
    });

    const chartData = {
      labels: allDateObjects.map((d) => format(d, "dd/MM")),
      datasets,
    };

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: true, position: "top" as const },
        tooltip: {
          mode: "nearest" as const,
          intersect: false,
          callbacks: {
            label: function (context: TooltipItem<"line">) {
              return `${context.dataset.label}: €${context.parsed.y.toFixed(
                2
              )}`;
            },
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
              const currentDate = allDateObjects[index];
              if (!currentDate) return null;

              if (granularity === "day") {
                return format(currentDate, "d MMM");
              }

              let tickDates: Date[] = [];
              for (let i = 0; i < 5; i++) {
                if (granularity === "week")
                  tickDates.push(startOfWeek(subWeeks(today, i)));
                if (granularity === "month")
                  tickDates.push(startOfMonth(subMonths(today, i)));
                if (granularity === "year")
                  tickDates.push(startOfYear(subYears(today, i)));
              }
              const isTickDate = tickDates.some((tickDate) =>
                isSameDay(currentDate, tickDate)
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
          grid: { color: "#e9e9e9" },
          border: { dash: [4, 4] },
          ticks: {
            callback: (value: any) => `€${value}`,
            autoSkip: true,
            maxTicksLimit: 8,
          },
        },
      },
    };

    return { chartData, chartOptions };
  }, [likedSynths, granularity]);

  const totalPrice = useMemo(() => {
    return likedSynths.reduce(
      (acc, synth) => acc + Number(synth.price || 0),
      0
    );
  }, [likedSynths]);

  const handleRemove = (id: string) => {
    setSynths((prev) =>
      prev.map((s) => (s.id === id ? { ...s, liked: false } : s))
    );
  };

  return (
    <Card className="w-full flex flex-col py-4 flex-grow min-h-[600px] bg-white/80 shadow-lg overflow-hidden">
      <CardBody className="flex flex-col items-center w-full">
        <div className="flex flex-col-reverse md:flex-row w-full gap-8 items-stretch justify-center">
          <div className="w-full md:w-2/3 flex-shrink-0 min-h-[350px] md:min-h-[500px] flex flex-col">
            <div className="flex justify-end gap-2 mb-2 px-4">
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
            <div className="relative w-full flex-grow">
              {likedSynths.length > 0 ? (
                <Line data={chartData} options={chartOptions as any} />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  Add synths to your wishlist to see a price comparison.
                </div>
              )}
            </div>
          </div>
          <div className="w-full md:w-1/3 flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-4 text-[#7c1fa2] text-center md:text-left">
              Your Wishlist
            </h3>
            <ul className="w-full flex flex-col gap-3 overflow-hidden">
              <AnimatePresence>
                {likedSynths.map((synth) => (
                  <motion.li
                    key={synth.id}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 40 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center justify-between bg-[#f6edfa] rounded-lg px-3 py-2 shadow-sm"
                  >
                    <div>
                      <div className="truncate max-w-[270px] text-sm font-medium text-[#7c1fa2] -mb-1">
                        {synth.name}
                      </div>
                      <div>
                        <span
                          className={"text-sm font-medium text-default-600"}
                        >
                          {synth.source}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemove(synth.id)}
                      className="ml-2 text-[#7c1fa2] hover:text-pink-600 transition-colors"
                      aria-label={`Remove ${synth.name} from wishlist`}
                    >
                      <IoClose size={22} />
                    </button>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </div>
        </div>
        {likedSynths.length > 0 && (
          <p className="text-center font-medium text-2xl mt-10">
            Total price:{" "}
            <span className="font-bold text-[#7c1fa2]">€{totalPrice}</span>
          </p>
        )}
      </CardBody>
    </Card>
  );
}
