import * as React from 'react';
import Svg, { SvgProps, G, Mask, Path, Defs, ClipPath } from 'react-native-svg';
const PulsaCategoryIcon = (props: SvgProps) => (
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
      <G mask="url(#b)">
        <Path
          fill="#169953"
          d="M19.623 2.418H9.376c-3.335 0-4.543 1.208-4.543 4.604V21.98c0 3.395 1.208 4.604 4.543 4.604h10.235c3.347 0 4.555-1.209 4.555-4.604V7.02c0-3.395-1.208-4.603-4.543-4.603ZM14.5 23.322a2.125 2.125 0 0 1-2.115-2.114c0-1.16.955-2.115 2.115-2.115 1.16 0 2.114.955 2.114 2.115 0 1.16-.954 2.114-2.114 2.114Zm2.416-15.769h-4.833a.913.913 0 0 1-.906-.906c0-.495.41-.906.906-.906h4.833c.496 0 .907.41.907.906 0 .496-.411.906-.907.906Z"
        />
      </G>
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h29v29H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default PulsaCategoryIcon;
