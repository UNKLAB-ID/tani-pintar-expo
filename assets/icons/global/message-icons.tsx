import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const MessageIcons = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <Path
      fill={props.color || '#525252'}
      d="M13.313 12a1.313 1.313 0 1 1-2.626 0 1.313 1.313 0 0 1 2.626 0Zm-6.126-1.313a1.313 1.313 0 1 0 0 2.626 1.313 1.313 0 0 0 0-2.626Zm9.625 0a1.313 1.313 0 1 0 0 2.626 1.313 1.313 0 0 0 0-2.626ZM23.375 12A11.375 11.375 0 0 1 6.654 22.043L2.93 23.284A1.75 1.75 0 0 1 .716 21.07l1.241-3.724A11.375 11.375 0 1 1 23.375 12Zm-1.75 0a9.625 9.625 0 1 0-17.958 4.819.875.875 0 0 1 .072.715l-1.364 4.091 4.09-1.364a.86.86 0 0 1 .715.072A9.626 9.626 0 0 0 21.625 12Z"
    />
  </Svg>
);

export default MessageIcons;
