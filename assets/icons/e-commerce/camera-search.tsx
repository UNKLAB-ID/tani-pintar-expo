import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const CameraSearch = ({ width = 24, height = 24, ...props }: SvgProps) => (
  <Svg fill="none" width={width} height={height} {...props}>
    <Path
      fill="#525252"
      d="M7 24H5c-2.757 0-5-2.243-5-5v-2a1 1 0 1 1 2 0v2c0 1.654 1.346 3 3 3h2a1 1 0 1 1 0 2Zm17-5v-2a1 1 0 1 0-2 0v2c0 1.654-1.346 3-3 3h-2a1 1 0 1 0 0 2h2c2.757 0 5-2.243 5-5Zm0-12V5c0-2.757-2.243-5-5-5h-2a1 1 0 1 0 0 2h2c1.654 0 3 1.346 3 3v2a1 1 0 1 0 2 0ZM2 7V5c0-1.654 1.346-3 3-3h2a1 1 0 1 0 0-2H5C2.243 0 0 2.243 0 5v2a1 1 0 1 0 2 0Zm16 3v4c0 1.654-1.346 3-3 3H9c-1.654 0-3-1.346-3-3v-4a3.003 3.003 0 0 1 2.953-2.999l.696-1.083A1.99 1.99 0 0 1 11.331 5h1.338c.685 0 1.313.344 1.683.919l.695 1.082A3.002 3.002 0 0 1 18 10Zm-4 2a2 2 0 1 0-3.999-.001A2 2 0 0 0 14 12Z"
    />
  </Svg>
);
export default CameraSearch;
