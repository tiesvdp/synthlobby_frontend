import { FunctionComponent } from "react";

import SearchInput from "@/components/searchInput";
import FilterSelect from "@/components/filterSelect";
import PriceSlider from "@/components/priceSlider";

const FilterBar: FunctionComponent = () => {
  return (
    <section className="flex gap-10 w-full items-center justify-between">
      <div className="flex gap-6">
        <SearchInput />
        <FilterSelect />
      </div>
      <div className="flex flex-grow justify-end">
        <PriceSlider />
      </div>
    </section>
  );
};

export default FilterBar;
