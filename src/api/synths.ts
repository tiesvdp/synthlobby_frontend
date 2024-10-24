import {
  useSuspenseQuery,
  UseSuspenseQueryResult,
} from "@tanstack/react-query";
import Fuse from "fuse.js";

import { Synth } from "@/models/synths.ts";

export const useGetSynths = (): UseSuspenseQueryResult<Synth[]> => {
  return useSuspenseQuery({
    queryKey: ["synths"],
    queryFn: getSynths,
  });
};

export const useGetBrands = (
  search: string,
): UseSuspenseQueryResult<string[]> => {
  return useSuspenseQuery({
    queryKey: ["brands", search],
    queryFn: () => getBrands(search),
  });
};

const getSynths = async (): Promise<Synth[]> => {
  // Suspense testing
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));

  const response = await fetch("/data/synthData.json");

  const data = await response.json();

  return data.synths as Synth[];
};

const getBrands = async (search: string): Promise<string[]> => {
  // Suspense testing
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));

  const response = await fetch("../data/synthData.json");

  const data = await response.json();
  const synths = data as Synth[];

  const brands = new Set<string>();

  synths.forEach((synth) => {
    if (synth.merk) {
      brands.add(synth.merk);
    }
  });
  const brandArray = Array.from(brands);

  const fuse = new Fuse(brandArray, { includeScore: true });
  const result = fuse.search(search);

  return result.map((r) => r.item);
};
