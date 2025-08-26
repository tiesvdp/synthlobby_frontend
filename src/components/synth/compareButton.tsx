import { FunctionComponent, useState, useRef, useLayoutEffect } from "react";
import { Button } from "@heroui/react";
import { GoGitCompare } from "react-icons/go";

interface CompareButtonProps {
  isCompared: boolean;
  onPress: () => void;
  isBrowse?: boolean;
}

const useContainerWidth = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    if (!ref.current) return;
    const observer = new ResizeObserver((entries) => {
      if (entries[0]) {
        setWidth(entries[0].contentRect.width);
      }
    });
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, []);
  return { ref, width };
};

const CompareButton: FunctionComponent<CompareButtonProps> = ({
  isCompared,
  onPress,
  isBrowse = true,
}) => {
  const { ref, width } = useContainerWidth();
  const showText = isBrowse ? undefined : width > 120;

  const buttonContent = (
    <Button
      aria-label="Compare"
      className={`transition-colors h-9 rounded-lg ${
        isBrowse ? "min-w-[2.25rem] px-3" : ""
      } ${
        isCompared
          ? "bg-purple-100 text-purple-700"
          : "bg-default-100 text-default-600 hover:bg-default-200"
      }`}
      disableRipple
      onPress={onPress}
      isIconOnly={!isBrowse && !showText}
      startContent={
        isBrowse ? (
          <GoGitCompare size={16} />
        ) : showText ? (
          <GoGitCompare size={16} />
        ) : undefined
      }
    >
      {isBrowse ? (
        <span className="font-semibold text-sm hidden sm:inline">
          {isCompared ? "Comparing" : "Compare"}
        </span>
      ) : showText ? (
        <span className="font-semibold text-sm">
          {isCompared ? "Comparing" : "Compare"}
        </span>
      ) : (
        <GoGitCompare size={18} />
      )}
    </Button>
  );

  return isBrowse ? (
    buttonContent
  ) : (
    <div ref={ref} className="w-full h-full">
      {buttonContent}
    </div>
  );
};

export default CompareButton;
