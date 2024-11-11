import { motion, SVGMotionProps } from "framer-motion";

interface HeartIconProps extends SVGMotionProps<SVGSVGElement> {
  fill?: string;
  filled?: boolean;
  size?: number;
  height?: number;
  width?: number;
  label?: string;
}

export const HeartIcon: React.FC<HeartIconProps> = ({
  fill = "currentColor",
  filled,
  size,
  height,
  width,
  label,
  ...props
}) => {
  return (
    <motion.svg
      aria-label={label}
      height={size || height || 24}
      viewBox="0 0 24 24"
      width={size || width || 24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      animate={{ scale: filled ? 1.2 : 1 }}
      initial={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <defs>
        <linearGradient id="heartGradient" x1="0%" x2="100%" y1="0%" y2="0%">
          <stop offset="0%" style={{ stopColor: "#FF1CF7", stopOpacity: 1 }} />
          <stop
            offset="100%"
            style={{ stopColor: "#b249f8", stopOpacity: 1 }}
          />
        </linearGradient>
      </defs>
      <path
        d="M12.62 20.81c-.34.12-.9.12-1.24 0C8.48 19.82 2 15.69 2 8.69 2 5.6 4.49 3.1 7.56 3.1c1.82 0 3.43.88 4.44 2.24a5.53 5.53 0 0 1 4.44-2.24C19.51 3.1 22 5.6 22 8.69c0 7-6.48 11.13-9.38 12.12Z"
        fill={filled ? "url(#heartGradient)" : "none"}
        stroke={filled ? "url(#heartGradient)" : "currentColor"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={filled ? 2 : 1.5}
      />
    </motion.svg>
  );
};
