import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
const FileUpladIcons
    = (props: SvgProps) => (
        <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
            <G clipPath="url(#a)">
                <Path
                    fill={props.color}
                    d="M16.334 8.184V.553a8.14 8.14 0 0 1 2.875 1.855l4.065 4.067c.83.83 1.453 1.81 1.856 2.875H17.5a1.167 1.167 0 0 1-1.166-1.166Zm9.305 3.5H17.5c-1.93 0-3.5-1.57-3.5-3.5V.044c-.188-.012-.376-.028-.566-.028H8.167a5.842 5.842 0 0 0-5.833 5.835v16.333a5.84 5.84 0 0 0 5.833 5.833h11.667a5.84 5.84 0 0 0 5.833-5.833V12.25c0-.19-.015-.378-.028-.566Zm-7.314 8.027a1.163 1.163 0 0 1-1.65 0l-1.508-1.509v5.131a1.167 1.167 0 0 1-2.333 0v-5.13l-1.509 1.508a1.165 1.165 0 1 1-1.65-1.65l1.883-1.883a3.459 3.459 0 0 1 4.885 0l1.883 1.883a1.166 1.166 0 0 1 0 1.65h-.001Z"
                />
            </G>
            <Defs>
                <ClipPath id="a">
                    <Path fill="#fff" d="M0 0h28v28H0z" />
                </ClipPath>
            </Defs>
        </Svg>
    )
export default FileUpladIcons
