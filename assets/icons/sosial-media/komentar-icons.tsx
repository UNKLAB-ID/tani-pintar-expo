import * as React from 'react';
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg';
const KomentarIcons = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <G fill="#434343" clipPath="url(#a)">
      <Path d="M15 0H3a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h2.175l3.338 2.822a.75.75 0 0 0 .97 0L12.824 15H15a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3Zm1.5 12a1.5 1.5 0 0 1-1.5 1.5h-2.175a1.5 1.5 0 0 0-.968.355L9 16.267l-2.855-2.412a1.5 1.5 0 0 0-.97-.355H3A1.5 1.5 0 0 1 1.5 12V3A1.5 1.5 0 0 1 3 1.5h12A1.5 1.5 0 0 1 16.5 3v9Z" />
      <Path d="M5.25 5.25H9a.75.75 0 0 0 0-1.5H5.25a.75.75 0 0 0 0 1.5ZM12.75 6.75h-7.5a.75.75 0 0 0 0 1.5h7.5a.75.75 0 1 0 0-1.5ZM12.75 9.75h-7.5a.75.75 0 0 0 0 1.5h7.5a.75.75 0 1 0 0-1.5Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h18v18H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default KomentarIcons;
