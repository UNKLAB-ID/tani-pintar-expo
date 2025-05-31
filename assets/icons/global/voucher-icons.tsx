import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const VoucherIcons = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <Path
      fill="#169953"
      d="M16 10V7.333h-.667a1.333 1.333 0 0 1 0-2.666H16V2a2 2 0 0 0-2-2H0v4.667h.667a1.333 1.333 0 1 1 0 2.666H0V12h14a2 2 0 0 0 2-2ZM1.333 8.583a2.667 2.667 0 0 0 0-5.166V1.333h3.334v2H6v-2h8a.667.667 0 0 1 .667.667v1.417a2.667 2.667 0 0 0 0 5.166V10a.667.667 0 0 1-.667.667H6v-2H4.667v2H1.333V8.583Z"
    />
    <Path fill="#169953" d="M6 7.333V4.666H4.666v2.667H6Z" />
  </Svg>
);
export default VoucherIcons;
