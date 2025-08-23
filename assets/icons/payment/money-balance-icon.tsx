import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const MoneyBalanceIcon = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      stroke="#169953"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M13.291 11.5a2.292 2.292 0 1 1-4.583 0 2.292 2.292 0 0 1 4.583 0Z"
    />
    <Path
      stroke="#169953"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16.958 11.033v.008M5.042 11.95v.008"
    />
    <Path
      stroke="#169953"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M14.666 5.084c2.273 0 3.841.352 4.706.62.497.154.794.626.794 1.146v8.943c0 1.022-1.125 1.791-2.13 1.601a18.193 18.193 0 0 0-3.37-.293c-4.355 0-5.4 1.655-11.784.247a1.349 1.349 0 0 1-1.049-1.32V6.844c0-.894.844-1.547 1.721-1.373 5.793 1.15 6.915-.388 11.112-.388Z"
    />
  </Svg>
);
export default MoneyBalanceIcon;
