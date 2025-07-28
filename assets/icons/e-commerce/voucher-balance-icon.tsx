import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const VoucherBalanceIcon = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      fill="#525252"
      d="M24 15.5v-4h-1a2 2 0 0 1 0-4h1v-4a3 3 0 0 0-3-3H0v7h1a2 2 0 1 1 0 4H0v7h21a3 3 0 0 0 3-3ZM2 13.374a4 4 0 0 0 0-7.748V2.5h5v3h2v-3h12a1 1 0 0 1 1 1v2.126a4 4 0 0 0 0 7.748V15.5a1 1 0 0 1-1 1H9v-3H7v3H2v-3.126Z"
    />
    <Path fill="#525252" d="M9 11.5v-4H7v4h2Z" />
  </Svg>
);
export default VoucherBalanceIcon;
