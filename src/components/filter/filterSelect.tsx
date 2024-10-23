import { FunctionComponent } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

import { useFilter } from "@/context/FilterContext.tsx";

const FilterSelect: FunctionComponent = () => {
  const { setFilterType } = useFilter();

  return (
    <Dropdown backdrop="blur">
      <DropdownTrigger>
        <Button className="px-6" variant="bordered">
          Select filter type
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Static Actions"
        variant="faded"
        onAction={(key) => setFilterType(key as string)}
      >
        <DropdownItem key="no">No filtering</DropdownItem>
        <DropdownItem key="asc">Price (ascending)</DropdownItem>
        <DropdownItem key="des">Price (descending)</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default FilterSelect;
