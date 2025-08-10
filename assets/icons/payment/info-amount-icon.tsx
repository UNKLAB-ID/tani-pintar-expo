import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const InfoAmountIcont = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      fill="#6F6F6F"
      d="M6 12a6 6 0 1 0-6-6 6.007 6.007 0 0 0 6 6Zm-.5-9a.5.5 0 1 1 1 0v4a.5.5 0 1 1-1 0V3ZM6 9a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1Z"
    />
  </Svg>
);
export default InfoAmountIcont;
