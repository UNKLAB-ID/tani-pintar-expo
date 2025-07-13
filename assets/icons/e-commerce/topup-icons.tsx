import * as React from 'react';
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg';
const TopUpIcons = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <G fill="#169953" clipPath="url(#a)">
      <Path d="M16.917 8.167h-5.834a1.75 1.75 0 1 0 0 3.5h5.834a1.75 1.75 0 1 0 0-3.5ZM14.584 14h-3.5a1.75 1.75 0 0 0 0 3.5h3.5a1.75 1.75 0 0 0 0-3.5Z" />
      <Path d="M18.083 0H9.917A6.424 6.424 0 0 0 3.5 6.417V26.25a1.75 1.75 0 0 0 2.533 1.566L9.862 25.9l3.267 1.867a1.75 1.75 0 0 0 1.736 0L18.13 25.9l3.83 1.916A1.75 1.75 0 0 0 24.5 26.25V6.417A6.424 6.424 0 0 0 18.083 0ZM21 23.419l-2.135-1.068a1.749 1.749 0 0 0-1.65.046L14 24.233 10.786 22.4a1.749 1.749 0 0 0-1.651-.045L7 23.419V6.417A2.917 2.917 0 0 1 9.917 3.5h8.166A2.917 2.917 0 0 1 21 6.417v17.002Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h28v28H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default TopUpIcons;
