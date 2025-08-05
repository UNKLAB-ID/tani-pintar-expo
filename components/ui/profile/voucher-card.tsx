import { View, Text } from 'react-native';
import { Truck, Tag, ClockIcon } from 'lucide-react-native';
import React from 'react';

interface VoucherTicketCardProps {
  type: 'shipping' | 'discount';
  title?: string;
  description?: string;
  daysLeft?: number;
  minTransaction?: number;
}

const VoucherTicketCard = ({
  type = 'shipping',
  title = 'Free Shipping',
  description = 'Get free shipping with a max discount of Rp10,000',
  daysLeft = 5,
  minTransaction = 10000,
}: VoucherTicketCardProps) => {
  const isDiscount = type === 'discount';
  const labelColor = isDiscount ? 'bg-primary' : 'bg-[#1E6AF2]';

  return (
    <View className="flex-row bg-white rounded-2xl overflow-hidden shadow-md border border-gray-200">
      {/* Side Label */}
      <View className={`w-9 justify-center items-center ${labelColor}`}>
        <Text className="text-white text-[11px] rotate-[-90deg] tracking-widest font-bold">
          {isDiscount ? '%DISCOUNT' : 'SHIPPING'}
        </Text>
      </View>

      {/* Main Content */}
      <View className="flex-1 p-4">
        <View className="flex-row items-center space-x-2">
          {isDiscount ? (
            <Tag size={20} color="black" />
          ) : (
            <Truck size={20} color="black" />
          )}
          <Text className="font-semibold text-base ml-2">{title}</Text>
        </View>

        <Text className="text-sm text-gray-600 mt-1">{description}</Text>

        <View className="flex-row items-center mt-3">
          <ClockIcon size={14} color="red" className="mr-1" />
          <Text className="text-[12px] text-red-500 font-semibold">
            {daysLeft} DAYS LEFT
          </Text>
        </View>

        <View className="border-t border-dashed border-gray-300 mt-3 mb-2" />

        <View className="flex-row justify-between items-center">
          <Text className="text-sm text-gray-500">Min. Transaction</Text>
          <Text className="text-sm font-semibold">
            Rp{minTransaction.toLocaleString('id-ID')}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default VoucherTicketCard;
