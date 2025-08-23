import * as React from 'react';
import Svg, { SvgProps, Rect } from 'react-native-svg';
const RectangleIcon = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Rect width={86} height={4} fill="#E9E9E9" rx={2} />
  </Svg>
);
export default RectangleIcon;
