import { FunctionComponent } from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { HeartIcon } from "@/components/synth/heartIcon.tsx";
import { Synth } from "@/models/synths.ts";
import { useWishList } from "@/context/wishlistContext.tsx";

interface SynthCardProps {
  synth: Synth;
}

const SynthCard: FunctionComponent<SynthCardProps> = ({ synth }) => {
  const { wishListItems, setWishListItems } = useWishList();
  const liked = wishListItems.some((item) => item.naam === synth.naam);

  const handleClick = () => {
    if (liked) {
      setWishListItems(wishListItems.filter((item) => item.naam !== synth.naam));
      console.log(`item removed wishlist: ${synth.naam}`);
    } else {
      setWishListItems([...wishListItems, synth]);
      console.log(`item added to wishlist: ${synth.naam}`);
    }
  };

  const name =
    synth.source.toLowerCase().includes("bax") ||
    synth.source.toLowerCase().includes("musicstore")
      ? synth.naam
      : `${synth.merk} ${synth.naam}`;

  return (
    <Card className="w-full flex flex-col py-4 flex-grow">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start flex-grow">
        <h4 className="font-bold text-large text-start flex-grow">{name}</h4>
        <p className="text-tiny uppercase font-bold flex-grow">
          {synth.prijs ? `€${synth.prijs}` : "geen prijs beschikbaar"}
        </p>
        <small className="text-default-500 flex-grow">{synth.beschikbaarheid}</small>
      </CardHeader>
      <CardBody className="overflow-visible py-2 flex-grow flex justify-between">
        <Image
          alt="Card background"
          className="object-cover rounded-xl flex-grow"
          src={synth.afbeelding}
          width="100%"
        />
        <div className="flex flex-column items-center">
          <Button
            isIconOnly
            aria-label="Like"
            className="bg-transparent"
            disableRipple={true}
            onClick={handleClick}
          >
            <HeartIcon filled={liked} />
          </Button>
          <p className="text-end me-5 text-tiny uppercase font-bold flex-grow">
            {synth.source}
          </p>
        </div>
      </CardBody>
    </Card>
  );
};

export default SynthCard;