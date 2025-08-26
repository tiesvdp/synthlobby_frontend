import { FunctionComponent } from "react";
import { Input } from "@heroui/input";
import { useFilter } from "@/context/filterContext.tsx";
import { FiSearch } from "react-icons/fi";

const SearchInput: FunctionComponent = () => {
  const { search, setSearch } = useFilter();

  return (
    <Input
      classNames={{
        base: "w-full h-10",
        mainWrapper: "h-full",
        input: "text-small px-1",
        inputWrapper:
          "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
      }}
      placeholder="Type to search..."
      size="sm"
      startContent={<FiSearch size={18} />}
      type="search"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
};

export default SearchInput;
