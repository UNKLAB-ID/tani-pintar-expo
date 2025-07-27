import ProtectIcon from '@/assets/icons/e-commerce/protect-icon';
import ShippingIcon from '@/assets/icons/e-commerce/ship-icon';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

type Props = {
  label: string;
  cost: number;
  eta: string;
  onPress: () => void;
};

const ShippingOptionCard: React.FC<Props> = ({
  label,
  cost,
  eta,
  onPress,
}: Props) => {
  return (
    <View className="bg-white px-4 py-3 rounded-md mx-3">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-[14px] font-semibold text-[#1F1F1F]">
          Select Shipping
        </Text>

        <TouchableOpacity>
          <Text className="text-[12px] text-[#00A86B] font-medium">
            See All Options
          </Text>
        </TouchableOpacity>
      </View>

      {/* Touchable Option */}
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        className="border border-[#C8C8C8] rounded-xl px-4 py-3"
      >
        <View className="flex-row space-x-3 items-start border-b border-[#E5E5E5] pb-3">
          <ShippingIcon width={24} height={24} />
          <View className="flex-1">
            <View className="flex-row items-center space-x-2">
              <Text className="text-[14px] text-[#1F1F1F] font-medium">
                {label}
              </Text>
              <Text className="text-[14px] text-[#1F1F1F]">
                Rp{cost.toLocaleString()}
              </Text>
            </View>
            <Text className="text-[12px] text-[#9E9E9E] mt-1">
              Estimasi: {eta}
            </Text>
          </View>
        </View>

        {/* Insurance Info */}
        <View className="flex-row items-center mt-3 space-x-2">
          <ProtectIcon width={20} height={20} />
          <Text className="text-[13px] ml-2 text-[#1F1F1F]">
            Protected by Shipping Insurance.{' '}
            <Text className="text-primary">Info</Text>
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ShippingOptionCard;
