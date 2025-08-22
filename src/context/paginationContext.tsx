import { createContext, useContext, useState, ReactNode } from "react";

interface PaginationContextProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  setTotalPages: (total: number) => void;
}

const PaginationContext = createContext<PaginationContextProps | undefined>(
  undefined
);

export const PaginationProvider = ({ children }: { children: ReactNode }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  return (
    <PaginationContext.Provider
      value={{ currentPage, totalPages, setCurrentPage, setTotalPages }}
    >
      {children}
    </PaginationContext.Provider>
  );
};

export const usePagination = (): PaginationContextProps => {
  const context = useContext(PaginationContext);

  if (!context) {
    throw new Error("usePagination must be used within a PaginationProvider");
  }

  return context;
};
