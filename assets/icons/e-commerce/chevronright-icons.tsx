import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const ChevronRight = (props: SvgProps) => (
  <Svg width={16} height={16} fill="none" {...props}>
    <Path
      fill="#1F1F1F"
      fillRule="evenodd"
      d="m5.666 13.61-.942-.943L9.39 8 4.724 3.333l.942-.942L11.276 8l-5.61 5.61Z"
      clipRule="evenodd"
    />
  </Svg>
);

export default ChevronRight;
