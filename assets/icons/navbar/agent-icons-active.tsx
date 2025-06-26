import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const AgentIconsActive = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="#169953"
      d="M16.934 3a2 2 0 0 1 1.626.836l.089.135 2.424 4.04a3 3 0 0 1 .418 1.31l.009.233V19a2 2 0 0 1-1.85 1.995L19.5 21h-14a2 2 0 0 1-1.995-1.85L3.5 19V9.554a3 3 0 0 1 .316-1.34l.112-.204L6.35 3.971a2 2 0 0 1 1.554-.965L8.066 3h8.868Zm0 2H13.5v4h5.834l-2.4-4ZM11.5 5H8.066l-2.4 4H11.5V5Z"
    />
  </Svg>
);
export default AgentIconsActive;
