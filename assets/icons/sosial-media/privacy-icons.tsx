import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const PrivacyIcons = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <Path
      fill="#6F6F6F"
      d="M14.25 6.25h-2.5V4.375a3.75 3.75 0 0 0-7.5 0V6.25h-2.5A1.25 1.25 0 0 0 .5 7.5v8.75a1.25 1.25 0 0 0 1.25 1.25h12.5a1.25 1.25 0 0 0 1.25-1.25V7.5a1.25 1.25 0 0 0-1.25-1.25ZM5.5 4.375a2.5 2.5 0 1 1 5 0V6.25h-5V4.375Zm8.75 11.875H1.75V7.5h12.5v8.75Z"
    />
  </Svg>
)
export default PrivacyIcons
