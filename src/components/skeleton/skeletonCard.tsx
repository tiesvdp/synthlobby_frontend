import { FunctionComponent } from "react";
import { Card, Skeleton } from "@heroui/react";

const SkeletonCard: FunctionComponent = () => {
  return (
    <Card className="w-full flex flex-col lg:flex-row p-4 gap-4 lg:gap-6">
      <div className="w-full lg:w-1/3 flex-shrink-0">
        <Skeleton className="w-full rounded-xl aspect-square">
          <div className="h-full w-full rounded-xl bg-default-200"></div>
        </Skeleton>
      </div>
      <div className="w-full lg:w-2/3 flex flex-col">
        <div className="flex flex-col items-start">
          <div className="flex justify-between w-full">
            <Skeleton className="w-3/5 rounded-lg">
              <div className="h-7 w-full rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-1/4 rounded-lg">
              <div className="h-7 w-full rounded-lg bg-default-200"></div>
            </Skeleton>
          </div>
          <Skeleton className="w-2/5 rounded-lg mt-3">
            <div className="h-8 w-full rounded-lg bg-default-300"></div>
          </Skeleton>
        </div>
        <div className="mt-4 flex flex-col flex-grow">
          <div className="flex justify-end gap-2 mb-2">
            <Skeleton className="w-7 h-7 rounded-lg bg-default-200" />
            <Skeleton className="w-7 h-7 rounded-lg bg-default-200" />
            <Skeleton className="w-7 h-7 rounded-lg bg-default-200" />
            <Skeleton className="w-7 h-7 rounded-lg bg-default-200" />
          </div>
          <Skeleton className="w-full rounded-lg">
            <div className="h-full w-full rounded-lg bg-default-200 min-h-[150px]"></div>
          </Skeleton>
        </div>
        <div className="flex justify-between items-center mt-4 pt-2 border-t border-default-200">
          <Skeleton className="w-1/4 rounded-lg">
            <div className="h-8 w-full rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-1/3 rounded-lg">
            <div className="h-9 w-full rounded-lg bg-default-200"></div>
          </Skeleton>
        </div>
      </div>
    </Card>
  );
};

export default SkeletonCard;
