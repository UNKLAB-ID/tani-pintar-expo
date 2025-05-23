import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const NotInterestedIcons = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <Path
      fill="#1F1F1F"
      d="M22.25 5a7.7 7.7 0 0 0-5.48 2.27l-.77.77-.77-.77A7.75 7.75 0 0 0 2 12.75c0 8.75 12.974 15.834 13.526 16.125a1 1 0 0 0 .948 0C17.026 28.584 30 21.5 30 12.75A7.759 7.759 0 0 0 22.25 5ZM16 26.85c-2.283-1.33-12-7.389-12-14.1a5.75 5.75 0 0 1 9.816-4.066l.77.77-1.293 1.296a1 1 0 0 0 0 1.414l3.066 3.066-2.067 2.065a1.001 1.001 0 0 0 1.415 1.415l2.773-2.774a1 1 0 0 0 0-1.413l-3.066-3.07 2.77-2.77A5.75 5.75 0 0 1 28 12.75c0 6.701-9.72 12.769-12 14.1Z"
    />
  </Svg>
)
export default NotInterestedIcons