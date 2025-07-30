import ProtectIcon from '@/assets/icons/e-commerce/protect-icon';
import ShippingIcon from '@/assets/icons/e-commerce/ship-icon';
import { useEcommerceStore } from '@/store/e-commerce/ecommerce';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

type Props = {
  onPress: () => void;
};

const ShippingOptionCard: React.FC<Props> = ({ onPress }) => {
  const selectedShipping = useEcommerceStore(state => state.selectedShipping);

  // Default tampilkan Standard jika belum dipilih
  const displayShipping = selectedShipping ?? {
    label: 'Standard',
    cost: 20000,
    eta: 'Estimated arrival of goods March 18',
    discountCost: undefined,
  };

  return (
    <View className="bg-white px-4 py-3 rounded-md mx-3">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-[14px] font-semibold text-[#1F1F1F]">
          Select Shipping
        </Text>

        <TouchableOpacity onPress={onPress}>
          <Text className="text-[12px] text-[#00A86B] font-medium">
            See All Options
          </Text>
        </TouchableOpacity>
      </View>

      {/* Touchable Shipping Summary */}
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        className="rounded-xl px-4 py-3"
        style={{ borderWidth: 1, borderColor: '#C8C8C8' }}
      >
        <View className="flex-row space-x-3 items-start border-b border-[#E5E5E5] pb-3">
          <ShippingIcon width={24} height={24} />
          <View className="flex-1">
            <View className="flex-row items-center space-x-2 flex-wrap">
              <Text className="text-[14px] text-[#1F1F1F] font-medium mx-2">
                {displayShipping.label}
              </Text>

              {displayShipping.discountCost &&
              displayShipping.discountCost > displayShipping.cost ? (
                <>
                  <Text className="text-[12px] text-[#9E9E9E] mr-2 line-through">
                    Rp{displayShipping.discountCost.toLocaleString()}
                  </Text>
                  <Text className="text-[14px] text-[#00A86B] font-semibold">
                    Rp{displayShipping.cost.toLocaleString()}
                  </Text>
                </>
              ) : (
                <Text className="text-[14px] text-[#1F1F1F]">
                  Rp{displayShipping.cost.toLocaleString()}
                </Text>
              )}
            </View>

            <Text className="text-[12px] text-[#9E9E9E] mt-1">
              Estimasi: {displayShipping.eta}
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
