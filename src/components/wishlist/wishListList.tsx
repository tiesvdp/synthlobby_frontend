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
import { Line } from "react-chartjs-2";

import ListboxCard from "@/components/wishlist/listboxCard.tsx";
import { useSynths } from "@/context/synthContext.tsx";
import ModalPopup from "@/components/wishlist/wishListModal.tsx";
import { TooltipItem } from "chart.js";

export default function WishListList() {
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const { synths } = useSynths();
  const likedSynths = synths.filter((item) => item.liked);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = useState<"opaque" | "blur" | "transparent">(
    "blur"
  );

  const handleSelectionChange = (keys: Selection) => {
    setSelectedKeys(new Set(keys as unknown as string[]));
  };

  const filteredLikedSynths = likedSynths.filter((synth) =>
    selectedKeys.has(synth.id)
  );

  const totalPrice = useMemo(() => {
    return filteredLikedSynths.reduce(
      (acc, synth) => acc + Number(synth.price || 0),
      0
    );
  }, [filteredLikedSynths, selectedKeys]);

  function handleClick() {
    setBackdrop("blur");
    onOpen();
  }

  // Gather all unique dates (max 20, sorted ascending)
  const allDates = Array.from(
    new Set(
      likedSynths.flatMap((synth) => synth.prices?.map((p) => p.date) ?? [])
    )
  )
    .sort()
    .slice(-20);

  // Prepare datasets for each liked synth
  const datasets = likedSynths.map((synth, idx) => {
    // Map prices to the correct date order, fill with null if missing
    const priceMap = Object.fromEntries(
      (synth.prices ?? []).map((p) => [p.date, p.price])
    );
    return {
      label: synth.name + " (" + synth.source + ")",
      data: allDates.map((date) =>
        priceMap[date] !== undefined ? priceMap[date] : null
      ),
      fill: false,
      borderColor: `hsl(${(idx * 60) % 360}, 80%, 60%)`,
      backgroundColor: `hsl(${(idx * 60) % 360}, 80%, 60%)`,
      tension: 0.3,
      pointRadius: 5,
    };
  });

  // Find min/max for Y axis
  const allPrices = likedSynths.flatMap((synth) =>
    (synth.prices ?? []).map((p) => p.price)
  );
  const minPrice = Math.min(...allPrices);
  const maxPrice = Math.max(...allPrices);
  const yMargin = Math.max(10, Math.round((maxPrice - minPrice) * 0.1));

  const chartData = {
    labels: allDates,
    datasets,
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "top" as const },
      tooltip: {
        mode: "nearest" as const,
        intersect: true,
        callbacks: {
          label: function (context: TooltipItem<"line">) {
            return `${context.dataset.label}: €${context.parsed.y}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: { display: true, text: "Date" },
        ticks: { autoSkip: true, maxTicksLimit: 20 },
      },
      y: {
        title: { display: true, text: "Euro (€)" },
        min: minPrice - yMargin,
        max: maxPrice + yMargin,
      },
    },
    layout: {
      padding: 24,
    },
  };

  return (
    <div className="grid grid-cols-2 gap-6 auto-rows-fr mt-0">
      <div className="col-span-2 mb-8">
        <Line data={chartData} options={chartOptions} />
      </div>
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
            textValue={synth.name}
          >
            <div
              className="absolute inset-0 bg-cover bg-center filter blur-sm opacity-20"
              style={{ backgroundImage: `url(${synth.image})` }}
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
