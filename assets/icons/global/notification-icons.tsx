import * as React from 'react';
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg';

const NotificationIcons = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 18 18" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill={props.color || '#fff'}
        d="M16.916 10.246 15.491 5.12a6.991 6.991 0 0 0-13.559.355L.83 10.436A3.75 3.75 0 0 0 4.489 15h.836a3.75 3.75 0 0 0 7.35 0h.629a3.75 3.75 0 0 0 3.612-4.754ZM9 16.5A2.25 2.25 0 0 1 6.888 15h4.224A2.25 2.25 0 0 1 9 16.5Zm6.095-3.889a2.234 2.234 0 0 1-1.792.889H4.49a2.25 2.25 0 0 1-2.196-2.738L3.396 5.8a5.49 5.49 0 0 1 10.65-.28l1.425 5.128a2.231 2.231 0 0 1-.376 1.963Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h18v18H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default NotificationIcons;
