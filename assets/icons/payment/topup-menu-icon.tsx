import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const TopUpMenuIcon = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      stroke="#169953"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M2.024 18.89c3.028 0 5.482 2.477 5.482 5.532M7.506 5.023c0 3.055-2.454 5.532-5.482 5.532M24.021 5.023c0 3.029 2.435 5.489 5.426 5.531"
    />
    <Path
      stroke="#169953"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M29.527 17.5v-4.167c0-3.928 0-5.892-1.21-7.113C27.108 5 25.162 5 21.27 5h-11.01c-3.894 0-5.84 0-7.05 1.22C2 7.44 2 9.405 2 13.333v2.778c0 3.928 0 5.893 1.21 7.113 1.209 1.22 3.155 1.22 7.048 1.22h6.882"
    />
    <Path
      stroke="#169953"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M19.893 14.725c0 2.301-1.849 4.167-4.13 4.167-2.28 0-4.128-1.866-4.128-4.167 0-2.3 1.848-4.166 4.129-4.166 2.28 0 4.129 1.865 4.129 4.166ZM25.399 18.89v8.334m-4.13-4.167h8.259"
    />
  </Svg>
);
export default TopUpMenuIcon;
