import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const HomeIconsActive = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="#169953"
      d="M14.268 1.147a2.5 2.5 0 0 0-3.536 0L.5 11.38V21a3 3 0 0 0 3 3h18a3 3 0 0 0 3-3v-9.62L14.268 1.147ZM21.5 21h-5v-3.182A3.818 3.818 0 0 0 12.682 14h-.364A3.818 3.818 0 0 0 8.5 17.818V21h-5v-8.378l9-9 9 9V21Z"
    />
  </Svg>
);
export default HomeIconsActive;
