import * as React from 'react';
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg';
const BoockmarkSave = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill="#1F1F1F"
        d="M18.959 22a2.567 2.567 0 0 1-1.822-.765L11.5 15.63l-5.638 5.608a2.567 2.567 0 0 1-2.837.559 2.566 2.566 0 0 1-1.608-2.406V4.583A4.583 4.583 0 0 1 6 0h11a4.583 4.583 0 0 1 4.583 4.583v14.808a2.567 2.567 0 0 1-1.605 2.406c-.323.134-.67.204-1.02.203ZM6 1.833a2.75 2.75 0 0 0-2.75 2.75v14.808a.773.773 0 0 0 1.317.55l6.291-6.252a.917.917 0 0 1 1.293 0l6.284 6.25a.772.772 0 0 0 1.317-.55V4.583a2.75 2.75 0 0 0-2.75-2.75H6Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M.5 0h22v22H.5z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default BoockmarkSave;
