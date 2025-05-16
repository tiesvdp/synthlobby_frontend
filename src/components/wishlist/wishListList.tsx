import { useState, useMemo } from "react";
import {
  Card,
  CardBody,
  Listbox,
  ListboxItem,
  Selection,
  useDisclosure,
} from "@heroui/react";
import { Button } from "@heroui/button";

import ListboxCard from "@/components/wishlist/listboxCard.tsx";
import { useSynths } from "@/context/synthContext.tsx";
import ModalPopup from "@/components/wishlist/wishListModal.tsx";

export default function WishListList() {
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const { synths } = useSynths();
  const likedSynths = synths.filter((item) => item.liked);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = useState<"opaque" | "blur" | "transparent">(
    "blur",
  );

  const handleSelectionChange = (keys: Selection) => {
    setSelectedKeys(new Set(keys as unknown as string[]));
  };

  const filteredLikedSynths = likedSynths.filter((synth) =>
    selectedKeys.has(synth.id),
  );

  const totalPrice = useMemo(() => {
    return filteredLikedSynths.reduce(
      (acc, synth) => acc + Number(synth.prijs || 0),
      0,
    );
  }, [filteredLikedSynths, selectedKeys]);

  function handleClick() {
    setBackdrop("blur");
    onOpen();
  }

  return (
    <div className="grid grid-cols-2 gap-6 auto-rows-fr mt-0">
      <Listbox
        aria-label="Keyboard wishlist"
        className="w-full"
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        variant="flat"
        onSelectionChange={handleSelectionChange}
      >
        {likedSynths.map((synth) => (
          <ListboxItem
            key={synth.id}
            className="border border-gray-300 rounded-lg shadow-sm flex justify-center w-full relative mb-3"
            shouldHighlightOnFocus={false}
            textValue={synth.naam}
          >
            <div
              className="absolute inset-0 bg-cover bg-center filter blur-sm opacity-20"
              style={{ backgroundImage: `url(${synth.afbeelding})` }}
            />
            <ListboxCard synth={synth} />
          </ListboxItem>
        ))}
      </Listbox>
      <div>
        <Card>
          <CardBody>
            <p className="text-center font-medium text-2xl">
              Total price: €{totalPrice}
            </p>
            <Button
              className={`bg-gradient-to-b from-[#FF1CF7] to-[#b249f8] shadow-lg w-fit mx-auto mt-4`}
              radius="full"
              size="lg"
              variant="shadow"
              onClick={handleClick}
            >
              <span
                className={
                  "tracking-tight inline font-button text-2xl lg:text-3xl leading-9 text-white"
                }
              >
                Buy &apos;em all!
              </span>
            </Button>
          </CardBody>
        </Card>
      </div>
      <ModalPopup
        backdrop={backdrop}
        isOpen={isOpen}
        synths={filteredLikedSynths}
        onClose={onClose}
      />
    </div>
  );
}
