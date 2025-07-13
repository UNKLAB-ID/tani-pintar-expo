import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const ShareGlobalIcons = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <Path
      fill={props.color}
      d="M14.5 11a3.495 3.495 0 0 0-2.88 1.518L6.74 10.314a3.43 3.43 0 0 0 .003-2.616l4.875-2.215a3.495 3.495 0 1 0-.62-1.983c.003.198.023.396.06.59L5.875 6.445a3.5 3.5 0 1 0-.012 5.12l5.196 2.346A3.557 3.557 0 0 0 11 14.5a3.501 3.501 0 1 0 3.5-3.5Zm0-9.5a2 2 0 1 1 .001 4 2 2 0 0 1-.001-4ZM3.5 11a2 2 0 1 1-.002-4 2 2 0 0 1 .002 4Zm11 5.5a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z"
    />
  </Svg>
);
export default ShareGlobalIcons;
