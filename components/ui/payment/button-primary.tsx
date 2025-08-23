import { formatPrice } from '@/utils/format-currency/currency';
import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

export const PrimaryButton = ({
  title,
  onPress,
  disabled,
  fee,
}: {
  title: string;
  fee: number;
  onPress?: () => void;
  disabled?: boolean;
}) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={disabled}
    className={`rounded-xl w-full py-3 px-4 ${!disabled ? 'bg-primary' : 'bg-[#e9e9e9]'}`}
  >
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Text
        className={`text-[14px] font-semibold ${!disabled ? 'text-white' : 'text-[#D3D3D3]'}`}
      >
        {title}
      </Text>
      <Text
        className={`text-[14px] font-semibold ${!disabled ? 'text-white' : 'text-[#D3D3D3]'}`}
      >
        {formatPrice(fee)}
      </Text>
    </View>
  </TouchableOpacity>
);
