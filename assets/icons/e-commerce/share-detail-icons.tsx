import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

interface IconProps extends SvgProps {
  size?: number;
  color?: string;
}

const Share2Icons: React.FC<IconProps> = ({
  size = 24, //
  color = '#7D7D7D',
  ...props
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      stroke={color}
      strokeWidth={2}
      d="M19.336 15.65a3.675 3.675 0 0 1 3.66 3.498l.004.188A3.676 3.676 0 0 1 19.312 23l-.188-.006a3.675 3.675 0 0 1-3.475-3.68v-.002c.004-.202.025-.404.062-.603l.143-.771-.029-.014.474-.686a3.676 3.676 0 0 1 2.81-1.583l.227-.006ZM1.987 9.474a3.644 3.644 0 0 1 5.152-.162l.488.458.06-.029.367.89a3.57 3.57 0 0 1-.004 2.722l-.37.892-.067-.03-.486.454a3.644 3.644 0 0 1-2.498.978l-.188-.005a3.644 3.644 0 0 1-3.437-3.465L1 11.99v-.008a3.646 3.646 0 0 1 .986-2.508h.001Zm15.234-7.826a3.655 3.655 0 0 1 4.973.776l.11.151a3.655 3.655 0 0 1-.775 4.974l-.151.11a3.655 3.655 0 0 1-5.084-.927l-.475-.686.034-.015-.146-.771a3.624 3.624 0 0 1-.044-.306l-.018-.31a3.655 3.655 0 0 1 1.395-2.863l.18-.133Z"
    />
  </Svg>
);

export default Share2Icons;
