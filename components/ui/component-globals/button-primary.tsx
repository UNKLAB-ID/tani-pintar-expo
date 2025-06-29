import { Colors } from '@/constants/Colors';
import React from 'react';
import {
  TouchableOpacity,
  Text,
  GestureResponderEvent,
  StyleSheet,
} from 'react-native';

interface CustomButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  className?: string;
  textClassName?: string;
  disabled?: boolean;
  fontSize?: number;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  className = '',
  textClassName = '',
  disabled = false,
  fontSize = 14,
}) => {
  const borderColor = disabled ? Colors.color.border : Colors.color.primary;

  return (
    <TouchableOpacity
      className={`w-full rounded-lg items-center ${className}`}
      style={[styles.button, { backgroundColor: borderColor }]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        className={`text-white font-bold ${textClassName}`}
        style={{ fontSize: 14 }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
  },
});

export default CustomButton;
