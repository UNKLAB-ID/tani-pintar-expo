import * as React from "react"
import Svg, {
  SvgProps,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg"
const ReportIconsHeader = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <Path
      fill="url(#a)"
      d="m32.596 16.576 2.808 2.85L23.818 30.84A3.963 3.963 0 0 1 21.004 32c-1.022 0-2.05-.39-2.832-1.17l-5.564-5.392 2.786-2.874 5.586 5.414 11.616-11.402ZM48 24c0 13.234-10.766 24-24 24S0 37.234 0 24 10.766 0 24 0s24 10.766 24 24Zm-4 0c0-11.028-8.972-20-20-20S4 12.972 4 24s8.972 20 20 20 20-8.972 20-20Z"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={55.5}
        x2={11}
        y1={16.5}
        y2={52.5}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.195} stopColor="#4FEA96" />
        <Stop offset={0.515} stopColor="#21E079" />
      </LinearGradient>
    </Defs>
  </Svg>
)
export default ReportIconsHeader
