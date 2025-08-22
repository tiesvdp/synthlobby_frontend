import { FunctionComponent } from "react";

import SearchInput from "@/components/filter/searchInput.tsx";
import FilterSelect from "@/components/filter/filterSelect.tsx";
import PriceSlider from "@/components/filter/priceSlider.tsx";
import FilterLikes from "@/components/filter/filterLikes.tsx";
import { Button } from "@heroui/button";

interface FilterBarProps {
  totalSynths: number;
}

const FilterBar: FunctionComponent<FilterBarProps> = ({ totalSynths }) => {
  return (
    <section className="flex flex-col gap-4 w-full items-center justify-between lg:gap-10">
      <div className="flex flex-col gap-6 lg:gap-6 w-full lg:w-auto">
        <div className="block md:flex lg:block gap-10">
          <SearchInput />
          <div className="flex flex-grow justify-end w-full lg:w-auto lg:mb-2 mt-3">
            <PriceSlider />
          </div>
        </div>
        <div className="flex flex-col xs:flex-row lg:flex-col gap-6 mb-6">
          <FilterSelect />
          <FilterLikes />
          <div className="w-full md:w-auto lg:w-full">
            <Button variant="bordered" className="pointer-events-none w-full">
              <span className="text-small">Total synths: {totalSynths}</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FilterBar;
