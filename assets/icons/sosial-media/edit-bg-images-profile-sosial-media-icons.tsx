import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const EditBgImagesSosialMediaIcons = ({ color, ...props }: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <Path
      fill={color}
      d="M15.216.784a2.739 2.739 0 0 0-3.784 0L0 12.216V16h3.784L15.216 4.568a2.679 2.679 0 0 0 0-3.784ZM2.956 14H2v-.956l8.435-8.435.956.956L2.956 14Z"
    />
  </Svg>
);
export default EditBgImagesSosialMediaIcons;
