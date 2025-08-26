import { FunctionComponent } from "react";
import { Button } from "@heroui/button";
import SearchInput from "@/components/filter/searchInput.tsx";
import FilterSelect from "@/components/filter/filterSelect.tsx";
import PriceSlider from "@/components/filter/priceSlider.tsx";
import FilterToggles from "@/components/filter/filterToggles.tsx";
import FilterAvailability from "./filterAvailability";

interface FilterBarProps {
  totalSynths: number;
}

const FilterBar: FunctionComponent<FilterBarProps> = ({ totalSynths }) => {
  return (
    <section className="flex flex-col gap-4 w-full lg:w-64 lg:sticky lg:top-20">
      <SearchInput />
      <PriceSlider />
      <FilterSelect />
      <FilterAvailability />
      <div className="flex items-center justify-between gap-4">
        <FilterToggles />
        <Button variant="bordered" className="pointer-events-none flex-grow">
          <span className="text-small">Synths: {totalSynths}</span>
        </Button>
      </div>
    </section>
  );
};

export default FilterBar;
