import { FunctionComponent, ReactNode, useEffect } from "react";
import { motion } from "framer-motion";

import SynthCard from "@/components/synth/synthCard.tsx";
import { useSynths } from "@/context/synthContext.tsx";
import { useFilter } from "@/context/filterContext.tsx";
import { usePagination } from "@/context/paginationContext.tsx";

const SynthList: FunctionComponent = () => {
  const { synths, setSynths } = useSynths();
  const { debouncedSearch, filterType, debouncedPriceRange, filterLikes } =
    useFilter();
  const { currentPage, setTotalPages } = usePagination();
  const itemsPerPage = 24;

  const handleToggleLike = (id: string) => {
    setSynths((prevSynths) =>
      prevSynths.map((synth) =>
        synth.id === id ? { ...synth, liked: !synth.liked } : synth,
      ),
    );
  };

  const filteredSynths = synths
    .filter((synth) => {
      const name = `${synth.merk} ${synth.naam}`.toLowerCase();

      return name.includes(debouncedSearch.toLowerCase());
    })
    .filter((synth) => {
      return (
        synth.prijs >= debouncedPriceRange[0] &&
        synth.prijs <= debouncedPriceRange[1]
      );
    })
    .filter((synth) => {
      return filterLikes ? synth.liked : true;
    })
    .sort((a, b) => {
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
      {paginatedSynths.map((synth) => (
        <SynthCardWrapper key={synth.id}>
          <SynthCard
            liked={synth.liked ?? false}
            synth={synth}
            onToggleLike={handleToggleLike}
          />
        </SynthCardWrapper>
      ))}
    </div>
  );
};

const SynthCardWrapper: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <motion.div
      className="flex flex-grow"
      exit={{ opacity: 0, y: -20 }}
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      viewport={{ amount: 0.3 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      {children}
    </motion.div>
  );
};

export default SynthList;
