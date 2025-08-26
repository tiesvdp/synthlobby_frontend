import { Suspense } from "react";
import DefaultLayout from "@/layouts/default";
import FilterBar from "@/components/filter/filterBar.tsx";
import SkeletonCard from "@/components/skeleton/skeletonCard.tsx";
import { FilterProvider } from "@/context/filterContext.tsx";
import SynthPagination from "@/components/synth/synthPagination.tsx";
import SynthList from "@/components/synth/synthList";
import { useGetSynths } from "@/api/synths";

export default function SynthsPage() {
  const { data: synths, isError } = useGetSynths();

  if (isError) {
    return (
      <DefaultLayout>
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-red-600">
            Failed to load synths
          </h2>
          <p className="text-gray-500">Please try refreshing the page.</p>
        </div>
      </DefaultLayout>
    );
  }

  const synthList = synths || [];

  return (
    <FilterProvider>
      <DefaultLayout>
        <div className="flex gap-8 flex-col lg:flex-row">
          <section className="lg:py-10 lg:sticky lg:top-16 lg:self-start lg:h-fit">
            <FilterBar totalSynths={synthList.length} />
          </section>

          <section className="flex items-center justify-center gap-4 md:py-10 w-full h-full">
            <div className="text-center justify-center w-full">
              <SynthPagination />
              <Suspense
                fallback={
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 auto-rows-fr my-5">
                    {Array.from({ length: 12 }).map((_, index) => (
                      <SkeletonCard key={index} />
                    ))}
                  </div>
                }
              >
                <SynthList synths={synthList} />
              </Suspense>
              <SynthPagination />
            </div>
          </section>
        </div>
      </DefaultLayout>
    </FilterProvider>
  );
}
