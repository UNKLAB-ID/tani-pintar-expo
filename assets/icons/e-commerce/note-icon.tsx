import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const NoteIcon = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      fill="#1F1F1F"
      d="M15.833 1.667V0h-1.666v1.667H12.5V0h-1.667v1.667H9.167V0H7.5v1.667H5.833V0H4.167v1.667H2.5V17.5A2.5 2.5 0 0 0 5 20h10a2.5 2.5 0 0 0 2.5-2.5V1.667h-1.667Zm0 15.833a.834.834 0 0 1-.833.833H5a.834.834 0 0 1-.833-.833V3.333h11.666V17.5Zm-1.666-10H5.833V5.833h8.334V7.5Zm0 3.333H5.833V9.167h8.334v1.666Zm-3.334 3.334h-5V12.5h5v1.667Z"
    />
  </Svg>
);
export default NoteIcon;
