// synths.tsx
import { Suspense, lazy } from "react";

import DefaultLayout from "@/layouts/default";
import FilterBar from "@/components/filter/filterBar.tsx";
import SkeletonCard from "@/components/skeleton/skeletonCard.tsx";
import { FilterProvider } from "@/context/filterContext.tsx";
import { PaginationProvider } from "@/context/paginationContext.tsx";
import SynthPagination from "@/components/synth/synthPagination.tsx";

// Fake delay om de Suspense fallback te tonen
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const lazyWithDelay = (importFn: () => Promise<any>, ms: number) =>
  lazy(() => Promise.all([importFn(), delay(ms)]).then(([module]) => module));

// Gotta show off the skeletons, hehe
const SynthList = lazyWithDelay(
  () => import("@/components/synth/synthList.tsx"),
  500,
);

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
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 auto-rows-fr my-5">
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
