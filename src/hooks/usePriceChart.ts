import { useMemo } from "react";
import { TooltipItem } from "chart.js";
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
import { Synth } from "@/models/synths";
import { PricePoint } from "@/models/prices";

export type Granularity = "day" | "week" | "month" | "year";

export const usePriceChart = (synths: Synth[], granularity: Granularity) => {
  return useMemo(() => {
    const synthsWithPriceHistory = synths.map((synth) => ({
      ...synth,
      prices: (synth.prices || [])
        .map((p) => ({ ...p, date: new Date(p.date) }))
        .sort((a, b) => a.date.getTime() - b.date.getTime()),
    }));

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

      const color =
        synths.length === 1
          ? "rgb(137, 53, 171)"
          : `hsl(${(idx * 360) / synths.length}, 70%, 50%)`;

      const displayName =
        synth.source.toLowerCase().includes("bax") ||
        synth.source.toLowerCase().includes("musicstore")
          ? synth.name
          : `${synth.brand} ${synth.name}`;

      return {
        label: `${displayName} (${synth.source})`,
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
        borderWidth: 2,
      };
    });

    const chartData = {
      labels: allDateObjects.map((d) => format(d, "dd/MM/yy")),
      datasets,
    };

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: synths.length > 1, position: "top" as const },
        tooltip: {
          displayColors: false,
          padding: 10,
          mode: synths.length > 1 ? ("nearest" as const) : ("index" as const),
          intersect: false,
          callbacks: {
            title: (context: TooltipItem<"line">[]) => {
              if (!context[0]) return "";
              const date = allDateObjects[context[0].dataIndex];
              return date ? format(date, "PPP") : "";
            },
            label: (context: TooltipItem<"line">) => {
              if (synths.length > 1) {
                return `${context.dataset.label}: €${context.parsed.y.toFixed(
                  2
                )}`;
              }
              return `€${context.parsed.y.toFixed(2)}`;
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
            maxTicksLimit: 5,
          },
        },
      },
    };

    return { chartData, chartOptions };
  }, [synths, granularity]);
};
