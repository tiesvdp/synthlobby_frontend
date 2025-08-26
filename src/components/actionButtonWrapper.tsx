import { useAuth } from "@/context/authContext";
import { Tooltip } from "@heroui/react";

const ActionButtonWrapper = ({ children }: { children: React.ReactNode }) => {
  const { currentUser } = useAuth();
  const isAuthenticated = !!currentUser;

  if (isAuthenticated) return <>{children}</>;
  return (
    <Tooltip content="Please log in to use this feature" placement="top">
      <div>{children}</div>
    </Tooltip>
  );
};

export default ActionButtonWrapper;
