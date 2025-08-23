import React from 'react';
import { View, Text } from 'react-native';

interface AdminFeeCardProps {
  fee: number;
}

export default function AdminFeeCard({ fee }: AdminFeeCardProps) {
  return (
    <View className="flex-row bg-white p-4 justify-between rounded-xl">
      <Text className="text-[14px] text-[#6F6F6F] font-medium">Admin Fee</Text>
      <Text className="text-primary text-[14px] font-semibold ">
        Rp.{fee.toLocaleString('id-ID')}
      </Text>
    </View>
  );
}
