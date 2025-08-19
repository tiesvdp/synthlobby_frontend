import {
  useSuspenseQuery,
  UseSuspenseQueryResult,
} from "@tanstack/react-query";
import Fuse from "fuse.js";
import { v4 as uuidv4 } from "uuid";

import { Synth } from "@/models/synths.ts";

// Fetch all synths from remote API
const getSynths = async (): Promise<Synth[]> => {
  const response = await fetch("https://sb.tiesvdp.be/synths");
  if (!response.ok) throw new Error("Failed to fetch synths");
  const data = await response.json();
  return data.map((item: Synth) => ({
    ...item,
    id: item.id ?? uuidv4(),
  })) as Synth[];
};

// Fetch brands from remote API
const getBrands = async (search: string | undefined): Promise<string[]> => {
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));
  const response = await fetch("https://sb.tiesvdp.be/synths");
  if (!response.ok) throw new Error("Failed to fetch synths");
  const data = await response.json();
  const synths = data as Synth[];

  const brands = new Set<string>();

  synths.forEach((synth) => {
    const nameParts = synth.name.split(" ");
    const merkParts = synth.brand.split(" ");
    const firstWord = synth.source.toLowerCase().includes("bax")
      ? nameParts[0].toLowerCase()
      : merkParts[0].toLowerCase();
    const brandsArray = Array.from(brands).map((brand) => brand.toLowerCase());

    const existingBrand = brandsArray.find((brand) =>
      brand.includes(firstWord)
    );

    if (!existingBrand && !synth.name.toLowerCase().includes("b-stock")) {
      if (synth.source.toLowerCase().includes("bax")) {
        brands.add(nameParts.slice(0, 2).join(" ").trim().toLowerCase());
      } else if (synth.brand.toLowerCase() !== "geen merk gevonden") {
        brands.add(synth.brand.trim().toLowerCase());
      }
    }
  });

  const brandArray = Array.from(brands)
    .map((brand) => brand.charAt(0).toUpperCase() + brand.slice(1))
    .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

  if (!search) {
    return brandArray;
  }

  const fuse = new Fuse(brandArray, { includeScore: false, keys: ["brand"] });
  const result = fuse.search(search);
  const array = result.map((r) => r.item);

  return array;
};

// Fetch last scrape time from remote API
const getLastScrape = async (): Promise<string> => {
  const response = await fetch("https://sb.tiesvdp.be/logs/last-scrape");
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

export const useGetBrands = (
  search: string
): UseSuspenseQueryResult<string[]> => {
  return useSuspenseQuery({
    queryKey: ["brands", search],
    queryFn: () => getBrands(search),
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
