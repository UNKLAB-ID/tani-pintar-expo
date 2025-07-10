import * as React from 'react';
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg';
const PictureIcons = ({ color = '#169953', ...props }: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <G fill={color} clipPath="url(#a)">
      <Path d="M19.5 0h-15A4.505 4.505 0 0 0 0 4.5v15A4.505 4.505 0 0 0 4.5 24h15a4.505 4.505 0 0 0 4.5-4.5v-15A4.505 4.505 0 0 0 19.5 0Zm-15 3h15A1.5 1.5 0 0 1 21 4.5v15a1.492 1.492 0 0 1-.44 1.06l-8.732-8.732a4 4 0 0 0-5.656 0L3 15V4.5A1.5 1.5 0 0 1 4.5 3Z" />
      <Path d="M15.5 10a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default PictureIcons;
