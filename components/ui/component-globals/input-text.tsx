import { Colors } from '@/constants/Colors';
import React, { useState } from 'react';
import {
  TextInput,
  TextInputProps,
  View,
  Text,
  KeyboardTypeOptions,
  StyleSheet,
  TextStyle,
} from 'react-native';

interface CustomTextInputProps extends TextInputProps {
  label?: string;
  value: string;
  className?: string;
  type?: KeyboardTypeOptions;
  onChangeText?: (text: string) => void;
  error?: boolean;
  labelColor?: string;
  fontSize?: number;
  fontWheight?: TextStyle['fontWeight'];
  required?: string;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  label,
  value,
  className = '',
  type = 'default',
  error = false,
  onChangeText,
  labelColor = '#1F1F1F',
  fontSize = 14,
  fontWheight = '500',
  required,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const borderColor = error
    ? Colors.color.error
    : isFocused || value
      ? Colors.color.primary
      : Colors.color.border;

  return (
    <View>
      {label && (
        <Text
          className={`mb-1`}
          style={{
            fontWeight: fontWheight,
            fontSize: fontSize,
            color: labelColor,
          }}
        >
          {label}
          {required && (
            <Text style={{ color: Colors.color.error }}>{required}</Text>
          )}
        </Text>
      )}
      <TextInput
        placeholder={props.placeholder}
        keyboardType={type}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`w-full py-[16px] px-[20px] border bg-white ${className}`}
        style={[styles.input, { borderColor, fontSize: fontSize }]}
        placeholderTextColor={Colors.color.border}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 12,
  },
});

export default CustomTextInput;
