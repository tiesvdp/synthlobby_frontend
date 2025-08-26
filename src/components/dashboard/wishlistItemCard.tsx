import { Synth } from "@/models/synths";
import { Card } from "@heroui/card";
import { Switch, Button, Tooltip, Link } from "@heroui/react";
import { motion } from "framer-motion";
import { FiBell, FiShoppingCart } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import SynthPriceDisplay from "../synth/synthPriceDisplay";
import ActionButton from "./actionButton";
import CompareButton from "../synth/compareButton";
import { formatSynthName } from "@/utils/nameUtils";
import ActionButtonWrapper from "../actionButtonWrapper";
import { HeartIcon } from "../heartIcon";
import { useUserPreferences } from "@/context/userPreferencesContext";

const WishlistItemCard = ({
  synth,
  isCompared,
  onToggleLike,
  onToggleCompare,
  onToggleNotification,
}: {
  synth: Synth & { notificationsEnabled: boolean };
  isCompared: boolean;
  onToggleLike: (id: string) => void;
  onToggleCompare: (id: string) => void;
  onToggleNotification: (id: string, enable: boolean) => void;
}) => {
  const { likedSynthIds } = useUserPreferences();
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full flex flex-grow"
    >
      <Card className="p-4 w-full transition-all hover:shadow-md hover:border-purple-200 border border-transparent">
        {/* --- Top Section (image + info) --- */}
        <div className="flex flex-col sm:flex-row gap-4">
          <img
            src={synth.image || "/placeholder.svg"}
            alt={formatSynthName(synth)}
            className="w-full sm:w-32 h-40 sm:h-32 object-contain rounded-lg flex-shrink-0 p-2"
          />
          <div className="flex-grow flex flex-col overflow-hidden self-center w-full">
            <p
              className="font-bold text-gray-800 text-lg leading-tight wrap"
              title={formatSynthName(synth)}
            >
              {formatSynthName(synth)}
            </p>
            <p className="text-sm text-gray-500 mt-1">{synth.source}</p>
            <div className="my-2">
              <SynthPriceDisplay synth={synth} />
            </div>
          </div>
        </div>

        {/* --- Bottom Section (divider + actions) --- */}
        <div className="grid grid-cols-2 md:flex items-center md:justify-between gap-2 border-t pt-3 mt-3">
          {/* Mobile buttons (stacked) */}
          <div className="flex flex-col items-start gap-1 md:hidden">
            <Button
              as={Link}
              href={synth.href}
              target="_blank"
              rel="noopener noreferrer"
              color="secondary"
              variant="solid"
              size="sm"
              startContent={<FiShoppingCart size={16} />}
              className="font-semibold text-sm"
            >
              Buy Now
            </Button>
            <CompareButton
              isCompared={isCompared}
              onPress={() => onToggleCompare(synth.id)}
              isBrowse={false}
            />
          </div>

          <div className="flex flex-col items-end gap-1 md:hidden">
            <Tooltip
              content={
                synth.notificationsEnabled
                  ? "Disable Price Drop Emails"
                  : "Enable Price Drop Emails"
              }
              placement="top"
            >
              <div className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-gray-100 mb-1">
                <FiBell
                  size={16}
                  className={
                    synth.notificationsEnabled
                      ? "text-purple-600"
                      : "text-gray-400"
                  }
                />
                <Switch
                  size="sm"
                  color="secondary"
                  isSelected={synth.notificationsEnabled}
                  onValueChange={(isSelected) =>
                    onToggleNotification(synth.id, isSelected)
                  }
                  aria-label={`Toggle email notifications for ${formatSynthName(
                    synth
                  )}`}
                />
              </div>
            </Tooltip>
            <ActionButton
              tooltip="Remove from Wishlist"
              onPress={() => onToggleLike(synth.id)}
            >
              <IoClose size={20} className="text-gray-500 hover:text-red-500" />
            </ActionButton>
          </div>

          {/* Desktop buttons (row) */}
          <div className="hidden md:flex items-center gap-2 w-full">
            <Tooltip
              content={
                synth.notificationsEnabled
                  ? "Disable Price Drop Emails"
                  : "Enable Price Drop Emails"
              }
              placement="top"
            >
              <div className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-gray-100">
                <FiBell
                  size={16}
                  className={
                    synth.notificationsEnabled
                      ? "text-purple-600"
                      : "text-gray-400"
                  }
                />
                <Switch
                  size="sm"
                  color="secondary"
                  isSelected={synth.notificationsEnabled}
                  onValueChange={(isSelected) =>
                    onToggleNotification(synth.id, isSelected)
                  }
                  aria-label={`Toggle email notifications for ${formatSynthName(
                    synth
                  )}`}
                />
              </div>
            </Tooltip>
            <Button
              as={Link}
              href={synth.href}
              target="_blank"
              rel="noopener noreferrer"
              color="secondary"
              variant="solid"
              size="sm"
              startContent={<FiShoppingCart size={16} />}
              className="min-w-fit text-sm"
            >
              Buy Now
            </Button>
            <CompareButton
              isCompared={isCompared}
              onPress={() => onToggleCompare(synth.id)}
              isBrowse={false}
            />
            <ActionButtonWrapper>
              <Button
                isIconOnly
                aria-label="Like"
                className="bg-transparent min-w-0 w-full flex"
                disableRipple={true}
                onPress={() => onToggleLike(synth.id)}
              >
                <div className="justify-end flex w-full pe-2">
                  <HeartIcon filled={likedSynthIds.has(synth.id)} />
                </div>
              </Button>
            </ActionButtonWrapper>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default WishlistItemCard;
