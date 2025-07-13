import * as React from 'react';
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg';
const BlockIcons = ({ color = "#FF0808", ...props }: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill={color}
        d="M10.054 13.753a.915.915 0 0 1-.66 1.116 6.413 6.413 0 0 0-4.812 6.215.917.917 0 0 1-1.833 0 8.245 8.245 0 0 1 6.188-7.99.916.916 0 0 1 1.116.659h.001Zm11.677 7.979a.914.914 0 0 1-1.296 0L.27 1.565A.916.916 0 1 1 1.565.269L5.627 4.33A5.509 5.509 0 0 1 11 .001c3.033 0 5.5 2.466 5.5 5.5a5.509 5.509 0 0 1-4.331 5.372l9.562 9.563a.916.916 0 0 1 0 1.296ZM7.393 6.097l3.01 3.01c.197.032.396.06.597.06A3.67 3.67 0 0 0 14.667 5.5 3.67 3.67 0 0 0 11 1.834 3.67 3.67 0 0 0 7.333 5.5c0 .2.028.4.06.597Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h22v22H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default BlockIcons;
