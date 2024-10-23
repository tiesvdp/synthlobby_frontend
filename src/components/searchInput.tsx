import { FunctionComponent } from "react";
import { Input } from "@nextui-org/input";

import { SearchIcon } from "@/components/icons.tsx";

const SearchInput: FunctionComponent = () => {
  return (
    <Input
      classNames={{
        base: "min-w-max sm:max-w-[10rem] h-10",
        mainWrapper: "h-full",
        input: "text-small px-10",
        inputWrapper:
          "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
      }}
      placeholder="Type to search..."
      size="sm"
      startContent={<SearchIcon size={18} />}
      type="search"
    />
  );
};

export default SearchInput;
