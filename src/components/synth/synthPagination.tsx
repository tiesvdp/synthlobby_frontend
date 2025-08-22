import { FunctionComponent } from "react";
import { Button } from "@heroui/button";

import { usePagination } from "@/context/paginationContext.tsx";

const SynthPagination: FunctionComponent = () => {
  const { currentPage, totalPages, setCurrentPage } = usePagination();

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (totalPages === 0) {
    return null;
  }

  return (
    <div className="flex justify-between gap-4">
      <Button
        className="flex-grow max-w-40"
        disabled={currentPage === 1}
        startContent={<i className="fa-solid fa-chevron-left" />}
        variant="ghost"
        onPress={handlePrevious}
      >
        Previous
      </Button>
      <span className="flex-grow text-default-500">
        {currentPage} of {totalPages}
      </span>
      <Button
        className="flex-grow max-w-40"
        disabled={currentPage === totalPages}
        endContent={<i className="fa-solid fa-chevron-right" />}
        variant="ghost"
        onPress={handleNext}
      >
        Next
      </Button>
    </div>
  );
};

export default SynthPagination;
