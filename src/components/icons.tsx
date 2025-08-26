import { FunctionComponent } from "react";

type LogoProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  size?: number;
  height?: number;
};

export const Logo: FunctionComponent<LogoProps> = ({
  size = 36,
  height,
  ...props
}) => (
  <img
    src="/wave-sine-icon-size_256.png"
    alt="Logo"
    width={size || height}
    height={size || height}
    style={{ display: "inline-block" }}
    {...props}
  />
);
