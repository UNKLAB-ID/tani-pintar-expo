import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import ChevronRight from '@/assets/icons/e-commerce/chevronright-icons';
import VoucherPrimaryIcon from '@/assets/icons/e-commerce/voucher-primery-icon';
import CheckPrimaryIcon from './check-voucher-primary-icon';
import ModalVoucher from './modal-voucher';
import { useEcommerceStore } from '@/store/e-commerce/ecommerce';

interface VoucherItem {
  id: string;
  title: string;
  description: string;
  deadline: string;
  value: number;
  type: 'shipping' | 'discount';
}

const dummyVouchers: VoucherItem[] = [
  {
    id: 'v1',
    title: 'Free Shipping Rp20.000',
    description: 'Valid with any payment method',
    deadline: '17.03.2025',
    value: 20000,
    type: 'shipping',
  },
  {
    id: 'v2',
    title: '20% Discount, Max Rp300.000',
    description: 'Min. transaction Rp150.000',
    deadline: '17.03.2025',
    value: 0,
    type: 'discount',
  },
];

const VoucherCard: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const { shippingVoucher, discountVoucher, applyVoucher, cancelVoucher } =
    useEcommerceStore();

  const totalVouchersUsed = [shippingVoucher, discountVoucher].filter(
    Boolean
  ).length;

  const getVoucherLabel = () => {
    if (totalVouchersUsed === 2) return '2 vouchers used';
    if (shippingVoucher) return '1 shipping promo used';
    if (discountVoucher) return '1 discount promo used';
    return 'Pilih voucher untuk digunakan';
  };

  const isVoucherUsed = totalVouchersUsed > 0;

  return (
    <View className="bg-white mt-3 pt-5 pb-4 px-4 rounded-xl mx-3">
      <Text className="text-[14px] font-semibold mb-3 mt-4">Voucher Tani</Text>

      <TouchableOpacity
        className="px-4 py-3 flex-row rounded-xl justify-between items-center"
        onPress={() => setModalVisible(true)}
        style={
          isVoucherUsed
            ? {
                borderWidth: 1,
                borderColor: '#169953',
                backgroundColor: '#d7fce8',
              }
            : {
                borderWidth: 1,
                borderColor: '#DCDCDC',
              }
        }
      >
        <View className="flex-row items-center space-x-2">
          <View
            className="w-[24px] h-[24px] rounded-full justify-center items-center mr-1"
            style={
              isVoucherUsed
                ? undefined
                : { borderWidth: 1, borderColor: '#DCDCDC' }
            }
          >
            {isVoucherUsed ? (
              <CheckPrimaryIcon width={20} height={20} />
            ) : (
              <VoucherPrimaryIcon width={16} height={16} />
            )}
          </View>

          <Text className="text-[14px] text-[#959595] leading-none">
            {getVoucherLabel()}
          </Text>
        </View>

        <ChevronRight color="#00A86B" />
      </TouchableOpacity>

      <ModalVoucher
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        vouchers={dummyVouchers}
        selectedVoucherIds={{
          shipping: shippingVoucher?.id || null,
          discount: discountVoucher?.id || null,
        }}
        onSelect={voucher => {
          applyVoucher(voucher);
          setModalVisible(false);
        }}
        onCancel={voucher => {
          cancelVoucher(voucher);
          setModalVisible(false);
        }}
      />
    </View>
  );
};

export default VoucherCard;
