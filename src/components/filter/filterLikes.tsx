import { FunctionComponent } from "react";
import { Button } from "@heroui/button";

import { HeartIcon } from "@/components/heartIcon.tsx";
import { useFilter } from "@/context/filterContext.tsx";

const FilterLikes: FunctionComponent = () => {
  const { filterLikes, setFilterLikes } = useFilter();

  const handleClick = () => {
    setFilterLikes(!filterLikes);
  };

  return (
    <Button
      isIconOnly
      aria-label="Like"
      color="default"
      variant="ghost"
      onPress={handleClick}
      className="w-full md:w-auto lg:w-full"
    >
      <HeartIcon filled={filterLikes} />
    </Button>
  );
};

export default FilterLikes;
