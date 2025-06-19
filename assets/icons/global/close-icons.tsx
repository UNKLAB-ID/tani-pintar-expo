import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const CloseIcons = ({ color = "#1F1F1F", ...props }: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M1 13 13 1M1 1l12 12"
    />
  </Svg>
)
export default CloseIcons
