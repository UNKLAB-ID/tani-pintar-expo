import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const AgentIcons = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill="#6F6F6F"
      d="M16.934 3a2 2 0 0 1 1.626.836l.089.135 2.424 4.04a3 3 0 0 1 .418 1.31l.009.233V19a2 2 0 0 1-1.85 1.995L19.5 21h-14a2 2 0 0 1-1.995-1.85L3.5 19V9.554a3 3 0 0 1 .316-1.34l.112-.204L6.35 3.971a2 2 0 0 1 1.554-.965L8.066 3h8.868Zm2.566 7h-14v9h14v-9Zm-8-5H8.066l-1.8 3H11.5V5Zm5.434 0H13.5v3h5.234l-1.8-3Z"
    />
  </Svg>
);
export default AgentIcons;
