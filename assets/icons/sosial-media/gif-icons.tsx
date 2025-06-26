import * as React from 'react';
import Svg, { SvgProps, Rect, Path } from 'react-native-svg';
const GifIcons = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <Rect width={27.25} height={27} x={0.5} y={0.5} fill="#EBD7FC" rx={3.5} />
    <Rect width={27.25} height={27} x={0.5} y={0.5} stroke="#5C1699" rx={3.5} />
    <Path
      fill="#7F1699"
      d="M15.25 8.75v10.5a.75.75 0 1 1-1.5 0V8.75a.75.75 0 1 1 1.5 0ZM23.5 8h-5.25a.75.75 0 0 0-.75.75v10.5a.75.75 0 1 0 1.5 0v-4.5h3.75a.75.75 0 1 0 0-1.5H19V9.5h4.5a.75.75 0 1 0 0-1.5Zm-12.75 5.25H8.5a.75.75 0 1 0 0 1.5H10v1.5a2.25 2.25 0 0 1-4.5 0v-4.5A2.25 2.25 0 0 1 7.75 9.5c1.05 0 2.026.726 2.273 1.688a.75.75 0 0 0 1.454-.376C11.057 9.184 9.49 8 7.75 8A3.75 3.75 0 0 0 4 11.75v4.5a3.75 3.75 0 0 0 7.5 0V14a.75.75 0 0 0-.75-.75Z"
    />
  </Svg>
);
export default GifIcons;
