import { FunctionComponent, ReactNode } from "react";
import { Button, Tooltip } from "@heroui/react";

interface ActionButtonProps {
  onPress: () => void;
  tooltip: string;
  children: ReactNode;
  className?: string;
}

const ActionButton: FunctionComponent<ActionButtonProps> = ({
  onPress,
  tooltip,
  children,
  className = "",
}) => (
  <Tooltip content={tooltip} placement="top">
    <Button
      isIconOnly
      variant="light"
      size="sm"
      onPress={onPress}
      className={`w-9 h-9 text-gray-500 ${className}`}
    >
      {children}
    </Button>
  </Tooltip>
);

export default ActionButton;
