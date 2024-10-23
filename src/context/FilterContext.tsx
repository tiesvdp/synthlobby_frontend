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
}

const FilterContext = createContext<FilterContextProps | undefined>(undefined);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [search, setSearch, debouncedSearch] = useDebouncedState("");
  const [filterType, setFilterType] = useState("");
  const [priceRange, setPriceRange] = useState([50, 3000]);

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
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);

  if (!context) {
    throw new Error("useFilter must be used within a FilterProvider");
  }

  return context;
};
