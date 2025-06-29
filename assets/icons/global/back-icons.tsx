import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

type IconProps = SvgProps & {
  size?: number;
  color?: string;
};

const BackIcons = ({ size = 24, color = '#000', ...props }: IconProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 18 16"
    width={size}
    height={size}
    stroke={color}
    strokeWidth={0.1}
    fill="none"
    {...props}
  >
    <Path
      fill={color}
      fillRule="evenodd"
      d="M17.709 7H4.13l5.042-5.021L7.762.562.292 8l7.47 7.438 1.41-1.418L4.128 9h13.58V7Z"
      clipRule="evenodd"
    />
  </Svg>
);

export default BackIcons;
