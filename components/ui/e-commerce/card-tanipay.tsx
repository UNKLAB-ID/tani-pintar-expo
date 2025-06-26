import React from 'react';
import { View, Text } from 'react-native';
import WalletIcons from '@/assets/icons/global/wallet-icons';
import Wallet2Icons from '@/assets/icons/global/wallet2-icons';
import VoucherIcons from '@/assets/icons/global/voucher-icons';

interface TaniPaysCardProps {
  saldo?: string;
  statusPinjam?: string;
}

const TaniPaysCard: React.FC<TaniPaysCardProps> = ({
  saldo = 'Rp0',
  statusPinjam = 'Not Active',
}) => {
  return (
    <View className="flex-row bg-[#F9F9F9] rounded-xl px-5 py-4 mx-5 mt-5 space-x-4">
      <View className="w-1/3 items-start">
        <View className="flex-row items-center mb-1">
          <View style={{ marginRight: 3 }}>
            <WalletIcons width={16} height={16} />
          </View>
          <Text className="text-[12px] font-medium text-black">TaniPay</Text>
        </View>
        <View className="space-y-1">
          <Text className="text-[12px] font-bold text-black">{saldo}</Text>
          <Text
            className="text-[10px] text-gray-500"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            Topup minimum...
          </Text>
        </View>
      </View>

      {/* TaniPinjam */}
      <View className="w-1/3">
        <View className="flex-row items-center mb-1">
          <View style={{ marginRight: 3 }}>
            <Wallet2Icons width={16} height={16} />
          </View>
          <Text className="text-[12px] font-medium text-black">TaniPinjam</Text>
        </View>
        <View className="space-y-1">
          <Text className="text-[12px] font-bold text-[#28a745]">
            {statusPinjam}
          </Text>
          <Text
            className="text-[10px] text-gray-500"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            Limit up to Rp20...
          </Text>
        </View>
      </View>

      {/* Voucher */}
      <View className="w-1/3">
        <View className="flex-row items-center mb-1">
          <View style={{ marginRight: 3 }}>
            <VoucherIcons width={16} height={16} />
          </View>
          <Text className="text-[12px] font-medium text-black">Voucher</Text>
        </View>
        <View className="space-y-1">
          <Text className="text-[12px] font-bold text-black">
            Voucher Discount
          </Text>
          <Text
            className="text-[10px] text-[#28a745]"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            Free Delivery Service
          </Text>
        </View>
      </View>
    </View>
  );
};

export default TaniPaysCard;
