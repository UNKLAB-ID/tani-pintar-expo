import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const BoxPlusCartIcons = ({ width = 36, height = 36, ...props }: SvgProps) => (
  <Svg fill="none" width={width} height={height} viewBox="0 0 36 36" {...props}>
    <Path
      stroke="#169953"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M18.056 13.194v10.723M23.422 18.555H12.688"
    />
    <Path
      stroke="#169953"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M3.45 18.555C3.45 7.602 7.102 3.95 18.055 3.95c10.954 0 14.606 3.652 14.606 14.605 0 10.954-3.652 14.606-14.606 14.606-10.953 0-14.605-3.652-14.605-14.606Z"
      clipRule="evenodd"
    />
  </Svg>
);

export default BoxPlusCartIcons;
