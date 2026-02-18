import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const SeeMoneyIcons = (props: SvgProps) => (
    <Svg
        width={22}
        height={17}
        fill="none"
        viewBox="0 0 22 17"
        {...props}
    >
        <Path
            fill="#fff"
            d="M21.836 7.5C21.03 5.74 17.875 0 11 0S.969 5.74.164 7.5a1.805 1.805 0 0 0 0 1.503C.969 10.76 4.124 16.5 11 16.5c6.875 0 10.031-5.74 10.836-7.5a1.804 1.804 0 0 0 0-1.5ZM11 14.666c-5.782 0-8.48-4.92-9.167-6.407C2.521 6.752 5.218 1.833 11 1.833c5.767 0 8.466 4.898 9.166 6.417-.7 1.519-3.399 6.417-9.166 6.417Z"
        />
        <Path
            fill="#fff"
            d="M11 3.667a4.583 4.583 0 1 0 0 9.166 4.583 4.583 0 0 0 0-9.166ZM11 11a2.75 2.75 0 1 1 0-5.5 2.75 2.75 0 0 1 0 5.5Z"
        />
    </Svg>
)
export default SeeMoneyIcons
