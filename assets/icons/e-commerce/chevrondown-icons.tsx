import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

interface IconProps extends SvgProps {
  width?: number;
  height?: number;
  color?: string;
}

const ChevronDownIcon = ({
  width = 12,
  height = 12,
  color = '#7D7D7D',
  ...props
}: IconProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 12 8"
    fill="none"
    {...props}
  >
    <Path
      fill={color}
      fillRule="evenodd"
      d="M6 7.276.39 1.666l.943-.942L6 5.391 10.667.724l.942.943L6 7.277Z"
      clipRule="evenodd"
    />
  </Svg>
);

export default ChevronDownIcon;
