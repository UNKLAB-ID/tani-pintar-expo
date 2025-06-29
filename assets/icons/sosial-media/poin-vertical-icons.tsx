import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
const PoinVertialIcons = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <G fill="#525252" clipPath="url(#a)">
      <Path d="M6.667 1.833a1.333 1.333 0 1 0 2.666 0 1.333 1.333 0 0 0-2.666 0ZM6.667 8.5a1.333 1.333 0 1 0 2.666 0 1.333 1.333 0 0 0-2.666 0ZM6.667 15.166a1.333 1.333 0 1 0 2.666 0 1.333 1.333 0 0 0-2.666 0Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M16 .5v16H0V.5z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default PoinVertialIcons
