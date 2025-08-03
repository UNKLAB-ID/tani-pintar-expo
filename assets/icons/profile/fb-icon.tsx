import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const FacebookIcon = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      fill="#1877F2"
      d="M20.25 0H3.75A3.75 3.75 0 0 0 0 3.75v16.5A3.75 3.75 0 0 0 3.75 24h16.5A3.75 3.75 0 0 0 24 20.25V3.75A3.75 3.75 0 0 0 20.25 0Z"
    />
    <Path
      fill="#fff"
      d="M18 12c0-3.3-2.7-6-6-6s-6 2.7-6 6c0 3 2.175 5.475 5.025 5.925v-4.2h-1.5V12h1.5v-1.35c0-1.5.9-2.325 2.25-2.325.675 0 1.35.15 1.35.15v1.5h-.75c-.75 0-.975.45-.975.9V12h1.65l-.3 1.725h-1.425V18c3-.45 5.175-3 5.175-6Z"
    />
  </Svg>
);
export default FacebookIcon;
