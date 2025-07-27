import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const LocationRedIcon = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      fill="#FF0808"
      d="M8 0a6.674 6.674 0 0 0-6.667 6.667c0 3.521 5.6 8.355 6.236 8.895l.43.364.431-.364c.636-.54 6.236-5.374 6.236-8.895A6.674 6.674 0 0 0 8 0Zm0 10a3.333 3.333 0 1 1 0-6.667A3.333 3.333 0 0 1 8 10Z"
    />
    <Path fill="#FF0808" d="M8 8.667a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
  </Svg>
);
export default LocationRedIcon;
