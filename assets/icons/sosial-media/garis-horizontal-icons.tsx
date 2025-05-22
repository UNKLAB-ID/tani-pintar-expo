import * as React from "react"
import Svg, { SvgProps, Rect } from "react-native-svg"
const GarisHorizotal = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <Rect width={86} height={6} fill="#AAA" rx={3} />
  </Svg>
)
export default GarisHorizotal