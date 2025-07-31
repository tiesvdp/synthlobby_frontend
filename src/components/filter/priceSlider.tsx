import { FunctionComponent } from "react";
import { cn, Slider } from "@heroui/react";

import { useFilter } from "@/context/filterContext.tsx";

const PriceSlider: FunctionComponent = () => {
  const { priceRange, setPriceRange } = useFilter();

  const handleChange = (newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setPriceRange(
        newValue.map((value) => (value === 3000 ? Infinity : value))
      );
    } else {
      setPriceRange(
        newValue === 3000
          ? [priceRange[0], Infinity]
          : [priceRange[0], newValue]
      );
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full h-full max-w-md items-start justify-center">
      <Slider
        aria-label="Price range"
        className="max-w-md"
        classNames={{
          base: "max-w-md gap-3",
          track: "border-s-secondary-100",
          filler: "bg-gradient-to-r from-[#FF1CF7] to-[#b249f8]",
        }}
        formatOptions={{ style: "currency", currency: "EUR" }}
        maxValue={3000}
        minValue={10}
        defaultValue={[10, 2000]}
        renderThumb={({ index, ...props }) => (
          <div
            {...props}
            className="group p-1 top-1/2 bg-background border-small border-default-200 dark:border-default-400/50 shadow-medium rounded-full cursor-grab data-[dragging=true]:cursor-grabbing"
          >
            <span
              className={cn(
                "transition-transform bg-gradient-to-br shadow-small rounded-full w-5 h-5 block group-data-[dragging=true]:scale-80",
                index === 0
                  ? "from-[#FF1CF7] to-[#FF8CF7]"
                  : "from-[#b249f8] to-[#d249f8]"
              )}
            />
          </div>
        )}
        size="sm"
        step={10}
        value={priceRange.map((value) => (value === Infinity ? 3000 : value))}
        onChange={handleChange}
      />
      <p className="text-default-500 font-medium text-small">
        Selected budget:{" "}
        {priceRange
          .map((b) => (b === Infinity ? "€3000+" : `€${b}`))
          .join(" – ")}
      </p>
    </div>
  );
};

export default PriceSlider;
