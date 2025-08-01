import { FunctionComponent } from "react";
import { Synth } from "@/models/synths.ts";
import MoneyChip from "@/components/moneyChip.tsx";

interface ListboxCardProps {
  synth: Synth;
}

const ListboxCard: FunctionComponent<ListboxCardProps> = ({ synth }) => {
  return (
    <div className="relative p-4">
      <div className="relative z-10">
        <h3 className="text-lg font-semibold">{synth.name}</h3>
        <p className="text-md py-1">{synth.brand}</p>
        <MoneyChip price={synth.price} />
      </div>
    </div>
  );
};

export default ListboxCard;
