import * as React from 'react';
import Svg, { SvgProps, G, Mask, Path, Defs, ClipPath } from 'react-native-svg';

const TvInternetCategoryIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <G clipPath="url(#a)">
      <Mask
        id="b"
        width={29}
        height={29}
        x={0}
        y={0}
        maskUnits="userSpaceOnUse"
        style={{ maskType: 'luminance' }}
      >
        <Path fill="#fff" d="M29 0H0v29h29V0Z" />
      </Mask>

      <G mask="url(#b)">
        <Path
          fill="#2E3FFC"
          d="M20.802 2.418H7.329A5.337 5.337 0 0 0 2 7.747v8.096a5.33 5.33 0 0 0 5.329 5.328h4.64c.664 0 1.208.544 1.208 1.209v1.172c0 .664-.544 1.208-1.208 1.208H9.045a.913.913 0 0 0 0 1.825h10.09c.495 0 .905-.411.905-.907a.913.913 0 0 0-.906-.906H16.21a1.212 1.212 0 0 1-1.208-1.208v-1.172c0-.665.543-1.209 1.208-1.209h4.604a5.33 5.33 0 0 0 5.328-5.328V7.759c-.012-2.949-2.404-5.341-5.34-5.341Z"
        />

        <G clipPath="url(#c)">
          <Mask
            id="d"
            width={12}
            height={12}
            x={8}
            y={6}
            maskUnits="userSpaceOnUse"
            style={{ maskType: 'luminance' }}
          >
            <Path fill="#fff" d="M20 6H8v12h12V6Z" />
          </Mask>

          <G fill="#fff" mask="url(#d)">
            <Path d="M17.545 12.294a.368.368 0 0 1-.23-.08c-2.015-1.555-4.62-1.555-6.635 0a.378.378 0 0 1-.524-.065.378.378 0 0 1 .064-.525c2.295-1.775 5.26-1.775 7.55 0a.37.37 0 0 1 .065.525.347.347 0 0 1-.29.145Z" />
            <Path d="M19 10.554a.368.368 0 0 1-.23-.08c-2.9-2.24-6.645-2.24-9.54 0a.378.378 0 0 1-.525-.065.378.378 0 0 1 .065-.525c3.175-2.455 7.28-2.455 10.46 0a.37.37 0 0 1 .065.525.37.37 0 0 1-.295.145Z" />
            <Path d="M16.606 14.12a.368.368 0 0 1-.23-.08c-1.44-1.114-3.305-1.114-4.75 0a.378.378 0 0 1-.525-.064.378.378 0 0 1 .065-.525c1.72-1.33 3.945-1.33 5.665 0a.37.37 0 0 1 .065.525.36.36 0 0 1-.29.145Z" />
            <Path d="M15.3 15.948a.368.368 0 0 1-.23-.08 1.708 1.708 0 0 0-2.144 0 .378.378 0 0 1-.525-.065.378.378 0 0 1 .065-.525c.93-.72 2.13-.72 3.06 0a.37.37 0 0 1 .065.525.36.36 0 0 1-.29.145Z" />
          </G>
        </G>
      </G>
    </G>

    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h29v29H0z" />
      </ClipPath>
      <ClipPath id="c">
        <Path fill="#fff" d="M8 6h12v12H8z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default TvInternetCategoryIcon;
