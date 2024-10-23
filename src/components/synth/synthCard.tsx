import { FunctionComponent } from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";

import ImageBackgroundRemover from "@/components/imageBackgroundRemove";

interface synthCardProps {
  name: string;
  price?: number;
  available: string;
  image?: string;
  source?: string;
}

const SynthCard: FunctionComponent<synthCardProps> = ({
  name,
  price,
  available,
  image,
  source,
}) => {
  return (
    <Card className="w-full flex flex-col py-4 flex-grow">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start flex-grow">
        <h4 className="font-bold text-large text-start flex-grow">{name}</h4>
        <p className="text-tiny uppercase font-bold flex-grow">
          {price ? `€${price}` : "geen prijs beschikbaar"}
        </p>
        <small className="text-default-500 flex-grow">{available}</small>
      </CardHeader>
      <CardBody className="overflow-visible py-2 flex-grow flex justify-between">
        {/* Sadly the backgroundremover is too slow. Cool idea though.
        {image && <ImageBackgroundRemover src={image} />} */}
        <Image
          alt="Card background"
          className="object-cover rounded-xl flex-grow"
          src={image}
          width="100%"
        />
        <p className="text-end mt-5 me-5 text-tiny uppercase font-bold flex-grow">
          {source}
        </p>
      </CardBody>
    </Card>
  );
};

export default SynthCard;
