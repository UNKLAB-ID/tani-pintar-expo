import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const DeleteIcons = ({ color = '#525252', ...props }: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <Path
      fill={color}
      d="M15 4V2a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2H0v2h2v15a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V6h2V4h-5ZM9 17H7v-6h2v6Zm4 0h-2v-6h2v6Zm0-13H7V2h6v2Z"
    />
  </Svg>
);
export default DeleteIcons;
