import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
const BoockmarkUnsave = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill="#000"
        d="M2.612 21.587a2.708 2.708 0 0 0 2.993-.59L11 15.632l5.395 5.365a2.71 2.71 0 0 0 2.997.59 2.708 2.708 0 0 0 1.691-2.54V4.583A4.589 4.589 0 0 0 16.5 0h-11A4.589 4.589 0 0 0 .917 4.583v14.464a2.707 2.707 0 0 0 1.695 2.54Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h22v22H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default BoockmarkUnsave
