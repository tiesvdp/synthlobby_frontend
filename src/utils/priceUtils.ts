import { PriceChangeResult, PricePoint } from "@/models/prices";
import type { Synth } from "@/models/synths.ts";
import { subDays } from "date-fns";

/**
 * Calculates the most recent price change based on the last 5 price entries.
 * @param prices - An array of price objects, each with a date and a price.
 * @returns An object containing the current price, the previous unique price, and the percentage change.
 */
export function calculateRecentPriceChange(
  prices: Synth["prices"]
): PriceChangeResult {
  // 1. Validate input
  if (!Array.isArray(prices) || prices.length < 2) {
    return { currentPrice: null, previousPrice: null, percentChange: null };
  }

  // 2. Sort prices by date descending (most recent first)
  const sortedPrices = [...prices].sort((a, b) => b.date.localeCompare(a.date));

  // 3. Take the 5 most recent entries
  const recentEntries = sortedPrices.slice(0, 5);

  // 4. Check if there is more than one unique price in these recent entries
  const uniquePrices = new Set(recentEntries.map((p) => p.price));
  if (uniquePrices.size <= 1) {
    // No price change in the recent entries
    return {
      currentPrice: sortedPrices[0]?.price ?? null,
      previousPrice: null,
      percentChange: null,
    };
  }

  // 5. Find the current and previous unique prices
  const currentPrice = sortedPrices[0].price;
  const previousEntry = sortedPrices.find((p) => p.price !== currentPrice);
  const previousPrice = previousEntry?.price ?? null;

  let percentChange: number | null = null;
  if (previousPrice !== null && previousPrice !== 0) {
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

export const formatPrice = (price: number | string) => {
  if (!price) return "";
  const num = typeof price === "string" ? parseFloat(price) : price;
  if (isNaN(num)) return String(price);
  return "€" + num.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
