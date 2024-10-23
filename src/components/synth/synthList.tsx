import { FunctionComponent } from "react";
import SynthCard from "@/components/synth/synthCard.tsx";
import { useGetSynths } from "@/api/synths.ts";
import { Synth } from "@/models/synths.ts";
import { useFilter } from "@/context/FilterContext.tsx";

const SynthList: FunctionComponent = () => {
  const { data: synths, error } = useGetSynths();
  const { debouncedSearch, filterType, priceRange } = useFilter();

  if (error) {
    return <div>Error loading synths</div>;
  }

  const filteredSynths = synths
    .filter((synth: Synth) => {
      const name = `${synth.merk} ${synth.naam}`.toLowerCase();
      return name.includes(debouncedSearch.toLowerCase());
    })
    .filter((synth: Synth) => {
      return synth.prijs >= priceRange[0] && synth.prijs <= priceRange[1];
    })
    .sort((a: Synth, b: Synth) => {
      if (filterType === "asc") return a.prijs - b.prijs;
      if (filterType === "des") return b.prijs - a.prijs;
      return 0;
    });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 auto-rows-fr">
      {filteredSynths.slice(0, 12).map((synth: Synth) => (
        <SynthCard
          key={synth.naam}
          available={synth.beschikbaarheid}
          image={synth.afbeelding}
          name={
            synth.source.toLowerCase() === "bax"
              ? synth.naam
              : `${synth.merk} ${synth.naam}`
          }
          price={synth.prijs}
          source={synth.source}
        />
      ))}
    </div>
  );
};

export default SynthList;