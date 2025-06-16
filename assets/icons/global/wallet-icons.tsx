import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const WalletIcons = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <Path
      fill="#169953"
      d="M13.667 4h-10c-.526 0-1.02-.25-1.334-.666.305-.405.79-.667 1.334-.667H15c1.315-.023 1.314-1.978 0-2H3.667A3.671 3.671 0 0 0 0 4.333v7.334a3.671 3.671 0 0 0 3.667 3.666h10A2.336 2.336 0 0 0 16 13V6.333A2.336 2.336 0 0 0 13.667 4ZM14 13c0 .184-.15.333-.333.333h-10c-.92 0-1.667-.748-1.667-1.666v-6.07c.509.26 1.079.403 1.667.403h10c.183 0 .333.15.333.333V13Zm-1.333-3.333c-.023 1.314-1.978 1.314-2 0 .022-1.315 1.978-1.314 2 0Z"
    />
  </Svg>
);
export default WalletIcons;
