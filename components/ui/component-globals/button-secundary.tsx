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
}

const CustomButtonSecundary: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  className = '',
  textClassName = '',
  disabled = false,
}) => {
  const borderColor = disabled ? Colors.color.border : '#fff';

  return (
    <TouchableOpacity
      className={`w-full rounded-lg items-center ${className}`}
      style={[
        styles.button,
        {
          backgroundColor: borderColor,
          borderWidth: 1,
          borderColor: '#169953',
        },
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text className={`text-primary text-xl font-bold ${textClassName}`}>
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
