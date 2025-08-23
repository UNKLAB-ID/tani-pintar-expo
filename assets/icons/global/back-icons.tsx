import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

type IconProps = SvgProps & {
  size?: number;
  color?: string;
  strokeWidth?: number; // untuk mengatur ketebalan stroke
  direction?: 'left' | 'right'; // default: left
};

const BackIcons = ({
  size = 24,
  color = '#000',
  strokeWidth = 0.1,
  direction = 'left',
  ...props
}: IconProps) => {
  // Jika arah kanan, lakukan mirror horizontal
  const scaleX = direction === 'right' ? -1 : 1;

  return (
    <Svg
      viewBox="0 0 18 16"
      width={size}
      height={size}
      fill="none"
      {...props}
      style={{ transform: [{ scaleX }] }}
    >
      <Path
        fill={color}
        stroke={color}
        strokeWidth={strokeWidth}
        fillRule="evenodd"
        d="M17.709 7H4.13l5.042-5.021L7.762.562.292 8l7.47 7.438 1.41-1.418L4.128 9h13.58V7Z"
        clipRule="evenodd"
      />
    </Svg>
  );
};

export default BackIcons;
