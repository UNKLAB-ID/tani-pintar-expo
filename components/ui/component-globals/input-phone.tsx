import { Colors } from '@/constants/Colors';
import React, { useState } from 'react';
import { View, Text, TextInput, TextInputProps, Image, StyleSheet } from 'react-native';

interface PhoneInputProps extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  className?: string;
  error?: boolean;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChangeText,
  className = '',
  error = false,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const borderColor = error
    ? Colors.color.error
    : isFocused || value
      ? Colors.color.primary
      : Colors.color.border;

  return (
    <View className={`flex-row items-center py[16px] h-[48px] ${className} `} style={[styles.input, { borderColor }]}>
      <Image
        source={{ uri: 'https://flagcdn.com/w40/id.png' }}
        style={{ width: 24, height: 16, marginRight: 8 }}
        resizeMode="contain"
      />
      <Text className="text-xl text-black mr-2">+62</Text>
      <TextInput
        className="flex-1 text-xl text-black border-none"
        keyboardType="phone-pad"
        placeholder="812-xxxx-xxxx"
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
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

export default PhoneInput;
