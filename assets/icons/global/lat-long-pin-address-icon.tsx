import * as React from 'react';
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg';
const LatLongPinAddressIcon = ({ color = '#C8C8C8', ...props }: SvgProps) => (
  <Svg fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill={color}
        d="M20.453 14.038 10.5 20.01.548 14.038l4.72-2.831 1.231 1.204-2.712 1.627 6.714 4.029 6.714-4.029-2.713-1.627 1.231-1.204 4.721 2.832h-.001ZM6.382 9.965c-2.28-2.28-2.28-5.982-.007-8.256A5.797 5.797 0 0 1 10.5.001c1.558 0 3.023.607 4.124 1.708a5.796 5.796 0 0 1 1.71 4.125 5.798 5.798 0 0 1-1.71 4.125L10.5 13.993 6.382 9.965ZM7.553 8.78l2.947 2.882 2.953-2.889a4.133 4.133 0 0 0 1.214-2.94c0-1.113-.434-2.159-1.221-2.946a4.135 4.135 0 0 0-2.946-1.22 4.14 4.14 0 0 0-2.947 1.22 4.172 4.172 0 0 0 0 5.892v.001Zm2.947-.454a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M.5 0h20v20H.5z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default LatLongPinAddressIcon;
