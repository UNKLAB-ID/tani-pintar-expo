import * as React from 'react';
import Svg, { SvgProps, G, Path, Mask, Defs, ClipPath } from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: filter */
const IndonesiaIcon = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <G clipPath="url(#a)" filter="url(#b)">
      <Path fill="#fff" d="M4 4.5h20v15H4z" />
      <Path
        fill="#F7FCFF"
        fillRule="evenodd"
        d="M4 4.5v15h20v-15H4Z"
        clipRule="evenodd"
      />
      <Mask
        id="c"
        width={20}
        height={16}
        x={4}
        y={4}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: 'luminance',
        }}
      >
        <Path
          fill="#fff"
          fillRule="evenodd"
          d="M4 4.5v15h20v-15H4Z"
          clipRule="evenodd"
        />
      </Mask>
      <G mask="url(#c)">
        <Path
          fill="#E31D1C"
          fillRule="evenodd"
          d="M4 4.5V12h20V4.5H4Z"
          clipRule="evenodd"
        />
      </G>
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M4 4.5h20v15H4z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default IndonesiaIcon;
