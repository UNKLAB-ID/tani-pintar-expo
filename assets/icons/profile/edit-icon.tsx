import * as React from 'react';
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg';
const EditAddressIcon = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill="#169953"
        d="M15.833 15.833a.833.833 0 0 1 .098 1.661l-.098.006H10a.833.833 0 0 1-.098-1.66l.098-.007h5.833ZM13.413 3.64a2.083 2.083 0 0 1 3.048 2.838l-.102.108-9.08 9.08c-.08.08-.17.149-.267.204l-.1.05-3.17 1.442c-.673.306-1.365-.348-1.137-1.021l.033-.084 1.442-3.17c.046-.102.106-.198.177-.284l.075-.083 9.081-9.08Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h20v20H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default EditAddressIcon;
