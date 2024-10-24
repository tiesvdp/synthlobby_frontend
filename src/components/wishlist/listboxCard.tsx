import { FunctionComponent } from "react";
import { Synth } from "@/models/synths.ts";
import MoneyChip from '@/components/moneyChip.tsx'

interface ListboxCardProps {
  wish: Synth;
}

const ListboxCard: FunctionComponent<ListboxCardProps> = ({ wish }) => {
  return (
    <div className="relative p-4">
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm opacity-20"
        style={{ backgroundImage: `url(${wish.afbeelding})` }}
      ></div>
      <div className="relative z-10">
        <h3 className="text-lg font-semibold">{wish.naam}</h3>
        <p className="text-sm text-gray-600">{wish.merk}</p>
        <MoneyChip prijs={wish.prijs} />
      </div>
    </div>
  );
};

export default ListboxCard;