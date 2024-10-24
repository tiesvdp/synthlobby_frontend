import { FunctionComponent } from "react";
import { Spinner } from "@nextui-org/react";

interface FallBackProps {
  text?: string;
}

const FallBack: FunctionComponent<FallBackProps> = ({ text }) => {
  return (
    <div className="flex justify-center mt-20">
      <Spinner color="default" label={text} labelColor="foreground" />
    </div>
  );
};

export default FallBack;
