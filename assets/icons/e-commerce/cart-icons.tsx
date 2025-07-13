import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

type IconProps = SvgProps & {
  size?: number;
  colorIcon?: string;
};

const CartIcons = ({ size = 24, color = '#525252', ...props }: IconProps) => (
  <Svg viewBox="0 0 30 30" width={size} height={size} {...props}>
    <Path
      fill={color}
      d="M27.756 5.557a1.037 1.037 0 0 0-.796-.372H6.05L5.262.852A1.037 1.037 0 0 0 4.242 0H1.037a1.037 1.037 0 0 0 0 2.074H3.37l3.313 18.184a3.11 3.11 0 0 0 .69 1.46 3.63 3.63 0 1 0 5.756 1.094h5.887a3.63 3.63 0 1 0 3.278-2.074H9.744a1.037 1.037 0 0 1-1.02-.851l-.412-2.26h15.036a3.11 3.11 0 0 0 3.06-2.554l1.576-8.666a1.037 1.037 0 0 0-.228-.85Zm-16.35 18.81a1.555 1.555 0 1 1-3.11 0 1.555 1.555 0 0 1 3.11 0Zm12.443 0a1.555 1.555 0 1 1-3.11 0 1.555 1.555 0 0 1 3.11 0Zm.519-9.665a1.038 1.038 0 0 1-1.024.852H7.935L6.428 7.258h19.289l-1.35 7.444Z"
    />
  </Svg>
);

export default CartIcons;
