import { Suspense } from "react";

import { subtitle, title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import WishListList from "@/components/wishlist/wishListList.tsx";
import FallBack from "@/components/fallBack.tsx";

export default function WishlistPage() {
  return (
    <DefaultLayout>
      <section className="text-center">
        <span className={`${title()}`}>This,&nbsp;</span>{" "}
        <span className={title({ color: "violet" })}>or that?&nbsp;</span>
        <div className={subtitle({ class: "mt-4" })}>
          Compare all your favorite synths in one place.
        </div>
      </section>
      <section className="flex flex-col items-center justify-center gap-4 md:py-10">
        <section className="flex flex-col items-center justify-center gap-4 md:py-10 w-full">
          <div className="text-center justify-center w-full">
            <Suspense fallback={<FallBack />}>
              <WishListList />
            </Suspense>
          </div>
        </section>
      </section>
    </DefaultLayout>
  );
}
