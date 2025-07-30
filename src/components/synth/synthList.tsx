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
import { useSynths } from "@/context/synthContext.tsx";
import { useFilter } from "@/context/filterContext.tsx";
import { usePagination } from "@/context/paginationContext.tsx";

const SynthList: FunctionComponent = () => {
  const { synths, setSynths } = useSynths();
  const { debouncedSearch, filterType, debouncedPriceRange, filterLikes } =
    useFilter();
  const { currentPage, setCurrentPage, setTotalPages } = usePagination();
  const itemsPerPage = 24;

  interface HandleToggleLike {
    (id: string): void;
  }

  const handleToggleLike: HandleToggleLike = (id) =>
    setSynths((prev: Synth[]) =>
      prev.map((s: Synth) => (s.id === id ? { ...s, liked: !s.liked } : s))
    );

  // Filtering logic
  const filteredSynths = useMemo(() => {
    return synths
      .filter(({ brand, name }) =>
        `${brand} ${name}`.toLowerCase().includes(debouncedSearch.toLowerCase())
      )
      .filter(
        ({ price }) =>
          price >= debouncedPriceRange[0] && price <= debouncedPriceRange[1]
      )
      .filter(({ liked }) => (filterLikes ? liked : true))
      .sort(
        (a, b) =>
          ({ asc: a.price - b.price, des: b.price - a.price }[filterType] || 0)
      );
  }, [synths, debouncedSearch, debouncedPriceRange, filterLikes, filterType]);

  // Update pagination and handle page overflow
  useEffect(() => {
    const total = Math.ceil(filteredSynths.length / itemsPerPage);
    setTotalPages(total);

    // Adjust current page if it's out of bounds
    if (currentPage > total) {
      setCurrentPage(total || 1); // If no results, reset to page 1
    }
  }, [filteredSynths.length, setTotalPages, currentPage, setCurrentPage]);

  // Handle pagination dynamically
  const paginatedSynths = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredSynths.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredSynths, currentPage]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 auto-rows-fr my-5">
      {paginatedSynths.map((synth) => (
        <SynthCardWrapper key={synth.id} imageUrl={synth.image}>
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

// Image loader wrapper (optimized)
const SynthCardWrapper: FunctionComponent<{
  children: ReactNode;
  imageUrl: string;
}> = ({ children, imageUrl }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
      transition={{ duration: 0.5 }}
      className="flex flex-grow"
    >
      <img
        src={imageUrl}
        onLoad={() => setIsLoaded(true)}
        className="hidden"
        alt=""
      />
      {isLoaded && children}
    </motion.div>
  );
};

export default SynthList;
