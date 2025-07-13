import * as React from 'react';
import Svg, { SvgProps, Rect, G, Path, Defs, ClipPath } from 'react-native-svg';
const SearchGrey = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Rect width={32} height={32} fill="#8D8D8D" rx={16} />
    <G clipPath="url(#a)">
      <Path
        fill="#fff"
        d="m23.805 22.862-3.98-3.98a6.677 6.677 0 1 0-.942.943l3.979 3.98a.667.667 0 0 0 .943-.943ZM14.666 20A5.333 5.333 0 1 1 20 14.667 5.339 5.339 0 0 1 14.666 20Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M8 8h16v16H8z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SearchGrey;
