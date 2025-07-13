import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const BoxMinusCartIcons = ({ width = 36, height = 36, ...props }: SvgProps) => (
  <Svg fill="none" width={width} height={height} viewBox="0 0 36 36" {...props}>
    <Path
      stroke="#1F1F1F"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M23.422 18.555H12.688"
    />
    <Path
      stroke="#C8C8C8"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M3.45 18.555C3.45 7.602 7.102 3.95 18.055 3.95c10.954 0 14.606 3.652 14.606 14.605 0 10.954-3.652 14.606-14.606 14.606-10.953 0-14.605-3.652-14.605-14.606Z"
      clipRule="evenodd"
      opacity={0.4}
    />
  </Svg>
);

export default BoxMinusCartIcons;
