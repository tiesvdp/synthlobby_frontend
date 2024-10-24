import {FunctionComponent} from 'react'
import { Button } from "@nextui-org/button";

import { HeartIcon } from "@/components/heartIcon.tsx";
import {useFilter} from '@/context/filterContext.tsx'

const FilterLikes: FunctionComponent = () => {
  const { filterLikes, setFilterLikes } = useFilter();

  const handleClick = () => {
    setFilterLikes(!filterLikes);
  };

  return (
    <Button isIconOnly aria-label="Like" onClick={handleClick} color="default" variant="ghost">
      <HeartIcon filled={filterLikes} />
    </Button>
  );
};

export default FilterLikes;
