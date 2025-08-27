import { useMemo } from "react";
import { TooltipItem } from "chart.js";
import {
  format,
  subDays,
  subWeeks,
  subMonths,
  subYears,
  eachDayOfInterval,
} from "date-fns";
import { Synth } from "@/models/synths";
import { PriceChartOptions } from "@/models/pricechart";

export const usePriceChart = (synths: Synth[], options: PriceChartOptions) => {
  const { activeGranularity, durations } = options;

  return useMemo(() => {
    const synthsWithPriceHistory = synths.map((synth) => ({
      ...synth,
      prices: (synth.prices || [])
        .map((p) => ({ ...p, date: new Date(p.date) }))
        .sort((a, b) => a.date.getTime() - b.date.getTime()),
    }));

    const duration = durations[activeGranularity];
    const today = new Date();
    let startDate: Date;

    switch (activeGranularity) {
      case "week":
        startDate = subWeeks(today, duration);
        break;
      case "month":
        startDate = subMonths(today, duration);
        break;
      case "year":
        startDate = subYears(today, duration);
        break;
      case "day":
      default:
        startDate = subDays(today, duration - 1);
        break;
    }

    const allDateObjects = eachDayOfInterval({
      start: startDate,
      end: today,
    });

    if (synths.length === 0) {
      return { chartData: { labels: [], datasets: [] }, chartOptions: {} };
    }

    const datasets = synthsWithPriceHistory.map((synth, idx) => {
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
        pointRadius: activeGranularity === "day" ? 4 : 0,
        pointBorderColor: "#fff",
        pointBorderWidth: 1,
        pointHitRadius: 10,
        borderWidth: 2,
      };
    });

    let labelFormat: string;
    switch (activeGranularity) {
      case "year":
        labelFormat = "MMM yyyy";
        break;
      case "month":
        labelFormat = "MMM";
        break;
      case "week":
        labelFormat = "d MMM";
        break;
      case "day":
      default:
        labelFormat = "d";
        break;
    }

    const chartData = {
      labels: allDateObjects.map((d) => format(d, labelFormat)),
      datasets,
    };

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 300,
      },
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
            autoSkip: true,
            maxRotation: 0,
            maxTicksLimit: duration + 1,
          },
        },
        y: {
          grid: { color: "#e9e9e9" },
          border: { dash: [4, 4] },
          ticks: {
            callback: (value: any) => `€${value}`,
            autoSkip: true,
            maxTicksLimit: 4,
          },
        },
      },
    };

    return { chartData, chartOptions };
  }, [synths, activeGranularity, durations]);
};
