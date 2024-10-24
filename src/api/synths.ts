import {
  useSuspenseQuery,
  UseSuspenseQueryResult,
} from "@tanstack/react-query";
import Fuse from "fuse.js";
import { v4 as uuidv4 } from "uuid";

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


  return data.synths.map((item: Synth) => ({
    ...item,
    id: uuidv4(),
  })) as Synth[];
};

const getBrands = async (search: string | undefined): Promise<string[]> => {
  // Suspense testing
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));

  const response = await fetch("/data/synthData.json");
  const data = await response.json();
  const synths = data.synths as Synth[];

  const brands = new Set<string>();

  // Enkel unieke merken toevoegen
  synths.forEach((synth) => {
    const nameParts = synth.naam.split(" ");
    const merkParts = synth.merk.split(" ");
    const firstWord = synth.source.toLowerCase().includes("bax")
      ? nameParts[0].toLowerCase()
      : merkParts[0].toLowerCase();
    const brandsArray = Array.from(brands).map((brand) => brand.toLowerCase());

    const existingBrand = brandsArray.find((brand) =>
      brand.includes(firstWord),
    );

    if (!existingBrand) {
      if (synth.source.toLowerCase().includes("bax")) {
        brands.add(nameParts.slice(0, 2).join(" ").trim().toLowerCase());
      } else if (synth.merk.toLowerCase() !== "geen merk gevonden") {
        brands.add(synth.merk.trim().toLowerCase());
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

  console.log(array);

  return array;
};
