import { createContext, useContext, useState, ReactNode } from "react";

import { Synth } from "@/models/synths.ts";

interface WishlistContextProps {
  wishListItems: Synth[];
  setWishListItems: (items: Synth[]) => void;
}

const WishListContext = createContext<WishlistContextProps | undefined>(
  undefined,
);

export const WishListProvider = ({ children }: { children: ReactNode }) => {
  const [wishListItems, setWishListItems] = useState([] as Synth[]);

  return (
    <WishListContext.Provider value={{ wishListItems, setWishListItems }}>
      {children}
    </WishListContext.Provider>
  );
};

export const useWishList = (): WishlistContextProps => {
  const context = useContext(WishListContext);

  if (!context) {
    throw new Error("useWishList must be used within a WishListProvider");
  }

  return context;
};
