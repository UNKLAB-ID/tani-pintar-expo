import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
const ExclamtionMarkDashboardIcons = (props: SvgProps) => (
    <Svg
        width={18}
        height={18}
        viewBox="0 0 18 18"
        fill="none"
        {...props}
    >
        <G fill="#AAA" clipPath="url(#a)">
            <Path d="M9 18a9 9 0 1 1 9-9 9.01 9.01 0 0 1-9 9ZM9 1.5A7.5 7.5 0 1 0 16.5 9 7.509 7.509 0 0 0 9 1.5Z" />
            <Path d="M9.75 3.75h-1.5v7.5h1.5v-7.5ZM9.75 12.75h-1.5v1.5h1.5v-1.5Z" />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path fill="#fff" d="M0 0h18v18H0z" />
            </ClipPath>
        </Defs>
    </Svg>
)
export default ExclamtionMarkDashboardIcons
