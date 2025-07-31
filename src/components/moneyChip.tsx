import { Chip } from "@heroui/react";
import { FunctionComponent } from "react";

const MoneyChip: FunctionComponent<{ price: number }> = ({ price }) => {
  return (
    <Chip
      classNames={{
        base: "bg-gradient-to-br from-[#FF1CF7] to-[#b249f8] border-small border-white/50 shadow-purple-500/30 min-h-min mt-2",
        content: "drop-shadow shadow-black text-white text-medium p-1 px-4",
      }}
      variant="shadow"
    >
      <span>€ {price}</span>
    </Chip>
  );
};

export default MoneyChip;
