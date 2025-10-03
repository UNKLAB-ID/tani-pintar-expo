import React from 'react';
import { View, Text, TextInput } from 'react-native';

interface DescriptionInputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  maxLength?: number;
  className?: string;
  minHeight?: number;
}

const DescriptionInput: React.FC<DescriptionInputProps> = ({
  label = 'Tell us about your shopping experience (max. 50 characters!)',
  placeholder = 'Tell us about the quality, delivery, or service of the seller.',
  value,
  onChangeText,
  maxLength = 50,
  className = '',
  minHeight = 80,
}) => {
  return (
    <View className={`bg-white p-4 ${className}`}>
      {/* Label */}
      <Text className="text-black font-medium mb-2">{label}</Text>

      {/* Input Box */}
      <View className="border border-gray-300 rounded-xl">
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          maxLength={maxLength}
          multiline
          className="p-3 text-sm text-black"
          style={{ minHeight, textAlignVertical: 'top' }}
        />

        {/* Character Counter */}
        <Text className="text-right text-gray-400 text-xs pr-3 pb-2 mr-4">
          {value.length} Characters
        </Text>
      </View>
    </View>
  );
};

export default DescriptionInput;
