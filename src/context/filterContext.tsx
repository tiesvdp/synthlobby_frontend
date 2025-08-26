import { createContext, useContext, ReactNode, useState } from "react";
import { useDebouncedState } from "@/hooks/useDebouncedState.ts";

export type Availability =
  | "all"
  | "in stock"
  | "available soon"
  | "sold out"
  | "unknown";

interface FilterContextProps {
  search: string;
  setSearch: (search: string) => void;
  debouncedSearch: string;
  filterType: string;
  setFilterType: (filterType: string) => void;
  priceRange: number[];
  setPriceRange: (priceRange: number[]) => void;
  debouncedPriceRange: number[];
  filterLikes: boolean;
  setFilterLikes: (filterLikes: boolean) => void;
  filterCompared: boolean;
  setFilterCompared: (filterCompared: boolean) => void;
  filterPriceChanges: boolean;
  setFilterPriceChanges: (filterPriceChanges: boolean) => void;
  filterAvailability: Availability;
  setFilterAvailability: (filterAvailability: Availability) => void;
}

const defaultValue: FilterContextProps = {
  search: "",
  setSearch: () => {},
  debouncedSearch: "",
  filterType: "",
  setFilterType: () => {},
  priceRange: [50, Infinity],
  setPriceRange: () => {},
  debouncedPriceRange: [50, Infinity],
  filterLikes: false,
  setFilterLikes: () => {},
  filterCompared: false,
  setFilterCompared: () => {},
  filterPriceChanges: false,
  setFilterPriceChanges: () => {},
  filterAvailability: "all",
  setFilterAvailability: () => {},
};

const FilterContext = createContext<FilterContextProps>(defaultValue);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [search, setSearch, debouncedSearch] = useDebouncedState("");
  const [filterType, setFilterType] = useState("");
  const [priceRange, setPriceRange, debouncedPriceRange] = useDebouncedState([
    10,
    Infinity,
  ]);
  const [filterLikes, setFilterLikes] = useState(false);
  const [filterCompared, setFilterCompared] = useState(false);
  const [filterPriceChanges, setFilterPriceChanges] = useState(false);
  const [filterAvailability, setFilterAvailability] =
    useState<Availability>("all");

  return (
    <FilterContext.Provider
      value={{
        search,
        setSearch,
        debouncedSearch,
        filterType,
        setFilterType,
        priceRange,
        setPriceRange,
        debouncedPriceRange,
        filterLikes,
        setFilterLikes,
        filterCompared,
        setFilterCompared,
        filterPriceChanges,
        setFilterPriceChanges,
        filterAvailability,
        setFilterAvailability,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = (): FilterContextProps => {
  return useContext(FilterContext);
};
