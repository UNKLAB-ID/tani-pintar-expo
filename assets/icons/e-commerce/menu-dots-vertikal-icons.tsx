import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

interface IconProps extends SvgProps {
  size?: number;
  color?: string;
}

const MenuVerticalIcons: React.FC<IconProps> = ({
  size = 24,
  color = "#7D7D7D",
  ...props
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      fill={color}
      d="M12 5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM12 14.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM12 24a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
    />
  </Svg>
);

export default MenuVerticalIcons;
