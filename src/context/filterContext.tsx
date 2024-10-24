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
};

const FilterContext = createContext<FilterContextProps>(defaultValue);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [search, setSearch, debouncedSearch] = useDebouncedState("");
  const [filterType, setFilterType] = useState("");
  const [priceRange, setPriceRange, debouncedPriceRange] = useDebouncedState([
    50, Infinity,
  ]);

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
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = (): FilterContextProps => {
  return useContext(FilterContext);
};
