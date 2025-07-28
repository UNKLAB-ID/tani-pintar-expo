import * as React from 'react';
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg';
const AboutUsIcon = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill="#6F6F6F"
        d="M10 .2a9.8 9.8 0 1 0 9.8 9.8A9.81 9.81 0 0 0 10 .2Zm0 17.64A7.84 7.84 0 1 1 17.84 10 7.849 7.849 0 0 1 10 17.84Zm0-8.33a.98.98 0 0 0-.98.98v2.94a.98.98 0 0 0 1.96 0v-2.94a.98.98 0 0 0-.98-.98Zm0-3.92a1.225 1.225 0 1 0 0 2.451 1.225 1.225 0 0 0 0-2.45Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h20v20H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default AboutUsIcon;
