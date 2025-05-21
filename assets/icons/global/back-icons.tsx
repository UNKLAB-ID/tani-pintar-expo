import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const BackIcons = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M17.709 7H4.13l5.042-5.021L7.762.562.292 8l7.47 7.438 1.41-1.418L4.128 9h13.58V7Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default BackIcons;
