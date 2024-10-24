import { Suspense } from "react";

import DefaultLayout from "@/layouts/default";
import FilterBar from "@/components/filter/filterBar.tsx";
import SynthList from "@/components/synth/synthList.tsx";
import SkeletonCard from "@/components/skeleton/skeletonCard.tsx";
import { FilterProvider } from "@/context/filterContext.tsx";
import { PaginationProvider } from "@/context/paginationContext.tsx";
import SynthPagination from "@/components/synth/synthPagination.tsx";

export default function SynthsPage() {
  return (
    <FilterProvider>
      <PaginationProvider>
        <DefaultLayout>
          <section className="">
            <FilterBar />
          </section>

          <section className="flex flex-col items-center justify-center gap-4 md:py-10">
            <div className="text-center justify-center w-full">
              <SynthPagination />
              <Suspense
                fallback={
                  <div className="grid grid-cols-3 gap-4 my-5">
                    {Array.from({ length: 12 }).map((_, index) => (
                      <SkeletonCard key={index} />
                    ))}
                  </div>
                }
              >
                <SynthList />
              </Suspense>
              <SynthPagination />
            </div>
          </section>
        </DefaultLayout>
      </PaginationProvider>
    </FilterProvider>
  );
}
