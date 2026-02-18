import * as React from 'react';
import Svg, { SvgProps, Mask, Path, G } from 'react-native-svg';
const EmoneyCategoryIcon = (props: SvgProps) => (
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
    <G mask="url(#a)">
      <Path
        fill="#FF0808"
        d="M20.542 4.23H8.459c-3.625 0-6.042 1.813-6.042 6.042v8.458c0 4.23 2.417 6.042 6.042 6.042h12.083c3.625 0 6.042-1.812 6.042-6.041v-8.459c0-4.229-2.417-6.042-6.042-6.042ZM7.552 17.522c0 .496-.41.906-.906.906a.913.913 0 0 1-.906-.906v-6.041c0-.496.41-.907.906-.907.496 0 .906.411.906.906v6.042Zm6.948.604a3.62 3.62 0 0 1-3.625-3.625 3.62 3.62 0 0 1 3.625-3.625 3.62 3.62 0 0 1 3.625 3.625 3.62 3.62 0 0 1-3.625 3.625Zm8.76-.604c0 .496-.41.906-.905.906a.913.913 0 0 1-.907-.906v-6.041c0-.496.411-.907.907-.907.495 0 .906.411.906.906v6.042Z"
      />
    </G>
  </Svg>
);
export default EmoneyCategoryIcon;
