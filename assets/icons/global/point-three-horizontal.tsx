import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const PointThreeHorizontal = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <Path
      fill="#525252"
      d="M2 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM22 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
    />
  </Svg>
);
export default PointThreeHorizontal;
