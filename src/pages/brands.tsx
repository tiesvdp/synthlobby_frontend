import { Suspense } from "react";

import DefaultLayout from "@/layouts/default";
import BrandList from "@/components/brand/brandList.tsx";
import {subtitle, title} from '@/components/primitives.ts'

export default function BrandsPage() {
  return (
    <DefaultLayout>
      <section className="text-center">
        <span className={title({color: 'violet'})}>Thank you,&nbsp;</span>
        <span className={`${title()}`}>partner.&nbsp;</span>{' '}
        <div className={subtitle({class: 'mt-4'})}>
          Thanks to these brands, we are able to provide you with the best deals.
        </div>
      </section>
      <section className="flex flex-col items-center justify-center gap-4 md:py-10">
        <div className="text-center justify-center w-full">
          <Suspense
            fallback={
              <div className="grid grid-cols-3 gap-4 my-5">Fallback</div>
            }
          >
            <BrandList />
          </Suspense>
        </div>
      </section>
    </DefaultLayout>
  );
}
