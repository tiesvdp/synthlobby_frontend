import { FunctionComponent } from "react";
import { Button, Tooltip } from "@heroui/react";
import { HeartIcon } from "@/components/heartIcon.tsx";
import { useFilter } from "@/context/filterContext.tsx";
import { GoGitCompare } from "react-icons/go";
import { FiTrendingUp } from "react-icons/fi";
import { useAuth } from "@/context/authContext";

const FilterToggles: FunctionComponent = () => {
  const {
    filterLikes,
    setFilterLikes,
    filterCompared,
    setFilterCompared,
    filterPriceChanges,
    setFilterPriceChanges,
  } = useFilter();
  const { currentUser } = useAuth();

  const ActionButtonWrapper = ({
    children,
    tooltip,
  }: {
    children: React.ReactNode;
    tooltip: string;
  }) => {
    if (currentUser) {
      return <>{children}</>;
    }
    return (
      <Tooltip content={tooltip} placement="top">
        <div>{children}</div>
      </Tooltip>
    );
  };

  return (
    <div className="flex items-center gap-2">
      <ActionButtonWrapper tooltip="Log in to filter by likes">
        <Button
          isIconOnly
          aria-label="Filter by Likes"
          variant={filterLikes ? "solid" : "ghost"}
          onPress={() => setFilterLikes(!filterLikes)}
          isDisabled={!currentUser}
        >
          <HeartIcon filled={filterLikes} />
        </Button>
      </ActionButtonWrapper>

      <Tooltip
        content="Only show synths in your comparison list"
        placement="top"
      >
        <Button
          isIconOnly
          aria-label="Filter by Compared"
          variant={filterCompared ? "solid" : "ghost"}
          onPress={() => setFilterCompared(!filterCompared)}
        >
          <GoGitCompare size={18} />
        </Button>
      </Tooltip>

      <Tooltip
        content="Only show synths with recent price changes"
        placement="top"
      >
        <Button
          isIconOnly
          aria-label="Filter by Price Changes"
          variant={filterPriceChanges ? "solid" : "ghost"}
          onPress={() => setFilterPriceChanges(!filterPriceChanges)}
        >
          <FiTrendingUp size={18} />
        </Button>
      </Tooltip>
    </div>
  );
};

export default FilterToggles;
