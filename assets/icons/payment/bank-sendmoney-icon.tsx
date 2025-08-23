import * as React from 'react';
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg';
const BankSendMoneyIcon = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path fill="#fff" d="M3.804 18.854V9.426h17.143v9.428H3.804Z" />
      <Path
        fill="#D7FCE8"
        d="M22.506 9.427H2.244c-.96 0-1.372-1.045-.617-1.543L11.758 1.25a1.217 1.217 0 0 1 1.234 0l10.132 6.634c.754.498.343 1.543-.617 1.543ZM22.661 18.855H2.09a.857.857 0 0 0-.858.858v2.571a.857.857 0 0 0 .858.857H22.66a.857.857 0 0 0 .857-.857v-2.571a.857.857 0 0 0-.857-.858Z"
      />
      <Path
        stroke="#169953"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M22.506 9.427H2.244c-.96 0-1.372-1.045-.617-1.543L11.758 1.25a1.217 1.217 0 0 1 1.234 0l10.132 6.634c.754.498.343 1.543-.617 1.543ZM22.661 18.855H2.09a.857.857 0 0 0-.858.858v2.571a.857.857 0 0 0 .858.857H22.66a.857.857 0 0 0 .857-.857v-2.571a.857.857 0 0 0-.857-.858ZM3.804 9.426v9.428M9.518 9.426v9.428M15.232 9.426v9.428M20.947 9.426v9.428"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M.375 0h24v24h-24z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default BankSendMoneyIcon;
