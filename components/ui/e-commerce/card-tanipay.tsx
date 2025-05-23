import React from "react";
import { View, Text } from "react-native";
import WalletIcons from "@/assets/icons/global/wallet-icons";
import Wallet2Icons from "@/assets/icons/global/wallet2-icons";
import VoucherIcons from "@/assets/icons/global/voucher-icons";

interface TaniPayItem {
  id: number;
  value: string;
}

interface TaniPaysCardsProps {
  values: TaniPayItem[];
}

const TaniPaysCard: React.FC<TaniPaysCardsProps> = ({ values }) => {
  return (
    <View className="flex-row bg-[#F0F0F0] rounded-2xl px-5 py-4 mx-5 mt-5 space-x-4">
      <View className="flex-1 items-start">
        <View className="flex-row items-center mb-1">
          <WalletIcons width={18} height={18} className="mr-2" />
          <Text className="text-sm font-medium text-black">TaniPay</Text>
        </View>
        <Text className="text-sm font-bold text-black">{values[0]?.value}</Text>
        <Text
          className="text-xs text-gray-500"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          Topup minimum...
        </Text>
      </View>

      <View className="flex-1 items-center">
        <View className="flex-row items-center mb-1">
          <Wallet2Icons width={18} height={18} className="mr-2" />
          <Text className="text-sm font-medium text-black">TaniPinjam</Text>
        </View>
        <Text className="text-sm font-bold text-[#28a745]">
          {values[1]?.value}
        </Text>
        <Text
          className="text-xs text-gray-500"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          Limit up to Rp20...
        </Text>
      </View>

      <View className="flex-1 items-end ml-3">
        <View className="flex-row items-center mb-1">
          <VoucherIcons width={18} height={18} className="mr-2" />
          <Text className="text-sm font-medium text-black">Voucher</Text>
        </View>
        <Text className="text-sm font-bold text-black">Voucher Discount</Text>
        <Text
          className="text-xs text-[#28a745]"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          Free Delivery Service
        </Text>
      </View>
    </View>
  );
};

export default TaniPaysCard;
