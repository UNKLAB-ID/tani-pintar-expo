import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { formatPrice } from '@/utils/format-currency/currency';
import TransferIcon from '@/assets/icons/payment/transfer-icon';
import TopUpIcon from '@/assets/icons/payment/topup-icon';
import PaymentIcon from '@/assets/icons/payment/payment-icon';
import TransferReceiveIcon from '@/assets/icons/payment/transfer-receive-icon';

type TransferHistoryProps = {
  type: string;
  title: string;
  amount: number;
  date: string;
  description: string;
  status: string;
  onPress?: () => void;
};

const TransferHistory: React.FC<TransferHistoryProps> = ({
  type,
  title,
  amount,
  date,
  description,
  status,
  onPress,
}) => {
  const maskNumbers = (text: string) => {
    return text.replace(/\d{6,}/g, match => {
      if (match.length <= 6) return match; // biar angka pendek gak disensor
      const first = match.slice(0, 3); // ambil 3 digit depan
      const last = match.slice(-3); // ambil 3 digit belakang
      const masked = '*'.repeat(match.length - 6); // sisanya disensor
      return first + masked + last;
    });
  };

  const getIcon = () => {
    switch (type) {
      case 'topup':
        return (
          <View
            className="p-2 "
            style={{ backgroundColor: '#D7FCE8', borderRadius: 16 }}
          >
            <TopUpIcon width={20} height={20} />
          </View>
        );
      case 'payment':
        return (
          <View
            className="p-2 "
            style={{ backgroundColor: '#D7FCE8', borderRadius: 16 }}
          >
            <PaymentIcon width={20} height={20} />
          </View>
        );
      case 'transfer':
        return (
          <View
            className="p-2 "
            style={{ backgroundColor: '#d7f5fc', borderRadius: 16 }}
          >
            <TransferIcon width={20} height={20} />
          </View>
        );
      case 'receive':
        return (
          <View
            className="p-2 "
            style={{ backgroundColor: '#d7f5fc', borderRadius: 16 }}
          >
            <TransferReceiveIcon width={20} height={20} />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center justify-between bg-white pb-2 mb-2"
      style={{ borderBottomWidth: 1, borderBottomColor: '#D3D3D3' }}
    >
      <View className="flex-row items-center">
        <View className="bg-gray-100 rounded-full">{getIcon()}</View>
        <View className="ml-2">
          <Text className="text-[14px] font-semibold">{title}</Text>
          <Text className="text-[12px] text-[#B3B3B3] my-1">{date}</Text>
          <Text className="text-[12px] text-[#6F6F6F]">
            {maskNumbers(description)}
          </Text>
        </View>
      </View>
      <View className="items-end">
        <View className=" p-2 rounded items-center bg-[#D7FCE8]">
          <Text
            className={`text-[12px] font-medium ${
              status === 'success' ? 'text-primary' : 'text-red-500'
            }`}
          >
            {status === 'success' ? 'Success' : 'Failed'}
          </Text>
        </View>

        <Text
          className={`text-[12px] font-semibold ${
            amount >= 0 ? 'text-primary' : 'text-[#1F1F1F]'
          }`}
        >
          {`${amount >= 0 ? '+' : ''}${formatPrice(amount)}`}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default TransferHistory;
