import * as React from 'react';
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg';

const WalletSendMoneyIcon = (props: SvgProps) => (
  <Svg
    viewBox="0 0 24 24" // ✅ bikin responsive
    width={props.width || 24}
    height={props.height || 24}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        fill="#169953"
        d="M21.042 6h-16a3.012 3.012 0 0 1-2.235-.999A2.995 2.995 0 0 1 5.042 4h18c1.308-.006 1.307-1.995 0-2h-18a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h16a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3Zm-1 9c-1.308-.006-1.308-1.994 0-2 1.308.006 1.308 1.994 0 2Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M.042 0h24v24h-24z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default WalletSendMoneyIcon;
