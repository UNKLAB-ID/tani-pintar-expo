import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
const CameraIcons = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <G fill="#0069AC" clipPath="url(#a)">
      <Path d="m17.721 3-1.413-1.832A3.023 3.023 0 0 0 13.932 0h-3.864a3.023 3.023 0 0 0-2.376 1.168L6.279 3h11.442ZM12 18a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
      <Path d="M19 5H5a5.006 5.006 0 0 0-5 5v9a5.006 5.006 0 0 0 5 5h14a5.006 5.006 0 0 0 5-5v-9a5.006 5.006 0 0 0-5-5Zm-7 15a6 6 0 1 1 0-12 6 6 0 0 1 0 12Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default CameraIcons

