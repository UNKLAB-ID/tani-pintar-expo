import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const TransferReceiveIcon = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      stroke="#0069AC"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16.666 8.334H3.333l4.583-5M3.333 11.666h13.333l-4.583 5"
    />
  </Svg>
);
export default TransferReceiveIcon;
