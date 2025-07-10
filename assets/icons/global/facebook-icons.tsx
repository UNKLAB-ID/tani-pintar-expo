import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
const FacebookIcons
 = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill="#525252"
        d="M20.5 10.06c0 4.991-3.662 9.129-8.442 9.88v-6.97h2.325l.442-2.883h-2.767v-1.87c0-.79.387-1.558 1.625-1.558h1.258V4.204s-1.142-.195-2.233-.195c-2.278 0-3.766 1.38-3.766 3.88v2.197H6.409v2.884h2.533v6.969C4.162 19.187.5 15.05.5 10.06c0-5.522 4.478-10 10-10 5.523 0 10 4.477 10 10Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M.5 0h20v20H.5z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default FacebookIcons

