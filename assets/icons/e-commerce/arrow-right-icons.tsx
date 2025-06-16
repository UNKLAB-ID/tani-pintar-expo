import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const ArrowRightIcons = ({ width = 24, height = 24, ...props }: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    width={width}
    height={height}
    {...props}
  >
    <Path
      fill="#1F1F1F"
      fillRule="evenodd"
      d="M8.5 20.414 7.086 19l7-7-7-7L8.5 3.586 16.914 12 8.5 20.414Z"
      clipRule="evenodd"
    />
  </Svg>
);

export default ArrowRightIcons;
