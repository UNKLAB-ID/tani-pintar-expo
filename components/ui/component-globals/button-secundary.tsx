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
  rounded?: number;
  fontSize?: number;
  color?: string;
}

const CustomButtonSecundary: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  className = '',
  textClassName = '',
  disabled = false,
  rounded = 12,
  fontSize = 14,
  color = '#169953',
}) => {
  const borderColor = disabled ? Colors.color.border : '#fff';

  return (
    <TouchableOpacity
      className={`w-full items-center ${className}`}
      style={[
        styles.button,
        {
          backgroundColor: borderColor,
          borderWidth: 1,
          borderColor: color,
          borderRadius: rounded,
        },
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        className={`font-bold ${textClassName}`}
        style={{ fontSize: fontSize, color: color }}
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

export default CustomButtonSecundary;
