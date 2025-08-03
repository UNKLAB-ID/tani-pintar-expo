import * as React from 'react';
import Svg, { SvgProps, G, Path, Defs } from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: filter */
const GoogleIcon = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <G filter="url(#a)">
      <Path
        fill="#fff"
        d="M28 7.75A3.75 3.75 0 0 0 24.25 4H7.75A3.75 3.75 0 0 0 4 7.75v16.5A3.75 3.75 0 0 0 7.75 28h16.5A3.75 3.75 0 0 0 28 24.25V7.75Z"
      />
      <Path
        fill="#4285F4"
        fillRule="evenodd"
        d="M21.873 16.137c0-.426-.038-.835-.109-1.228h-5.65v2.321h3.228a2.76 2.76 0 0 1-1.197 1.811v1.506h1.94c1.134-1.045 1.788-2.583 1.788-4.41Z"
        clipRule="evenodd"
      />
      <Path
        fill="#34A853"
        fillRule="evenodd"
        d="M16.112 22c1.62 0 2.978-.538 3.97-1.454l-1.938-1.505c-.538.36-1.225.572-2.032.572-1.563 0-2.886-1.055-3.357-2.473H10.75v1.554A5.998 5.998 0 0 0 16.112 22Z"
        clipRule="evenodd"
      />
      <Path
        fill="#FBBC05"
        fillRule="evenodd"
        d="M12.756 17.14a3.606 3.606 0 0 1-.188-1.14c0-.395.068-.78.188-1.14v-1.554h-2.005a5.997 5.997 0 0 0 0 5.389l2.005-1.555Z"
        clipRule="evenodd"
      />
      <Path
        fill="#EA4335"
        fillRule="evenodd"
        d="M16.112 12.386c.88 0 1.672.303 2.294.898l1.72-1.721C19.087 10.594 17.73 10 16.112 10a5.998 5.998 0 0 0-5.362 3.306l2.005 1.554c.471-1.418 1.794-2.474 3.357-2.474Z"
        clipRule="evenodd"
      />
    </G>
    <Defs></Defs>
  </Svg>
);
export default GoogleIcon;
