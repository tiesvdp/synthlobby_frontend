import {
  useSuspenseQuery,
  UseSuspenseQueryResult,
} from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";

import { Synth } from "@/models/synths.ts";

// Fetch all synths from remote API
const getSynths = async (): Promise<Synth[]> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/synths`);
  if (!response.ok) throw new Error("Failed to fetch synths");
  const data = await response.json();

  return data
    .map((item: Synth) => ({
      ...item,
      id: item.id ?? uuidv4(),
    }))
    .sort((a: Synth, b: Synth) => a.id.localeCompare(b.id)) as Synth[];
};

// Fetch last scrape time from remote API
const getLastScrape = async (): Promise<string> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/logs/last-scrape`
  );
  if (!response.ok) throw new Error("Failed to fetch last scrape");
  const data = await response.json();
  return data.lastScrape as string;
};

export const useGetSynths = (): UseSuspenseQueryResult<Synth[]> => {
  return useSuspenseQuery({
    queryKey: ["synths"],
    queryFn: getSynths,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 10,
  });
};

export const useGetLastScrape = (): UseSuspenseQueryResult<string> => {
  return useSuspenseQuery({
    queryKey: ["lastScrape"],
    queryFn: getLastScrape,
    staleTime: 1000 * 60 * 5,
  });
};
