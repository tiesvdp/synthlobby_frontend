import {
  useSuspenseQuery,
  UseSuspenseQueryResult,
} from "@tanstack/react-query";
import Fuse from "fuse.js";
import { Synth } from "@/models/synths.ts";

export const useGetSynths = (): UseSuspenseQueryResult<Synth[], Error> => {
  return useSuspenseQuery({
    queryKey: ["synths"],
    queryFn: getSynths,
  });
};

export const useGetBrands = (
  search: string,
): UseSuspenseQueryResult<string[], Error> => {
  return useSuspenseQuery({
    queryKey: ["brands", search],
    queryFn: () => getBrands(search),
  });
};

const getSynths = async (): Promise<Synth[]> => {
  // Suspense testing
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));

  const response = await fetch("/data/synthData.json");

  if (!response.ok) {
    throw new Error("Failed to fetch synths");
  }
  console.log(response);

  const data = await response.json();

  return data.synths as Synth[];
};

const getBrands = async (search: string): Promise<string[]> => {
  // Suspense testing
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));

  const response = await fetch("../data/synthData.json");

  if (!response.ok) {
    throw new Error("Failed to fetch brands");
  }

  const data = await response.json();
  const synths = data as Synth[];

  const brands = synths
    .map((synth) => synth.merk)
    .filter((value, index, self) => self.indexOf(value) === index);

  const fuse = new Fuse(brands, { includeScore: true });
  const result = fuse.search(search);

  return result.map((r) => r.item);
};
