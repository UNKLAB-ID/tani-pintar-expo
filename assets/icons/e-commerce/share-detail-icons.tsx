import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

interface IconProps extends SvgProps {
  size?: number;
  color?: string;
}

const Share2Icons: React.FC<IconProps> = ({
  size = 24,
  color = '#7D7D7D',
  ...props
}) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 15 15"
    fill="none"
    stroke={color}
    strokeWidth={0.1}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fill={color}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5 7.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm.713 1.164a2.5 2.5 0 1 1 0-2.328l3.391-2.12A2.5 2.5 0 1 1 14 3.5a2.5 2.5 0 0 1-4.484 1.52l-3.53 2.207a2.526 2.526 0 0 1 0 .546l3.53 2.206a2.5 2.5 0 1 1-.411.804l-3.392-2.12ZM11.5 5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm1.5 6.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
    />
  </Svg>
);

export default Share2Icons;
