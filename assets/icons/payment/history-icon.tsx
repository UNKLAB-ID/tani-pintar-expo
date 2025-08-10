import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const HistoryIcon = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      stroke="#169953"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M25.333 14.001v-.666c0-5.029 0-7.543-1.562-9.105-1.562-1.562-4.076-1.562-9.104-1.562-5.029 0-7.543 0-9.105 1.562C4 5.792 4 8.306 4 13.335v6c0 4.383 0 6.575 1.21 8.05.222.27.47.517.74.74 1.475 1.21 3.667 1.21 8.05 1.21M9.334 9.332h10.667M9.334 14.665h5.333"
    />
    <Path
      stroke="#169953"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m24 24.665-2-.733v-3.267m-6 2.667a6 6 0 1 0 12 0 6 6 0 0 0-12 0Z"
    />
  </Svg>
);
export default HistoryIcon;
