import ChevronRight from '@/assets/icons/e-commerce/chevronright-icons';
import VoucherPrimaryIcon from '@/assets/icons/e-commerce/voucher-primery-icon';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface VoucherProps {
  voucher?: {
    label: string;
  };
}

const VoucherCard: React.FC<VoucherProps> = ({ voucher }) => {
  if (!voucher) return null;

  return (
    <View className="bg-white mt-3 pt-5 pb-4 px-4 rounded-xl mx-3">
      <Text className="text-[14px] font-semibold mb-3 mt-4">Voucher Tani</Text>
      <View
        className="px-4 py-3 rounded-xl flex-row justify-between items-center"
        style={{ borderWidth: 1, borderColor: '#DCDCDC' }}
      >
        <TouchableOpacity className="flex-row items-center space-x-2">
          <View
            className="w-[24px] h-[24px]  rounded-full justify-center items-center mr-1"
            style={{ borderWidth: 1, borderColor: '#DCDCDC' }}
          >
            <VoucherPrimaryIcon width={16} height={16} />
          </View>

          <Text className="text-[14px] text-[#959595] leading-none">
            {voucher.label}
          </Text>
        </TouchableOpacity>

        <ChevronRight color="#00A86B" />
      </View>
    </View>
  );
};

export default VoucherCard;
