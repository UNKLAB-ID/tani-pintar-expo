import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
const CopyLinkIcons = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <G fill="#1F1F1F" clipPath="url(#a)">
      <Path d="M11.537 14.39 8.82 17.107a4.19 4.19 0 0 1-5.926-5.925l2.719-2.72a.833.833 0 0 0-1.18-1.179l-2.717 2.721A5.857 5.857 0 1 0 10 18.286l2.718-2.718a.833.833 0 0 0-1.178-1.179h-.003ZM18.287 1.718A5.815 5.815 0 0 0 14.146 0a5.82 5.82 0 0 0-4.14 1.714l-2.723 2.72a.834.834 0 1 0 1.179 1.179l2.72-2.719a4.16 4.16 0 0 1 2.962-1.227 4.19 4.19 0 0 1 2.962 7.152l-2.718 2.718a.834.834 0 0 0 1.179 1.18L18.285 10a5.864 5.864 0 0 0 .002-8.282Z" />
      <Path d="m11.91 6.91-5 5a.833.833 0 1 0 1.18 1.179l5-5a.833.833 0 0 0-1.18-1.178Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h20v20H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default CopyLinkIcons
