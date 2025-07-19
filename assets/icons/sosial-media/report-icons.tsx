import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const ReportIcons = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      fill={props.color}
      d="M11 22a11 11 0 1 1 11-11 11.012 11.012 0 0 1-11 11Zm0-20.167A9.167 9.167 0 1 0 20.167 11 9.177 9.177 0 0 0 11 1.833Z"
    />
    <Path
      fill={props.color}
      d="M11.917 4.583h-1.834v9.167h1.834V4.584ZM11.917 15.584h-1.834v1.833h1.834v-1.834Z"
    />
  </Svg>
);
export default ReportIcons;
