import * as React from 'react';
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg';

const LoveIcons = ({
  width = 18,
  height = 18,
  color = '#000',
  ...props
}: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    width={width}
    height={height}
    viewBox="0 0 18 18"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        fill={color}
        d="M13.125.688A4.8 4.8 0 0 0 9 3.163 4.8 4.8 0 0 0 4.875.688 5.1 5.1 0 0 0 0 5.975c0 5.082 8.217 10.95 8.566 11.2L9 17.48l.433-.307C9.783 16.927 18 11.057 18 5.975A5.1 5.1 0 0 0 13.125.688ZM9 15.635c-2.44-1.823-7.5-6.3-7.5-9.66a3.6 3.6 0 0 1 3.375-3.787A3.6 3.6 0 0 1 8.25 5.975h1.5a3.6 3.6 0 0 1 3.375-3.787A3.6 3.6 0 0 1 16.5 5.975c0 3.361-5.06 7.837-7.5 9.66Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h18v18H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default LoveIcons;
