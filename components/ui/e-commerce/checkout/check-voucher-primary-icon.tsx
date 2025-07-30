import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const CheckPrimaryIcon = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      fill="#169953"
      d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0Zm-.076 12.85a1.668 1.668 0 0 1-2.353-.004l-2.318-2.248 1.161-1.197 2.328 2.256 4.84-4.751 1.17 1.187-4.828 4.756Z"
    />
  </Svg>
);
export default CheckPrimaryIcon;
