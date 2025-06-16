import * as React from 'react';
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg';
const UndoPostIcons = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill="#000"
        d="M11 0C8.27 0 5.664 1.018 3.667 2.802V0H1.833v4.583c0 1.011.823 1.834 1.834 1.834H8.25V4.583H4.455A9.183 9.183 0 0 1 11 1.833c5.055 0 9.167 4.112 9.167 9.167S16.054 20.167 11 20.167c-5.054 0-9.167-4.113-9.167-9.167H0c0 6.066 4.934 11 11 11s11-4.934 11-11S17.066 0 11 0Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h22v22H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default UndoPostIcons;
