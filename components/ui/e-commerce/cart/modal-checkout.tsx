import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { formatPrice } from '@/utils/format-currency/currency';

import ChevronRight from '@/assets/icons/e-commerce/chevronright-icons';
const { width } = Dimensions.get('window');
interface ModalCheckoutProps {
  isVisible: boolean;
  onConfirm: () => void;
  totalItems: number;
  subtotal: number;
  platformFee?: number;
}

const ModalCheckout: React.FC<ModalCheckoutProps> = ({
  isVisible,
  onConfirm,
  totalItems,
  subtotal,
  platformFee = 1000,
}) => {
  if (!isVisible) return null;

  const total = subtotal + platformFee;

  return (
    <View
      className="rounded-3xl  px-4 pb-[20px]  bg-white"
      style={{
        width,
        paddingTop: 14,
      }}
    >
      <View
        className=" rounded-xl mb-4 p-3"
        style={{
          borderWidth: 1,
          borderColor: '#DCDCDC80',
        }}
      >
        <TouchableOpacity className="flex-row justify-between items-center">
          <View>
            <Text className="text-[14px] text-[#1F1F1F] font-semibold">
              Promo Code or Voucher
            </Text>
            <Text className="text-[10px] " style={{ color: '#DCDCDC' }}>
              Savings with Your Promo Code or Voucher!
            </Text>
          </View>
          <ChevronRight />
        </TouchableOpacity>
      </View>

      <View className="mb-4">
        <View className="flex-row justify-between px-2">
          <Text className="text-[14px] bg-[#1F1F1F]">Sub Total</Text>
          <Text className="text-[#1F1F1F] text-[14px] font-semibold">
            {formatPrice(subtotal)}
          </Text>
        </View>
        <View className="flex-row justify-between px-2 py-2">
          <Text className="text-[14px] bg-[#1F1F1F]">Fee Platform</Text>
          <Text className="text-[#1F1F1F] text-[14px] font-semibold">
            {formatPrice(platformFee)}
          </Text>
        </View>
        <View className="flex-row justify-between px-2 mt-[6px] pb-3">
          <Text className="text-[14px] bg-[#1F1F1F]">Total</Text>
          <Text className="text-[#1F1F1F] text-[14px] font-semibold">
            {formatPrice(total)}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        className="items-center bg-primary py-3"
        style={{
          borderRadius: 12,
        }}
        onPress={onConfirm}
      >
        <Text className=" font-semibold text-white text-[16px]">
          Checkout ({totalItems})
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ModalCheckout;
