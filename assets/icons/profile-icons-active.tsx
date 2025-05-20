import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const ProfileImageActive = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="#169953"
      fillRule="evenodd"
      d="M0 10C0 4.477 4.477 0 10 0s10 4.477 10 10a9.973 9.973 0 0 1-3.077 7.216A9.969 9.969 0 0 1 10 20a9.969 9.969 0 0 1-6.923-2.784A9.973 9.973 0 0 1 0 10Zm15.659 6.482a3.025 3.025 0 0 0-2.868-2.063H7.209a3.025 3.025 0 0 0-2.868 2.063A8.57 8.57 0 0 0 10 18.605c2.167 0 4.146-.8 5.659-2.123ZM10 2.791a4.419 4.419 0 1 0 0 8.837 4.419 4.419 0 0 0 0-8.837Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default ProfileImageActive;
