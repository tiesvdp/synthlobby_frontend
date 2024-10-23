import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import FilterBar from "@/components/filterBar";

export default function SynthsPage() {
  return (
    <>
      <DefaultLayout>
        <section className="">
          <FilterBar />
        </section>

        <section className="flex flex-col items-center justify-center gap-4 md:py-10">
          <div className="inline-block max-w-lg text-center justify-center">
            <h1 className={title()}>Synths</h1>
          </div>
        </section>
      </DefaultLayout>
    </>
  );
}
