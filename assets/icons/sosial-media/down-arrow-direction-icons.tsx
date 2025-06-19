import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const DownArrowDirectionIcons = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <Path
      fill="#169953"
      d="M9.473.973a.667.667 0 0 0-.946 0L5.473 4.027a.667.667 0 0 1-.946 0L1.473.973a.667.667 0 1 0-.946.94l3.06 3.06a2 2 0 0 0 2.826 0l3.06-3.06a.667.667 0 0 0 0-.94Z"
    />
  </Svg>
)
export default DownArrowDirectionIcons
