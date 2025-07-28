import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const ChangeUserIcon = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      stroke="#6F6F6F"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M3.947 4.866a2.681 2.681 0 1 0 5.363 0 2.681 2.681 0 0 0-5.363 0ZM11.11 13.81a4.481 4.481 0 0 0-4.482-4.472 4.481 4.481 0 0 0-4.472 4.472M14.69 13.81a2.681 2.681 0 1 0 5.363 0 2.681 2.681 0 0 0-5.363 0ZM21.844 22.762a4.481 4.481 0 0 0-4.472-4.48 4.482 4.482 0 0 0-4.434 4.48M20.953 5.756h-8.062M15.582 3.075 12.9 5.756l2.682 2.691M3.047 18.281h8.062M8.419 15.6l2.681 2.68-2.681 2.691"
    />
  </Svg>
);
export default ChangeUserIcon;
