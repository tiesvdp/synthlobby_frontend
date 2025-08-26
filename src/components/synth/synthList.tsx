import {
  FunctionComponent,
  ReactNode,
  useMemo,
  useState,
  useEffect,
} from "react";
import { motion } from "framer-motion";
import { Synth } from "@/models/synths.ts";
import SynthCard from "@/components/synth/synthCard.tsx";
import { useFilter } from "@/context/filterContext.tsx";
import { usePagination } from "@/context/paginationContext.tsx";
import { useUserPreferences } from "@/context/userPreferencesContext";
import { calculateRecentPriceChange } from "@/utils/priceUtils";

interface SynthListProps {
  synths: Synth[];
}

const SynthList: FunctionComponent<SynthListProps> = ({ synths }) => {
  const {
    debouncedSearch,
    filterType,
    debouncedPriceRange,
    filterLikes,
    filterCompared,
    filterPriceChanges,
    filterAvailability,
  } = useFilter();
  const { currentPage, setCurrentPage, setTotalPages, totalPages } =
    usePagination();
  const { likedSynthIds, toggleLike, compareSynthIds, toggleCompare } =
    useUserPreferences();
  const itemsPerPage = 24;

  const filteredSynths = useMemo(() => {
    return synths
      .filter((synth) => {
        const price = Number(synth.price);
        if (isNaN(price)) return false;

        if (
          debouncedSearch &&
          !`${synth.brand} ${synth.name}`
            .toLowerCase()
            .includes(debouncedSearch.toLowerCase())
        ) {
          return false;
        }

        if (price < debouncedPriceRange[0] || price > debouncedPriceRange[1]) {
          return false;
        }

        if (filterLikes && !likedSynthIds.has(synth.id)) {
          return false;
        }

        if (filterCompared && !compareSynthIds.has(synth.id)) {
          return false;
        }

        if (
          filterAvailability !== "all" &&
          synth.availability.toLowerCase() !== filterAvailability
        ) {
          return false;
        }

        if (filterPriceChanges) {
          const { percentChange } = calculateRecentPriceChange(synth.prices);
          if (percentChange === null || percentChange === 0) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        const priceA = Number(a.price);
        const priceB = Number(b.price);
        if (filterType === "asc") return priceA - priceB;
        if (filterType === "des") return priceB - priceA;
        return 0;
      });
  }, [
    synths,
    debouncedSearch,
    debouncedPriceRange,
    filterLikes,
    filterCompared,
    filterPriceChanges,
    filterAvailability,
    filterType,
    likedSynthIds,
    compareSynthIds,
  ]);

  useEffect(() => {
    const total = Math.ceil(filteredSynths.length / itemsPerPage);
    setTotalPages(total);

    if (currentPage > total) {
      setCurrentPage(total || 1);
    }
  }, [filteredSynths.length, setTotalPages, currentPage, setCurrentPage]);

  const paginatedSynths = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredSynths.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredSynths, currentPage]);

  if (totalPages === 0 && synths.length > 0) {
    return (
      <div className="text-center py-10">
        <p>No synths match your current filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 auto-rows-fr my-5 w-full">
      {paginatedSynths.map((synth) => (
        <SynthCardWrapper key={synth.id} imageUrl={synth.image}>
          <SynthCard
            liked={likedSynthIds.has(synth.id)}
            isCompared={compareSynthIds.has(synth.id)}
            synth={synth}
            onToggleLike={toggleLike}
            onToggleCompare={toggleCompare}
          />
        </SynthCardWrapper>
      ))}
    </div>
  );
};

const SynthCardWrapper: FunctionComponent<{
  children: ReactNode;
  imageUrl: string;
}> = ({ children, imageUrl }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const finalImageUrl = imageUrl || "/placeholder.svg";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
      transition={{ duration: 0.5 }}
      className="flex flex-grow"
    >
      <img
        src={finalImageUrl}
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsLoaded(true)}
        className="hidden"
        alt=""
      />
      {isLoaded && children}
    </motion.div>
  );
};

export default SynthList;
