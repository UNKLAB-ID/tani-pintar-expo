import * as React from 'react';
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg';
const ShopVendorActiveIcon = ({ color = '#169953', ...props }: SvgProps) => (
  <Svg fill="none" {...props}>
    <G fill="#169953" clipPath="url(#a)">
      <Path d="M19 17a5.994 5.994 0 0 1-3-.806A5.994 5.994 0 0 1 13 17h-2a5.938 5.938 0 0 1-3-.818A5.935 5.935 0 0 1 5 17H4c-1.054 0-2.09-.28-3-.813V21a3 3 0 0 0 3 3h16a3 3 0 0 0 3-3v-4.812A5.958 5.958 0 0 1 20 17h-1ZM17 0v6h-2V0H9v6H7V0H2.2L.024 9.783 0 11a4 4 0 0 0 4 4h1a3.975 3.975 0 0 0 3-1.382A3.976 3.976 0 0 0 11 15h2a3.99 3.99 0 0 0 3-1.357A3.99 3.99 0 0 0 19 15h1a4 4 0 0 0 4-4v-1L21.8 0H17Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default ShopVendorActiveIcon;
