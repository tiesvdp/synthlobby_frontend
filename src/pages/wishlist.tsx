import { subtitle, title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import {Suspense} from 'react'
import WishListList from "@/components/wishlist/wishListList.tsx";

export default function WishlistPage() {
  return (
    <DefaultLayout>
      <section className="text-center">
        <span className={`${title()}`}>This,&nbsp;</span>{" "}
        <span className={title({ color: "violet" })}>or that?&nbsp;</span>
        <div className={subtitle({ class: "mt-4" })}>
          Save your favorite items and compare them side by side.
        </div>
      </section>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <section className="flex flex-col items-center justify-center gap-4 md:py-10 w-full">
          <div className="text-center justify-center w-full">
            <Suspense
              fallback={
                <div className="grid grid-cols-3 gap-4 my-5">Fallback</div>
              }
            >
              <WishListList />
            </Suspense>
          </div>
        </section>
      </section>
    </DefaultLayout>
  );
}
