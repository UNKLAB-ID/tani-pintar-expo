import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const WalletBalanceIcon = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      fill="#525252"
      d="M21 6.5H5a3.012 3.012 0 0 1-2.235-.999A2.995 2.995 0 0 1 5 4.5h18a1 1 0 1 0 0-2H5a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h16a3 3 0 0 0 3-3v-10a3 3 0 0 0-3-3Zm1 13c0 .551-.448 1-1 1H5c-1.654 0-3-1.346-3-3V7.498A5.012 5.012 0 0 0 5 8.5h16c.552 0 1 .449 1 1v10Zm-2-5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
    />
  </Svg>
);
export default WalletBalanceIcon;
