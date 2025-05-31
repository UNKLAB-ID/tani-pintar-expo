import * as React from "react"
import Svg, { SvgProps, Circle } from "react-native-svg"
const PointIcons = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <Circle cx={3} cy={3} r={3} fill="#C8C8C8" />
  </Svg>
)
export default PointIcons