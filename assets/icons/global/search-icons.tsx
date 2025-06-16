import * as React from 'react';
import Svg, { SvgProps, Circle, Path } from 'react-native-svg';

interface SearchIconPrimaryProps extends SvgProps {
  color?: string;
}

const SearchIconPrimary: React.FC<SearchIconPrimaryProps> = ({
  color = '#000', // default hitam
  ...props
}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Circle
      cx={10.998}
      cy={10.789}
      r={8.039}
      stroke={color}
      strokeLinecap="square"
      strokeWidth={1.5}
    />
    <Path
      stroke={color}
      strokeLinecap="square"
      strokeWidth={1.5}
      d="m16.487 16.708 4.554 4.542"
    />
  </Svg>
);

export default SearchIconPrimary;
