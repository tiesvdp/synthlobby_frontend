import { FunctionComponent } from "react";
import { Card, CardHeader, CardBody, Skeleton } from "@nextui-org/react";

const SkeletonCard: FunctionComponent = () => {
  return (
    <Card className="w-full flex flex-col py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <Skeleton className="w-full rounded-lg">
          <div className="h-6 w-full rounded-lg bg-secondary"></div>
        </Skeleton>
        <Skeleton className="w-1/2 rounded-lg mt-2">
          <div className="h-4 w-full rounded-lg bg-secondary-300"></div>
        </Skeleton>
        <Skeleton className="w-1/3 rounded-lg mt-2">
          <div className="h-4 w-full rounded-lg bg-secondary-200"></div>
        </Skeleton>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Skeleton className="w-full rounded-xl">
          <div className="relative w-full pb-[100%] rounded-xl bg-secondary"></div>
        </Skeleton>
        <Skeleton className="w-1/2 rounded-lg mt-5 me-5">
          <div className="h-4 w-full rounded-lg bg-secondary-300"></div>
        </Skeleton>
      </CardBody>
    </Card>
  );
};

export default SkeletonCard;