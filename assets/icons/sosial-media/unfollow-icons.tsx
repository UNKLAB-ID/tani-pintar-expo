import * as React from 'react';
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg';
const UnfollowIcons = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill="#525252"
        d="M6.75 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm0-7.5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm6.75 15.75a.75.75 0 1 1-1.5 0 5.25 5.25 0 1 0-10.5 0 .75.75 0 1 1-1.5 0 6.75 6.75 0 0 1 13.5 0Zm4.28-6.53a.75.75 0 1 1-1.06 1.06l-1.345-1.345-1.345 1.345a.75.75 0 0 1-1.06-1.06l1.345-1.345L12.97 8.03a.75.75 0 0 1 1.06-1.06l1.345 1.345L16.72 6.97a.75.75 0 0 1 1.06 1.06l-1.345 1.345 1.345 1.345Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h18v18H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default UnfollowIcons;
