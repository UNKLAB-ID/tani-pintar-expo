import * as React from 'react';
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg';
const ProtectIcon = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill="#C8C8C8"
        d="M16.62 2.202 10 .008 3.38 2.202a2.5 2.5 0 0 0-1.714 2.373V10c0 6.27 7.667 9.733 7.995 9.877l.295.13.307-.1c.33-.11 8.07-2.76 8.07-9.907V4.575a2.5 2.5 0 0 0-1.714-2.373Zm-6.25 9.456a1.559 1.559 0 0 1-1.113.46h-.028a1.56 1.56 0 0 1-1.12-.5l-1.922-2 1.202-1.151 1.87 1.95 4.318-4.318 1.178 1.179-4.386 4.38Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h20v20H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default ProtectIcon;
