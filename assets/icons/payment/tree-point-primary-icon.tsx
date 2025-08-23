import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const TreePointPrimaryIcon = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      fill="#169953"
      d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0ZM6.5 13.5a1.5 1.5 0 1 1 .001-3.001A1.5 1.5 0 0 1 6.5 13.5Zm5.5 0a1.5 1.5 0 1 1 .001-3.001A1.5 1.5 0 0 1 12 13.5Zm5.5 0a1.5 1.5 0 1 1 .001-3.001A1.5 1.5 0 0 1 17.5 13.5Z"
    />
  </Svg>
);
export default TreePointPrimaryIcon;
