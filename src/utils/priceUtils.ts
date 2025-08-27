import { PriceChangeResult, PricePoint } from "@/models/prices";
import type { Synth } from "@/models/synths.ts";
import { format, subDays } from "date-fns";

/**
 * Retrieves price history entries from the last X days.
 * @param prices - An array of price objects.
 * @param days - The number of days to look back.
 * @returns An array of price entries within the specified time frame.
 */
export function getRecentPriceHistory(
  prices: Synth["prices"],
  days: number = 5
): Synth["prices"] {
  if (!Array.isArray(prices) || prices.length === 0) {
    return [];
  }

  const startDate = subDays(new Date(), days);
  const formattedStartDate = format(startDate, "yyyy-MM-dd");

  return prices.filter((p) => p.date >= formattedStartDate);
}

/**
 * Calculates the most recent price change based on price history
 * from the last 5 days.
 * @param prices - An array of price objects, each with a date and a price.
 * @returns An object containing the current price, the previous unique price, and the percentage change.
 */
export function calculateRecentPriceChange(
  prices: Synth["prices"],
  days: number = 5
): PriceChangeResult {
  // 1. Get recent price history (last 5 days)
  const recentPrices = getRecentPriceHistory(prices, days);

  // 2. Validate input
  if (!Array.isArray(recentPrices) || recentPrices.length < 2) {
    return { currentPrice: null, previousPrice: null, percentChange: null };
  }

  // 3. Sort prices by date descending (most recent first)
  const sortedPrices = [...recentPrices].sort((a, b) =>
    b.date.localeCompare(a.date)
  );

  // 4. Find the current and previous valid prices
  const currentEntry = sortedPrices.find((p) => p.price !== null);
  if (!currentEntry) {
    return { currentPrice: null, previousPrice: null, percentChange: null };
  }
  const currentPrice = currentEntry.price;

  // 5. Find the first previous entry with a different, non-null price
  const previousEntry = sortedPrices.find(
    (p) =>
      p.date < currentEntry.date && p.price !== null && p.price !== currentPrice
  );
  const previousPrice = previousEntry?.price ?? null;

  let percentChange: number | null = null;
  if (previousPrice !== null && previousPrice !== 0 && currentPrice !== null) {
    percentChange = ((currentPrice - previousPrice) / previousPrice) * 100;
  }

  return { currentPrice, previousPrice, percentChange };
}

/**
 * Generates a synthetic price history for a given base price and number of days.
 * The function simulates price changes, including random fluctuations and occasional sales,
 * to create a realistic price history array.
 *
 * @param basePrice - The starting price to base the history on.
 * @param days - The number of days to generate price history for.
 * @returns An array of PricePoint objects, each containing a date and a price, sorted by date ascending.
 */
export const generatePriceHistory = (
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

export const formatPrice = (price: number | string | null) => {
  if (price === null || price === undefined) return "";
  const num = typeof price === "string" ? parseFloat(price) : price;
  if (isNaN(num)) return String(price);
  return "€" + num.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

/**
 * Checks if a synth has a recent price available within the last X days.
 * @param synth - The synth object.
 * @param days - The number of days to look back.
 * @returns boolean - True if a non-null price exists in the recent history.
 */
export const hasRecentPrice = (synth: Synth, days: number = 1): boolean => {
  if (!synth.prices || synth.prices.length === 0) {
    return false;
  }

  // Get prices from the last 'days' and check if any of them have a non-null price.
  const recentPrices = getRecentPriceHistory(synth.prices, days);
  return recentPrices.some((p) => p.price !== null);
};
