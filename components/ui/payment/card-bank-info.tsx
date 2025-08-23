import MoneyBalanceIcon from '@/assets/icons/payment/money-balance-icon';
import { formatPrice } from '@/utils/format-currency/currency';
import React from 'react';
import { View, Text, Image } from 'react-native';

export const BankInfoCard = ({
  bankName,
  accountName,
  maskedNumber,
  balance,
}: {
  bankName: string;
  accountName: string;
  maskedNumber: string;
  balance: number;
}) => (
  <View className="shadow-md bg-white p-4 rounded-xl">
    <View className="flex flex-col border-b py-3 border-[#D3D3D3]">
      <View className="flex-row items-center">
        <Image
          source={require('@/assets/images/payment/bank/bca.png')}
          resizeMode="cover"
          className="w-[36px] h-[36px] rounded-full mr-3"
        />
        <View>
          <View className="flex-row">
            <Text className="text-[#6F6F6F] text-[12px] font-medium">
              {bankName}
            </Text>
            <Text className="text-[#6F6F6F] text-[12px] font-medium">
              {' '}
              - {accountName}
            </Text>
          </View>
          <Text className="text-[#1F1F1F] text-[12px] mt-1">
            {maskedNumber}
          </Text>
        </View>
      </View>
    </View>
    <View className="flex flex-col py-3 border-[#D3D3D3]">
      <View className="flex-row items-center">
        <View
          style={{
            padding: 8,
            borderRadius: 20,
            backgroundColor: '#fff',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            elevation: 3, // Android
          }}
          className="mr-3"
        >
          <MoneyBalanceIcon width={22} height={22} />
        </View>
        <View>
          <Text className="text-[#6F6F6F] text-[12px] font-medium">
            Your Balance
          </Text>
          <Text className="text-[#1F1F1F] text-[12px] mt-1">
            {formatPrice(balance)}
          </Text>
        </View>
      </View>
    </View>
  </View>
);
