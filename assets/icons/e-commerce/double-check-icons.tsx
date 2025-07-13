import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const DoubleCheck = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      fill="#8D8D8D"
      d="M5.166 11.55c-.454 0-.89-.18-1.21-.502L.295 7.39a1.009 1.009 0 0 1 1.426-1.427l3.444 3.444L14.278.295a1.009 1.009 0 0 1 1.427 1.427l-9.328 9.326a1.71 1.71 0 0 1-1.21.502Z"
    />
    <Path
      fill="#8D8D8D"
      d="M9.166 11.55c-.454 0-.89-.18-1.21-.502L4.295 7.39a1.009 1.009 0 0 1 1.426-1.427l3.444 3.444L18.278.295a1.009 1.009 0 0 1 1.427 1.427l-9.328 9.326a1.71 1.71 0 0 1-1.21.502Z"
    />
  </Svg>
);
export default DoubleCheck;
