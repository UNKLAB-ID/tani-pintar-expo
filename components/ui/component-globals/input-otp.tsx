import React, { useRef } from 'react';
import OTPTextInput from 'react-native-otp-textinput';
import { View, StyleSheet } from 'react-native';

interface OTPInputProps {
  value: string;
  onChange: (val: string) => void;
  numberOfDigits?: number;
}

const OTPInput: React.FC<OTPInputProps> = ({
  value,
  onChange,
  numberOfDigits = 4,
}) => {
  const otpRef = useRef<OTPTextInput>(null);

  return (
    <View>
      <OTPTextInput
        ref={otpRef}
        inputCount={numberOfDigits}
        handleTextChange={onChange}
        defaultValue={value}
        textInputStyle={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 10,
    width: 77.5,
    height: 48,
    borderBottomWidth: 1,
    borderLeftWidth:1,
    borderRightWidth:1,
    borderTopWidth:1,
    marginHorizontal: 1,
  },
});

export default OTPInput;
