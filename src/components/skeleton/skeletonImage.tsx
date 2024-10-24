import { FunctionComponent } from "react";
import { Skeleton } from "@nextui-org/react";

const SkeletonImage: FunctionComponent = () => {
  return (
    <Skeleton className="w-full rounded-xl">
      <div className="relative w-full pb-[100%] rounded-xl bg-secondary" />
    </Skeleton>
  );
};

export default SkeletonImage;
