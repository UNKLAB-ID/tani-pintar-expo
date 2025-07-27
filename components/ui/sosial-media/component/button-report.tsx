import ContinueReportIcons from '@/assets/icons/sosial-media/report/continue-report';
import React from 'react';
import { View, TouchableOpacity, Text, TextStyle } from 'react-native';

interface ButtonReportProps {
  onPress?: () => void;
  title: string;
  disable?: boolean;
  fontWeight?: TextStyle['fontWeight'];
  color?: string;
}

const ButtonReport: React.FC<ButtonReportProps> = ({
  onPress,
  title,
  disable = false,
  fontWeight = '400',
  color,
}) => {
  return (
    <TouchableOpacity
      className="flex-row items-center justify-between"
      style={{ paddingVertical: 8 }}
      onPress={onPress}
      disabled={disable}
    >
      <Text style={{ fontWeight: fontWeight }}>{title}</Text>
      <View
        className="flex-row items-center justify-center"
        style={{ width: 20, height: 20 }}
      >
        <ContinueReportIcons color={color} width={8.29} height={13.41} />
      </View>
    </TouchableOpacity>
  );
};

export default ButtonReport;
