import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const TopUpIcon = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      fill="#169953"
      d="M2.5 7.5c0-.46.373-.833.833-.833h5.834V.833a.833.833 0 1 1 1.666 0v5.834h5.834a.833.833 0 1 1 0 1.666h-5.834v5.834a.833.833 0 1 1-1.666 0V8.333H3.333A.833.833 0 0 1 2.5 7.5Zm14.167 10.833H3.333a.833.833 0 1 0 0 1.667h13.334a.833.833 0 1 0 0-1.667Z"
    />
  </Svg>
);
export default TopUpIcon;
