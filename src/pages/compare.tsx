import { Suspense } from "react";

import { subtitle, title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import FallBack from "@/components/fallBack.tsx";
import { motion } from "framer-motion";
import ComparisonChart from "@/components/compare/comparisonChart";

export default function ComparePage() {
  return (
    <DefaultLayout>
      <section className="mt-4 mb-0 scroll-pb-40">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className={`${title({ size: "md" })}`}>This,&nbsp;</span>{" "}
          <span className={title({ color: "violet" })}>or that?&nbsp;</span>
          <div className={subtitle({ class: "mt-4" })}>
            Compare all your favorite synths in one place.
          </div>
        </motion.div>
      </section>
      <section className="flex flex-col items-center justify-center gap-4">
        <section className="flex flex-col items-center justify-center gap-4 md:py-4 w-full">
          <div className="text-center justify-center w-full">
            <Suspense fallback={<FallBack />}>
              <ComparisonChart />
            </Suspense>
          </div>
        </section>
      </section>
    </DefaultLayout>
  );
}
