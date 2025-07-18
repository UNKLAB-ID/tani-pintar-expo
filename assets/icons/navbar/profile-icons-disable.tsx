import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="#6F6F6F"
      d="M14.75 8a3.25 3.25 0 0 1-3.25 3.25v1.5A4.75 4.75 0 0 0 16.25 8h-1.5Zm-3.25 3.25A3.25 3.25 0 0 1 8.25 8h-1.5a4.75 4.75 0 0 0 4.75 4.75v-1.5ZM8.25 8a3.25 3.25 0 0 1 3.25-3.25v-1.5A4.75 4.75 0 0 0 6.75 8h1.5Zm3.25-3.25A3.25 3.25 0 0 1 14.75 8h1.5a4.75 4.75 0 0 0-4.75-4.75v1.5Zm-3 11h6v-1.5h-6v1.5ZM2.25 11a9.25 9.25 0 0 1 9.25-9.25V.25C5.563.25.75 5.063.75 11h1.5Zm9.25-9.25A9.25 9.25 0 0 1 20.75 11h1.5C22.25 5.063 17.437.25 11.5.25v1.5ZM20.75 11a9.22 9.22 0 0 1-2.846 6.675l1.038 1.082A10.721 10.721 0 0 0 22.25 11h-1.5Zm-2.846 6.675A9.216 9.216 0 0 1 11.5 20.25v1.5c2.888 0 5.512-1.14 7.442-2.993l-1.038-1.082ZM14.5 15.75a3.251 3.251 0 0 1 3.188 2.612l1.47-.292a4.751 4.751 0 0 0-4.658-3.82v1.5Zm-3 4.5a9.216 9.216 0 0 1-6.404-2.575l-1.038 1.082A10.717 10.717 0 0 0 11.5 21.75v-1.5Zm-6.404-2.575A9.221 9.221 0 0 1 2.25 11H.75c0 3.049 1.27 5.802 3.308 7.757l1.038-1.082ZM8.5 14.25a4.751 4.751 0 0 0-4.659 3.82l1.471.292A3.251 3.251 0 0 1 8.5 15.75v-1.5Z"
    />
  </Svg>
);
export default SvgComponent;
