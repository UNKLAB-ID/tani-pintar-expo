import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
const InfoAboutIcons = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <G fill="#525252" clipPath="url(#a)">
      <Path d="M9 18a9 9 0 1 1 9-9 9.01 9.01 0 0 1-9 9ZM9 1.5A7.5 7.5 0 1 0 16.5 9 7.509 7.509 0 0 0 9 1.5Z" />
      <Path d="M10.5 14.25H9V9H7.5V7.5H9A1.5 1.5 0 0 1 10.5 9v5.25ZM9 6a1.125 1.125 0 1 0 0-2.25A1.125 1.125 0 0 0 9 6Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h18v18H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default InfoAboutIcons
