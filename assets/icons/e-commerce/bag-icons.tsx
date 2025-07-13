import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const BagIcons = ({ width = 24, height = 24, ...props }: SvgProps) => (
  <Svg fill="none" width={width} height={height} viewBox="0 0 18 18" {...props}>
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12.273 5.153a3.24 3.24 0 0 0-3.24-3.24 3.24 3.24 0 0 0-3.255 3.225v.015M11.23 8.53h-.035M6.856 8.53h-.034"
    />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M9.026 16.117c-4.881 0-5.443-1.537-6.539-5.6-1.1-4.075 1.106-5.6 6.539-5.6 5.432 0 7.638 1.525 6.538 5.6-1.096 4.063-1.657 5.6-6.538 5.6Z"
      clipRule="evenodd"
    />
  </Svg>
);

export default BagIcons;
