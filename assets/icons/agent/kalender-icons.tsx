import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const KalenderIconsAgent = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M16 2v4M8 2v4M13 4h-2C7.229 4 5.343 4 4.172 5.172 3 6.343 3 8.229 3 12v2c0 3.771 0 5.657 1.172 6.828C5.343 22 7.229 22 11 22h2c3.771 0 5.657 0 6.828-1.172C21 19.657 21 17.771 21 14v-2c0-3.771 0-5.657-1.172-6.828C18.657 4 16.771 4 13 4ZM3 10h18"
    />
  </Svg>
);
export default KalenderIconsAgent;
