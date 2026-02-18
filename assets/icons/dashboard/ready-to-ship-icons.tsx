import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
const ReadytoShipDashboardIcons = (props: SvgProps) => (
    <Svg
        width={16}
        height={16}
        fill="none"
        viewBox="0 0 16 16"
        {...props}
    >
        <G clipPath="url(#a)">
            <Path
                fill="#169953"
                d="M12.667 3.333h-1.334v-.666a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v10h1.36a2.31 2.31 0 0 0-.027.333A2.333 2.333 0 0 0 6 13a2.31 2.31 0 0 0-.027-.333h4.054c-.017.11-.026.221-.027.333a2.333 2.333 0 1 0 4.667 0 2.311 2.311 0 0 0-.028-.333H16v-6a3.338 3.338 0 0 0-3.333-3.334Zm0 1.334a2 2 0 0 1 2 2v.666h-3.334V4.667h1.334Zm-8 8.333a1 1 0 0 1-2 0c0-.114.021-.227.062-.333h1.876c.04.106.061.219.062.333ZM10 11.333H1.333V2.667A.667.667 0 0 1 2 2h7.333a.667.667 0 0 1 .667.667v8.666ZM13.333 13a1 1 0 1 1-2 0 .94.94 0 0 1 .062-.333h1.876a.94.94 0 0 1 .062.333Zm-2-1.667V8.667h3.334v2.666h-3.334Z"
            />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path fill="#fff" d="M0 0h16v16H0z" />
            </ClipPath>
        </Defs>
    </Svg>
)
export default ReadytoShipDashboardIcons
