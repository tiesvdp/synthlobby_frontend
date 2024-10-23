import { FunctionComponent } from "react";
import { cn, Slider } from "@nextui-org/react";
import { useFilter } from "@/context/FilterContext.tsx";

const PriceSlider: FunctionComponent = () => {
  const { priceRange, setPriceRange } = useFilter();

  const handleChange = (newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };

  return (
    <div className="flex flex-col gap-2 w-full h-full max-w-md items-start justify-center">
      <Slider
        className="max-w-md"
        classNames={{
          base: "max-w-md gap-3",
          track: "border-s-secondary-100",
          filler: "bg-gradient-to-r from-[#FF1CF7] to-[#b249f8]",
        }}
        minValue={50}
        renderThumb={({ index, ...props }) => (
          <div
            {...props}
            className="group p-1 top-1/2 bg-background border-small border-default-200 dark:border-default-400/50 shadow-medium rounded-full cursor-grab data-[dragging=true]:cursor-grabbing"
          >
            <span
              className={cn(
                "transition-transform bg-gradient-to-br shadow-small rounded-full w-5 h-5 block group-data-[dragging=true]:scale-80",
                index === 0 ? "from-[#FF1CF7] to-[#FF8CF7]" : "from-[#b249f8] to-[#d249f8]"
              )}
            />
          </div>
        )}
        size="sm"
        step={10}
        value={priceRange}
        onChange={handleChange}
        formatOptions={{ style: "currency", currency: "EUR" }}
        maxValue={3000}
      />
      <p className="text-default-500 font-medium text-small">
        Selected budget: {priceRange.map((b) => `€${b}`).join(" – ")}
      </p>
    </div>
  );
};

export default PriceSlider;