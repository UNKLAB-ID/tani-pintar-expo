import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const FriendsIcons = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <Path
      fill="#169953"
      d="M3.75 7a2.25 2.25 0 1 1 0-4.5 2.25 2.25 0 0 1 0 4.5ZM7 12.5H.5A.5.5 0 0 1 0 12v-.25a3.75 3.75 0 1 1 7.5 0V12a.5.5 0 0 1-.5.5ZM8.75 5a2.25 2.25 0 1 1 0-4.5 2.25 2.25 0 0 1 0 4.5Zm-.71 1.01a3.412 3.412 0 0 0-2.335 1.416c1.12.509 2 1.431 2.457 2.574H11.5a.5.5 0 0 0 .5-.5v-.019a3.504 3.504 0 0 0-3.96-3.47Z"
    />
  </Svg>
)
export default FriendsIcons
