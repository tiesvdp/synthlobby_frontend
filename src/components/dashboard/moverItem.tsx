import { FunctionComponent } from "react";
import { Synth } from "@/models/synths";
import { formatPrice } from "@/utils/priceUtils";
import { formatSynthName } from "@/utils/nameUtils";

interface MoverItemProps {
  synth: Synth;
  change: number;
}

const MoverItem: FunctionComponent<MoverItemProps> = ({ synth, change }) => {
  const name = formatSynthName(synth);
  const isDrop = change < 0;

  return (
    <div className="flex items-center gap-3 py-2">
      <img
        src={synth.image || "/placeholder.svg"}
        alt={name}
        className="hidden sm:inline w-10 h-10 object-cover rounded-md"
      />
      <div className="overflow-hidden flex-grow">
        <p className="truncate font-semibold text-sm text-gray-800">{name}</p>
        <p className="text-xs text-gray-500">
          {synth.source}{" "}
          {synth.price !== undefined && (
            <span className="ml-1">{formatPrice(synth.price)}</span>
          )}
        </p>
      </div>
      <span
        className={`font-bold text-sm flex-shrink-0 ${
          isDrop ? "text-green-600" : "text-red-500"
        }`}
      >
        {isDrop ? "▼" : "▲"} {Math.abs(change).toFixed(1)}%
      </span>
    </div>
  );
};

export default MoverItem;
