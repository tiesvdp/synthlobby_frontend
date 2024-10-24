import { FunctionComponent } from "react";

import SearchInput from "@/components/filter/searchInput.tsx";
import FilterSelect from "@/components/filter/filterSelect.tsx";
import PriceSlider from "@/components/filter/priceSlider.tsx";
import FilterLikes from "@/components/filter/filterLikes.tsx";

const FilterBar: FunctionComponent = () => {
  return (
    <section className="flex flex-col gap-4 w-full items-center justify-between md:flex-row md:gap-10">
      <div className="flex flex-col gap-6 md:flex-row md:gap-6 w-full md:w-auto">
        <SearchInput />
        <div className="flex gap-6">
          <FilterSelect />
          <FilterLikes />
        </div>
      </div>
      <div className="flex flex-grow justify-end w-full md:w-auto mb-10 mt-3 md:mb-2">
        <PriceSlider />
      </div>
    </section>
  );
};

export default FilterBar;