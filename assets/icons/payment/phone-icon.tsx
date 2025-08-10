import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const PhoneIcon = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      stroke="#169953"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M14 22.168h.012M15.75 2.332h-3.5c-2.75 0-4.125 0-4.98.854-.854.855-.854 2.23-.854 4.98v11.666c0 2.75 0 4.125.854 4.98.855.853 2.23.853 4.98.853h3.5c2.75 0 4.124 0 4.978-.854.855-.854.855-2.23.855-4.979V8.165c0-2.75 0-4.124-.855-4.979-.854-.854-2.229-.854-4.979-.854Z"
    />
  </Svg>
);
export default PhoneIcon;
