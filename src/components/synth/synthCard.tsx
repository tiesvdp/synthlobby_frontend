import { FunctionComponent, memo, Suspense } from "react";
import { Card, CardHeader, CardBody, Image } from "@heroui/react";
import { Button } from "@heroui/button";
import { motion } from "framer-motion";

import { HeartIcon } from "@/components/heartIcon.tsx";
import { Synth } from "@/models/synths.ts";

interface SynthCardProps {
  synth: Synth;
  liked: boolean;
  onToggleLike: (id: string) => void;
}

const SynthCard: FunctionComponent<SynthCardProps> = ({synth,liked,onToggleLike}) => {
  const handleClick = () => {
    onToggleLike(synth.id);
  };

  const name =
    synth.source.toLowerCase().includes("bax") ||
    synth.source.toLowerCase().includes("musicstore")
      ? synth.naam
      : `${synth.merk} ${synth.naam}`;

  // @ts-ignore
  return (
    <Card className="w-full flex flex-col py-4 flex-grow min-h-[600px]">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start flex-grow">
        <h4 className="font-bold text-large text-start flex-grow">{name}</h4>
        <p className="text-tiny uppercase font-bold flex-grow">
          {synth.prijs ? `€${synth.prijs}` : "geen prijs beschikbaar"}
        </p>
        <small className="text-default-500 flex-grow">
          {synth.beschikbaarheid}
        </small>
      </CardHeader>
      <CardBody className="overflow-visible py-2 flex-grow flex justify-between">
        <Suspense
          fallback={
            <div className="w-full rounded-xl">
              <div className="object-cover rounded-xl flex-grow w-full pb-[100%]" />
            </div>
          }
        >
          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            className="w-full rounded-xl"
            initial={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              alt="Card background"
              className="object-cover rounded-xl flex-grow"
              src={synth.afbeelding}
              width="100%"
            />
          </motion.div>
        </Suspense>
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

export default memo(SynthCard);
