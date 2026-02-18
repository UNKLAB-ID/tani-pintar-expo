import * as React from 'react';
import Svg, { SvgProps, Mask, Path, G } from 'react-native-svg';
const BPJSCategoryIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Mask
      id="a"
      width={29}
      height={29}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'luminance',
      }}
    >
      <Path fill="#fff" d="M29 0H0v29h29V0Z" />
    </Mask>
    <G fill="#169953" mask="url(#a)">
      <Path d="M26.584 25.68H2.417a.913.913 0 0 0-.906.906c0 .495.41.906.906.906h24.167c.495 0 .906-.41.906-.906a.913.913 0 0 0-.906-.906Z" />
      <Path d="M20.542 2.418H8.458c-3.625 0-4.833 2.163-4.833 4.833v19.334h7.25v-7.323c0-.628.508-1.136 1.136-1.136H17c.616 0 1.136.508 1.136 1.136v7.323h7.25V7.25c-.012-2.67-1.22-4.833-4.845-4.833Zm-3.021 8.76h-2.115v2.115c0 .495-.41.906-.906.906a.913.913 0 0 1-.906-.906v-2.115h-2.115a.913.913 0 0 1-.906-.906c0-.495.41-.906.906-.906h2.115V7.25c0-.495.41-.906.906-.906.495 0 .906.41.906.906v2.115h2.115c.495 0 .906.41.906.906 0 .496-.41.906-.906.906Z" />
    </G>
  </Svg>
);
export default BPJSCategoryIcon;
