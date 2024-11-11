import { createContext, useContext, ReactNode, useState } from "react";

import { useDebouncedState } from "@/hooks/useDebouncedState.ts";

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
};

const FilterContext = createContext<FilterContextProps>(defaultValue);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [search, setSearch, debouncedSearch] = useDebouncedState("");
  const [filterType, setFilterType] = useState("");
  const [priceRange, setPriceRange, debouncedPriceRange] = useDebouncedState([
    50, Infinity,
  ]);
  const [filterLikes, setFilterLikes] = useState(false);

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
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = (): FilterContextProps => {
  return useContext(FilterContext);
};
