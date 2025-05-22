import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const Location2Icons = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <Path
      stroke="#6F6F6F"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12.072 9.005a2.072 2.072 0 1 0-4.144 0 2.072 2.072 0 0 0 4.144 0Z"
      clipRule="evenodd"
    />
    <Path
      stroke="#6F6F6F"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M10 17.708s-6.064-3.95-6.216-8.877C3.676 5.37 6.566 2.29 10 2.29c3.433 0 6.322 3.08 6.216 6.54C16.063 13.86 10 17.708 10 17.708Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default Location2Icons;
