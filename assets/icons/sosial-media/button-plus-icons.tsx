import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const ButtonPlusIcons = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={36}
    height={36}
    fill="none"
    {...props}
  >
    <Path
      fill="#169953"
      d="M28.5 0h-21C3.364 0 0 3.365 0 7.5v21C0 32.636 3.365 36 7.5 36h21c4.136 0 7.5-3.364 7.5-7.5v-21C36 3.364 32.636 0 28.5 0ZM24 19.5h-4.5V24a1.5 1.5 0 1 1-3 0v-4.5H12a1.5 1.5 0 1 1 0-3h4.5V12a1.5 1.5 0 1 1 3 0v4.5H24a1.5 1.5 0 1 1 0 3Z"
    />
  </Svg>
);
export default ButtonPlusIcons;
