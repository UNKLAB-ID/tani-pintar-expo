import * as React from 'react';
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg';
const BookIcon = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill="#6F6F6F"
        d="M19.102 1.417a2.489 2.489 0 0 0-2.049-.54l-5.15.936A3.328 3.328 0 0 0 10 2.884 3.328 3.328 0 0 0 8.097 1.81L2.947.874A2.5 2.5 0 0 0 0 3.334v14.028l10 1.819 10-1.82V3.334a2.493 2.493 0 0 0-.898-1.916ZM9.167 17.333l-7.5-1.361V3.333a.833.833 0 0 1 .982-.819l5.15.936a1.667 1.667 0 0 1 1.368 1.64v12.243Zm9.166-1.363-7.5 1.363V5.09a1.667 1.667 0 0 1 1.369-1.64l5.149-.936a.833.833 0 0 1 .982.82V15.97Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h20v20H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default BookIcon;
