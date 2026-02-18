import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
const CreateProductIcons = (props: SvgProps) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        fill="none"
        {...props}
    >
        <G clipPath="url(#a)">
            <Path
                fill="#525252"
                d="M19 0H5a5.006 5.006 0 0 0-5 5v14a5.006 5.006 0 0 0 5 5h14a5.006 5.006 0 0 0 5-5V5a5.006 5.006 0 0 0-5-5Zm3 5h-7V2h4a3 3 0 0 1 3 3ZM11 2h2v5a1 1 0 0 1-2 0V2ZM5 2h4v3H2a3 3 0 0 1 3-3Zm14 20H5a3 3 0 0 1-3-3V7h7a3 3 0 1 0 6 0h7v12a3 3 0 0 1-3 3Zm1-3a1 1 0 0 1-1 1h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 1 1Z"
            />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path fill="#fff" d="M0 0h24v24H0z" />
            </ClipPath>
        </Defs>
    </Svg>
)
export default CreateProductIcons
