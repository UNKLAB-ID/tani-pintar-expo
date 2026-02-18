import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
const MessageDashboardIcons = (props: SvgProps) => (
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
                d="M12.667 2.667h-.734A3.34 3.34 0 0 0 8.667 0H3.333A3.337 3.337 0 0 0 0 3.333v8.57a1.43 1.43 0 0 0 1.433 1.432c.277 0 .554-.08.793-.24l1.967-1.311A3.34 3.34 0 0 0 7.333 14h3.798l2.643 1.762a1.428 1.428 0 0 0 1.47.07c.467-.25.756-.733.756-1.263V6a3.337 3.337 0 0 0-3.333-3.333Zm-11.18 9.319c-.013.008-.05.032-.102.005-.052-.028-.052-.073-.052-.088v-8.57c0-1.102.897-2 2-2h5.333c1.103 0 2 .898 2 2V8c0 1.103-.897 2-2 2h-4c-.218 0-.36.106-.377.117l-2.802 1.869Zm13.18 2.584c0 .014 0 .06-.053.087a.091.091 0 0 1-.1-.004l-2.81-1.874a.668.668 0 0 0-.37-.112h-4c-.87 0-1.61-.558-1.886-1.334h3.219A3.337 3.337 0 0 0 12 8V4h.667c1.102 0 2 .897 2 2v8.57Z"
            />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path fill="#fff" d="M0 0h16v16H0z" />
            </ClipPath>
        </Defs>
    </Svg>
)
export default MessageDashboardIcons
