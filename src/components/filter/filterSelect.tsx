import { FunctionComponent } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";

import { useFilter } from "@/context/filterContext.tsx";

const FilterSelect: FunctionComponent = () => {
  const { filterType, setFilterType } = useFilter();

  const filterOptions: Record<string, string> = {
    no: "No sorting",
    asc: "Price (ascending)",
    des: "Price (descending)",
  };

  return (
    <Dropdown backdrop="blur" className="w-full">
      <DropdownTrigger>
        <Button className="px-6 w-full" variant="bordered">
          {filterOptions[filterType] || "No sorting"}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Sort by price"
        variant="faded"
        onAction={(key) => setFilterType(key as string)}
        selectedKeys={[filterType]}
        selectionMode="single"
      >
        <DropdownItem key="no">No sorting</DropdownItem>
        <DropdownItem key="asc">Price (ascending)</DropdownItem>
        <DropdownItem key="des">Price (descending)</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default FilterSelect;
