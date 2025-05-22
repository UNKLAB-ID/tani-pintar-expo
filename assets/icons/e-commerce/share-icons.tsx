import * as React from "react";
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg";
const ShareSquareIcons = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill="#fff"
        d="M17 19.006c0 2.76-2.24 5-5 5H5c-2.76 0-5-2.24-5-5v-7c0-2.76 2.24-5 5-5h1c.55 0 1 .45 1 1s-.45 1-1 1H5c-1.65 0-3 1.35-3 3v7c0 1.65 1.35 3 3 3h7c1.65 0 3-1.35 3-3 0-.55.45-1 1-1s1 .45 1 1Zm6.13-13.11L17.72.306a.987.987 0 0 0-1.41-.02c-.39.39-.41 1.02-.02 1.41l5.14 5.3H13c-2.76 0-5 2.24-5 5v5c0 .55.45 1 1 1s1-.45 1-1v-5c0-1.65 1.35-3 3-3h8.42l-5.14 5.3a.996.996 0 0 0 .72 1.69c.25 0 .52-.1.72-.3l5.4-5.57a2.997 2.997 0 0 0 .01-4.23v.01Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default ShareSquareIcons;
