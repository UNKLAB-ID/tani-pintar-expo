import React from 'react';
import { OtpInput } from 'react-native-otp-entry';
import { View } from 'react-native';
import { Colors } from '@/constants/Colors';

interface OTPInputProps {
  value: string;
  onChange: (val: string) => void;
  numberOfDigits?: number;
  color?: string;
}

const OTPInput: React.FC<OTPInputProps> = ({
  onChange,
  numberOfDigits = 4,
  color = Colors.color.primary,
}) => {
  return (
    <View>
      <OtpInput
        numberOfDigits={numberOfDigits}
        onTextChange={onChange}
        focusColor={color}
        theme={{
          pinCodeContainerStyle: {
            borderRadius: 10,
            width: 77.5,
            height: 48,
            borderWidth: 1,
            marginHorizontal: 1,
          },
        }}
      />
    </View>
  );
};

export default OTPInput;
