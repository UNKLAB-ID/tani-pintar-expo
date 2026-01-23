import * as React from 'react';
import Svg, { SvgProps, G, Mask, Path, Defs, ClipPath } from 'react-native-svg';
const PDAMCategoryIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <G clipPath="url(#a)">
      <Mask
        id="b"
        width={29}
        height={29}
        x={0}
        y={0}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: 'luminance',
        }}
      >
        <Path fill="#fff" d="M29 0H0v29h29V0Z" />
      </Mask>
      <G fill="#2E3FFC" mask="url(#b)">
        <Path d="M20.046 8.955 7.624 21.377c-.58.58-1.57.447-1.921-.29a9.815 9.815 0 0 1-.991-4.29c-.024-6.67 6.742-12.373 9.038-14.125a1.215 1.215 0 0 1 1.487 0 32.612 32.612 0 0 1 4.87 4.628c.41.483.386 1.208-.061 1.655ZM24.287 16.81c0 5.389-4.386 9.775-9.787 9.775a9.74 9.74 0 0 1-5.812-1.909c-.592-.435-.64-1.305-.121-1.825l12.168-12.168c.568-.567 1.522-.447 1.909.254.99 1.825 1.655 3.806 1.643 5.873Z" />
      </G>
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h29v29H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default PDAMCategoryIcon;
