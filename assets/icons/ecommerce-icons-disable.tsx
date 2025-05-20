import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const EcommerceIcons = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="#6F6F6F"
      d="M21.5 6h-3a6 6 0 1 0-12 0h-3a3 3 0 0 0-3 3v10a5.006 5.006 0 0 0 5 5h14a5.006 5.006 0 0 0 5-5V9a3 3 0 0 0-3-3Zm-9-4a4 4 0 0 1 4 4h-8a4 4 0 0 1 4-4Zm10 17a3 3 0 0 1-3 3h-14a3 3 0 0 1-3-3V9a1 1 0 0 1 1-1h3v2a1 1 0 1 0 2 0V8h8v2a1 1 0 0 0 2 0V8h3a1 1 0 0 1 1 1v10Z"
    />
  </Svg>
);
export default EcommerceIcons;
