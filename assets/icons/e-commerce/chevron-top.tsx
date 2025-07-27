import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const ChevronTopIcon = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      fill="#1F1F1F"
      fillRule="evenodd"
      d="m17.012 12.916-1.179 1.179L10 8.26l-5.833 5.834-1.179-1.179L10 5.905l7.012 7.011Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default ChevronTopIcon;
