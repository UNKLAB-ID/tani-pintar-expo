import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const ButtonPlusPrimaryIcons = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <Path
      fill="#169953"
      d="M13.5 8h-5v5c0 .55-.45 1-1 1s-1-.45-1-1V8h-5c-.55 0-1-.45-1-1s.45-1 1-1h5V1c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1Z"
    />
  </Svg>
);
export default ButtonPlusPrimaryIcons;
