import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const WithDrawIcon = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      stroke="#169953"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M3.023 23.332a5.31 5.31 0 0 1 5.31 5.31M24.333 28.642v-.122a5.188 5.188 0 0 1 5.188-5.188M8.334 10.023a5.31 5.31 0 0 1-5.31 5.31M24.333 10.023c0 2.908 2.359 5.269 5.256 5.31"
    />
    <Path
      stroke="#169953"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M23 10c2.9.016 4.47.145 5.495 1.17 1.172 1.17 1.172 3.056 1.172 6.828v2.666c0 3.772 0 5.657-1.172 6.829-1.172 1.171-3.057 1.171-6.828 1.171H11c-3.771 0-5.657 0-6.828-1.171C3 26.32 3 24.436 3 20.664v-2.666c0-3.772 0-5.657 1.172-6.829C5.196 10.145 6.767 10.016 9.667 10"
    />
    <Path
      stroke="#169953"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M20.333 19.332a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM19.667 7.336s-2.4 3.333-3.334 3.333C15.4 10.67 13 7.336 13 7.336m3.333 2.667V3.336"
    />
  </Svg>
);
export default WithDrawIcon;
