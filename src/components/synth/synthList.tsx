import { FunctionComponent, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import SynthCard from "@/components/synth/synthCard.tsx";
import { useGetSynths } from "@/api/synths.ts";
import { Synth } from "@/models/synths.ts";
import { useFilter } from "@/context/filterContext.tsx";
import { usePagination } from "@/context/paginationContext.tsx";

const SynthList: FunctionComponent = () => {
  const { data: synths } = useGetSynths();
  const { debouncedSearch, filterType, debouncedPriceRange } = useFilter();
  const { currentPage, setTotalPages } = usePagination();
  const itemsPerPage = 24;

  const filteredSynths = synths
    .filter((synth: Synth) => {
      const name = `${synth.merk} ${synth.naam}`.toLowerCase();

      return name.includes(debouncedSearch.toLowerCase());
    })
    .filter((synth: Synth) => {
      return (
        synth.prijs >= debouncedPriceRange[0] &&
        synth.prijs <= debouncedPriceRange[1]
      );
    })
    .sort((a: Synth, b: Synth) => {
      if (filterType === "asc") return a.prijs - b.prijs;
      if (filterType === "des") return b.prijs - a.prijs;

      return 0;
    });

  useEffect(() => {
    setTotalPages(Math.ceil(filteredSynths.length / itemsPerPage));
  }, [filteredSynths, setTotalPages]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSynths = filteredSynths.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 auto-rows-fr my-5">
      {paginatedSynths.map((synth: Synth) => (
        <SynthCard
          key={uuidv4()}
          available={synth.beschikbaarheid}
          image={synth.afbeelding}
          name={
            synth.source.toLowerCase().includes("bax") ||
            synth.source.toLowerCase().includes("musicstore")
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
