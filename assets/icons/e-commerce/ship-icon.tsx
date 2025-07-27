import * as React from 'react';
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg';

const ShippingIcon = (props: SvgProps) => {
  const { color = '#169953', ...restProps } = props;

  return (
    <Svg fill="none" viewBox="0 0 20 20" {...restProps}>
      <G clipPath="url(#a)">
        <Path
          fill={color}
          d="M15.568 4.166h-1.544a4.444 4.444 0 0 0-2.094-2.752 1.25 1.25 0 1 0-1.238 2.17c.601.345.976.988.976 1.68v8.902H3.636c-.627 0-1.136-.51-1.136-1.136v-1.364h1.25a1.25 1.25 0 1 0 0-2.5h-2.5c-.69 0-1.25.56-1.25 1.25v2.614c0 1.612 1.06 2.966 2.517 3.441-.005.065-.017.129-.017.195a2.5 2.5 0 1 0 5 0h5a2.5 2.5 0 1 0 5 0c0-.067-.012-.13-.017-.195C18.938 15.996 20 14.641 20 13.03V8.56c0-2.423-1.988-4.394-4.432-4.394ZM17.5 8.561v.605h-3.333v-2.5h1.401c1.084 0 1.932.833 1.932 1.895Zm-1.136 5.605h-2.197v-2.5H17.5v1.364c0 .626-.51 1.136-1.136 1.136ZM0 2.083c0-.69.56-1.25 1.25-1.25h5.833a1.25 1.25 0 1 1 0 2.5H1.25c-.69 0-1.25-.56-1.25-1.25ZM0 6.25C0 5.559.56 5 1.25 5h4.167a1.25 1.25 0 1 1 0 2.5H1.25C.56 7.5 0 6.94 0 6.25Z"
        />
      </G>
      <Defs>
        <ClipPath id="a">
          <Path fill="#fff" d="M0 0h20v20H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default ShippingIcon;
