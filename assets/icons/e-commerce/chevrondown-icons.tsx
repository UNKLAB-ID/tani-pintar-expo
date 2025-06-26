import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const DropdownIcons = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <Path
      fill="#7D7D7D"
      fillRule="evenodd"
      d="M6 7.276.39 1.666l.943-.942L6 5.391 10.667.724l.942.943L6 7.277Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default DropdownIcons;
