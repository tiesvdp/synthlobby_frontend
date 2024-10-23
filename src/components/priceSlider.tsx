import { FunctionComponent, useState } from "react";
import { Slider } from "@nextui-org/react";

const PriceSlider: FunctionComponent = () => {
  const [value, setValue] = useState<number | number[]>([100, 300]);

  const handleChange = (newValue: number | number[]) => {
    setValue(newValue);
  };

  return (
    <div className="flex flex-col gap-2 w-full h-full max-w-md items-start justify-center">
      <Slider
        className="max-w-md "
        formatOptions={{ style: "currency", currency: "USD" }}
        label="Select a budget"
        maxValue={1000}
        minValue={0}
        step={10}
        value={value}
        onChange={handleChange}
      />
      <p className="text-default-500 font-medium text-small">
        Selected budget:{" "}
        {Array.isArray(value) && value.map((b) => `$${b}`).join(" – ")}
      </p>
    </div>
  );
};

export default PriceSlider;