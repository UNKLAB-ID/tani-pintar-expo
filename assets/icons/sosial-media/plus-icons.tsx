import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const PlusIcons = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <Path
      fill="#1F1F1F"
      d="M17 9.5h-6v-6a1 1 0 1 0-2 0v6H3a1 1 0 0 0 0 2h6v6a1 1 0 1 0 2 0v-6h6a1 1 0 1 0 0-2Z"
    />
  </Svg>
);
export default PlusIcons;
