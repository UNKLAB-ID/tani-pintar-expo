import * as React from 'react';
import Svg, { SvgProps, G, Path, Mask, Defs, ClipPath } from 'react-native-svg';
const EnglishIcon = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path fill="#fff" d="M0 .5h20v15H0z" />
      <Path
        fill="#2E42A5"
        fillRule="evenodd"
        d="M0 .5v15h20V.5H0Z"
        clipRule="evenodd"
      />
      <Mask
        id="b"
        width={20}
        height={16}
        x={0}
        y={0}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: 'luminance',
        }}
      >
        <Path
          fill="#fff"
          fillRule="evenodd"
          d="M0 .5v15h20V.5H0Z"
          clipRule="evenodd"
        />
      </Mask>
      <G mask="url(#b)">
        <Path
          fill="#fff"
          d="m-2.228 14.429 4.402 1.861L20.099 2.524l2.322-2.766-4.706-.622-7.312 5.932-5.885 3.997-6.746 5.364Z"
        />
        <Path
          fill="#F50100"
          d="m-1.625 15.732 2.242 1.08L21.587-.498H18.44L-1.625 15.732Z"
        />
        <Path
          fill="#fff"
          d="m22.227 14.429-4.401 1.861L-.1 2.524-2.422-.242l4.707-.622 7.311 5.932 5.885 3.997 6.746 5.364Z"
        />
        <Path
          fill="#F50100"
          d="m22.076 15.364-2.242 1.08-8.93-7.412-2.647-.828L-2.645-.233H.503L11.4 8.004l2.894.993 7.782 6.367Z"
        />
        <Mask id="c" fill="#fff">
          <Path d="M12.36 5.5h8.907v5H12.36v6.25H7.64V10.5h-8.872v-5h8.872V-.75h4.721V5.5Z" />
        </Mask>
        <Path
          fill="#F50100"
          d="M12.36 5.5h8.907v5H12.36v6.25H7.64V10.5h-8.872v-5h8.872V-.75h4.721V5.5Z"
        />
        <Path
          fill="#fff"
          d="M12.36 5.5h-1.25v1.25h1.25V5.5Zm8.907 0h1.25V4.25h-1.25V5.5Zm0 5v1.25h1.25V10.5h-1.25Zm-8.907 0V9.25h-1.25v1.25h1.25Zm0 6.25V18h1.25v-1.25h-1.25Zm-4.721 0h-1.25V18h1.25v-1.25Zm0-6.25h1.25V9.25h-1.25v1.25Zm-8.872 0h-1.25v1.25h1.25V10.5Zm0-5V4.25h-1.25V5.5h1.25Zm8.872 0v1.25h1.25V5.5h-1.25Zm0-6.25V-2h-1.25v1.25h1.25Zm4.721 0h1.25V-2h-1.25v1.25Zm0 6.25v1.25h8.907v-2.5H12.36V5.5Zm8.907 0h-1.25v5h2.5v-5h-1.25Zm0 5V9.25H12.36v2.5h8.907V10.5Zm-8.907 0h-1.25v6.25h2.5V10.5h-1.25Zm0 6.25V15.5H7.64V18h4.721v-1.25Zm-4.721 0h1.25V10.5h-2.5v6.25h1.25Zm0-6.25V9.25h-8.872v2.5h8.872V10.5Zm-8.872 0h1.25v-5h-2.5v5h1.25Zm0-5v1.25h8.872v-2.5h-8.872V5.5Zm8.872 0h1.25V-.75h-2.5V5.5h1.25Zm0-6.25V.5h4.721V-2H7.64v1.25Zm4.721 0h-1.25V5.5h2.5V-.75h-1.25Z"
          mask="url(#c)"
        />
      </G>
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 .5h20v15H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default EnglishIcon;
