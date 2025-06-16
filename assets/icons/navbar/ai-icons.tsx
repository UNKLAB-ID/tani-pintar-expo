import * as React from 'react';
import Svg, { SvgProps, G, Rect, Path, Defs, ClipPath } from 'react-native-svg';

const AiIcons = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill="#fff"
        d="M23 11a1 1 0 1 0 0-2h-1V7h1a1 1 0 1 0 0-2h-1.418A5.036 5.036 0 0 0 19 2.418V1a1 1 0 1 0-2 0v1h-2V1a1 1 0 1 0-2 0v1h-2V1a1 1 0 1 0-2 0v1H7V1a1 1 0 1 0-2 0v1.418A5.036 5.036 0 0 0 2.418 5H1a1 1 0 1 0 0 2h1v2H1a1 1 0 1 0 0 2h1v2H1a1 1 0 1 0 0 2h1v2H1a1 1 0 1 0 0 2h1.418A5.036 5.036 0 0 0 5 21.582V23a1 1 0 1 0 2 0v-1h2v1a1 1 0 1 0 2 0v-1h2v1a1 1 0 1 0 2 0v-1h2v1a1 1 0 1 0 2 0v-1.418A5.036 5.036 0 0 0 21.582 19H23a1 1 0 1 0 0-2h-1v-2h1a1 1 0 1 0 0-2h-1v-2h1Zm-6 9H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3h10c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3Zm0-13v10a1 1 0 1 1-2 0V7a1 1 0 1 1 2 0Zm-5.435.302c-.182-.777-.811-1.299-1.565-1.299-.754 0-1.383.521-1.561 1.28L6.03 16.754a1 1 0 0 0 .723 1.215.993.993 0 0 0 1.216-.723L8.286 16h3.428l.317 1.246a1 1 0 0 0 1.939-.492l-2.404-9.452h-.001ZM8.795 14 10 9.261 11.205 14H8.794h.001Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default AiIcons;
