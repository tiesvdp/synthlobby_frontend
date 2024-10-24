import React from "react";
import { Listbox, ListboxItem, Selection } from "@nextui-org/react";

import { useWishList } from "@/context/wishlistContext.tsx";
import ListboxCard from "@/components/wishlist/listboxCard.tsx";

export default function App() {
  const { wishListItems } = useWishList();
  const [selectedKeys, setSelectedKeys] = React.useState<Set<string>>(
    new Set(),
  );

  const handleSelectionChange = (keys: Selection) => {
    setSelectedKeys(new Set(keys as unknown as string[]));
  };

  const totalPrice = React.useMemo(() => {
    return wishListItems
      .filter((wish) => selectedKeys.has(wish.id))
      .reduce((acc, wish) => acc + Number(wish.prijs || 0), 0);
  }, [wishListItems, selectedKeys]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 auto-rows-fr my-5">
      <Listbox
        aria-label="Keyboard wishlist"
        disableAnimation={true}
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        shouldHighlightOnFocus={false}
        variant="flat"
        onSelectionChange={handleSelectionChange}
      >
        {wishListItems.map((wish) => (
          <ListboxItem
            key={wish.id}
            className="border border-gray-200 rounded-lg shadow-sm mt-2"
            shouldHighlightOnFocus={false}
          >
            <ListboxCard wish={wish} />
          </ListboxItem>
        ))}
      </Listbox>
      <div>
        <h1 className="text-small text-default-500">
          Total price: €{totalPrice}
        </h1>
      </div>
    </div>
  );
}
