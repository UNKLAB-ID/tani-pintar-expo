import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const ChevronUpDown = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      fill="#C8C8C8"
      d="M10 17c-.235 0-.468-.049-.685-.145a1.78 1.78 0 0 1-.58-.416L4 11.357 5.265 10 10 15.08 14.735 10 16 11.357l-4.735 5.08a1.78 1.78 0 0 1-.58.417c-.217.097-.45.146-.685.146ZM10 2c.235 0 .468.049.685.145.217.097.414.238.58.417L16 7.642 14.735 9 10 3.92 5.265 9 4 7.643l4.735-5.08a1.78 1.78 0 0 1 .58-.417C9.532 2.049 9.765 2 10 2Z"
    />
  </Svg>
);
export default ChevronUpDown;
