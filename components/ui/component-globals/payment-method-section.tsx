import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

type PaymentMethod = {
  label: string;
  logo: any;
  description?: string;
};

type Props = {
  payment?: PaymentMethod | null;
  onPressSeeAll: () => void;
};

export default function PaymentMethodSection({
  payment,
  onPressSeeAll,
}: Props) {
  if (!payment) return null;

  return (
    <View className="bg-white mt-3 px-4 py-3 rounded-`">
      {/* Header */}
      <View
        className="flex-row justify-between items-center pb-3 mb-3"
        style={{ borderBottomWidth: 0.5, borderBottomColor: '#E5E5E5' }}
      >
        <Text className="text-[14px] font-semibold text-[#1F1F1F]">
          Payment Method
        </Text>

        <TouchableOpacity onPress={onPressSeeAll}>
          <Text className="text-[13px] text-[#00A86B] font-medium">
            See all
          </Text>
        </TouchableOpacity>
      </View>

      {/* Selected Method */}
      <View className="flex-row items-center">
        <Image
          source={payment.logo}
          resizeMode="contain"
          className="w-[40px] h-[28px]"
        />

        <View className="ml-3">
          <Text className="text-[14px] text-[#1F1F1F] font-semibold">
            {payment.label}
          </Text>

          {payment.description && (
            <Text className="text-[12px] text-[#9E9E9E] mt-[2px]">
              {payment.description}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}
