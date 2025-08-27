export type Granularity = "day" | "week" | "month" | "year";

export interface TimeframeDurations {
  day: number;
  week: number;
  month: number;
  year: number;
}

export interface PriceChartOptions {
  activeGranularity: Granularity;
  durations: TimeframeDurations;
}
