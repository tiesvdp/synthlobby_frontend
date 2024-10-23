import { Suspense } from "react";
import DefaultLayout from "@/layouts/default";
import FilterBar from "@/components/filter/filterBar.tsx";
import SynthList from "@/components/synth/synthList.tsx";
import SkeletonCard from "@/components/synth/skeletonCard.tsx";
import { FilterProvider } from "@/context/FilterContext";

export default function SynthsPage() {
  return (
    <FilterProvider>
      <DefaultLayout>
        <section className="">
          <FilterBar />
        </section>

        <section className="flex flex-col items-center justify-center gap-4 md:py-10">
          <div className="text-center justify-center w-full">
            <Suspense
              fallback={
                <div className="grid grid-cols-3 gap-4">
                  {Array.from({ length: 12 }).map((_, index) => (
                    <SkeletonCard key={index} />
                  ))}
                </div>
              }
            >
              <SynthList />
            </Suspense>
          </div>
        </section>
      </DefaultLayout>
    </FilterProvider>
  );
}