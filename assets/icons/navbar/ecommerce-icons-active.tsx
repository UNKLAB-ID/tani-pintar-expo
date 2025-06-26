import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const EcommerceIconsActive = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="#169953"
      d="M24 9a3 3 0 0 0-3-3h-3A6 6 0 1 0 6 6H3a3 3 0 0 0-3 3v10a5.006 5.006 0 0 0 5 5h14a5.006 5.006 0 0 0 5-5V9ZM8 6a4 4 0 0 1 8 0H8Z"
    />
  </Svg>
);
export default EcommerceIconsActive;
