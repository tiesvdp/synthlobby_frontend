import { FunctionComponent } from "react";
import { Input } from "@nextui-org/input";
import { SearchIcon } from "@/components/icons.tsx";
import { useFilter } from "@/context/FilterContext.tsx";

const SearchInput: FunctionComponent = () => {
  const { search, setSearch } = useFilter();

  return (
    <Input
      classNames={{
        base: "min-w-max sm:max-w-[10rem] h-10",
        mainWrapper: "h-full",
        input: "text-small px-10",
        inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
      }}
      placeholder="Type to search..."
      size="sm"
      startContent={<SearchIcon size={18} />}
      type="search"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
};

export default SearchInput;