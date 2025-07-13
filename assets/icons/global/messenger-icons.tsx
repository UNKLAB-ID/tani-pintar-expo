import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const MessengerIcons = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <Path
      fill="#525252"
      fillRule="evenodd"
      d="M10 0C4.367 0 0 4.127 0 9.7c0 2.915 1.195 5.435 3.14 7.175.164.146.262.35.27.57l.054 1.778a.8.8 0 0 0 1.123.708l1.985-.876a.801.801 0 0 1 .534-.04c.912.252 1.882.385 2.894.385 5.633 0 10-4.127 10-9.7C20 4.127 15.633 0 10 0Zm6.005 7.463-2.937 4.661a1.5 1.5 0 0 1-2.17.4l-2.336-1.752a.599.599 0 0 0-.723.002l-3.156 2.394c-.42.32-.97-.184-.689-.631l2.938-4.661a1.5 1.5 0 0 1 2.169-.4l2.336 1.752c.215.161.51.16.723-.002l3.156-2.394c.421-.32.97.184.689.631Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default MessengerIcons
