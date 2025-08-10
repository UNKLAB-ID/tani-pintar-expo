import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const BintangIcons = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 12 12"
    {...props}
  >
    <Path
      fill="#FCB72E"
      d="m7.007 1.009 1.027 2.07c.14.288.513.565.828.617l1.86.312c1.19.2 1.47 1.07.613 1.93L9.888 7.395c-.245.247-.379.723-.303 1.064L10 10.265c.327 1.43-.426 1.982-1.68 1.235l-1.743-1.04c-.315-.189-.835-.189-1.155 0L3.677 11.5c-1.249.747-2.007.189-1.68-1.235L2.41 8.46c.076-.341-.058-.817-.303-1.064L.66 5.937c-.851-.858-.577-1.729.613-1.929l1.86-.312c.31-.052.683-.329.823-.617l1.026-2.07c.56-1.123 1.47-1.123 2.024 0Z"
    />
  </Svg>
);
export default BintangIcons;
