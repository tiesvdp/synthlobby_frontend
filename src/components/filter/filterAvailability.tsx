import { FunctionComponent } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";
import { useFilter, Availability } from "@/context/filterContext.tsx";

const FilterAvailability: FunctionComponent = () => {
  const { filterAvailability, setFilterAvailability } = useFilter();

  const availabilityOptions: Record<Availability, string> = {
    all: "All Availabilities",
    "in stock": "In Stock",
    "available soon": "Available Soon",
    "sold out": "Sold Out",
    unknown: "Unknown",
  };

  return (
    <Dropdown backdrop="blur" className="w-full">
      <DropdownTrigger>
        <Button className="px-6 w-full" variant="bordered">
          {availabilityOptions[filterAvailability]}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Filter by availability"
        variant="faded"
        onAction={(key) => setFilterAvailability(key as Availability)}
        selectedKeys={[filterAvailability]}
        selectionMode="single"
      >
        <DropdownItem key="all">{availabilityOptions["all"]}</DropdownItem>
        <DropdownItem key="in stock">
          {availabilityOptions["in stock"]}
        </DropdownItem>
        <DropdownItem key="available soon">
          {availabilityOptions["available soon"]}
        </DropdownItem>
        <DropdownItem key="sold out">
          {availabilityOptions["sold out"]}
        </DropdownItem>
        <DropdownItem key="unknown">
          {availabilityOptions["unknown"]}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default FilterAvailability;
