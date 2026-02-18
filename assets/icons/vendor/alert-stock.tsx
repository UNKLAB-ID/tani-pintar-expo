import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

interface AlertStockVendorIconsProps extends SvgProps {
    width?: number;
    height?: number;
}

const AlertStockVendorIcons = ({ width = 24, height = 24, ...props }: AlertStockVendorIconsProps) => (
    <Svg
        width={width}
        height={height}
        viewBox="0 0 16 16"
        fill="none"
        {...props}
    >
        <G clipPath="url(#a)">
            <Path
                fill="#FF3939"
                d="M15.44 6.582 9.415.556c-.756-.755-2.073-.755-2.828 0L.559 6.582c-.78.78-.78 2.049 0 2.829l6.026 6.026c.378.377.88.586 1.415.586.534 0 1.036-.208 1.414-.586L15.44 9.41c.78-.78.78-2.049 0-2.829Zm-.942 1.886L8.47 14.494a.68.68 0 0 1-.943 0L1.502 8.468a.668.668 0 0 1 0-.943l6.026-6.026a.68.68 0 0 1 .943 0l6.027 6.026c.26.26.26.682 0 .943Zm-7.165 2.199h1.333V12H7.333v-1.333Zm0-6.667h1.333v5.333H7.333V4Z"
            />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path fill="#fff" d="M0 0h16v16H0z" />
            </ClipPath>
        </Defs>
    </Svg>
)
export default AlertStockVendorIcons

