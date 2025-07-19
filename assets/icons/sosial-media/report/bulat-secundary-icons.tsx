import * as React from "react"
import Svg, { SvgProps, Circle } from "react-native-svg"
const BulatReportSecundaryIcons = (props: SvgProps) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        fill="none"
        {...props}
    >
        <Circle cx={10} cy={10} r={10} fill="#D3D3D3" />
    </Svg>
)
export default BulatReportSecundaryIcons
