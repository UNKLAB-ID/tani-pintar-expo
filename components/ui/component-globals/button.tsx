import { Colors } from '@/constants/Colors';
import React from 'react';
import { TouchableOpacity, Text, GestureResponderEvent, StyleSheet } from 'react-native';

interface CustomButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  className?: string;
  textClassName?: string;
  disabled?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  className = '',
  textClassName = '',
  disabled = false,
}) => {
 const borderColor = disabled? Colors.color.primary : Colors.color.border;

  return (
    <TouchableOpacity
      className={`w-full rounded-lg items-center ${className}`}
      style={[styles.input, { backgroundColor: borderColor }, ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text className={`text-white text-2xl font-bold ${textClassName}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    input: {
      borderRadius: 12,
    },
  });


export default CustomButton;
