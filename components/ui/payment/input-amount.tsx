import React from 'react';
import { View, Text, TextInput } from 'react-native';
import NoteIcon from '@/assets/icons/e-commerce/note-icon';
import { formatPrice } from '@/utils/format-currency/currency';

export const AmountInput = ({
  amount,
  setAmount,
}: {
  amount: string;
  setAmount: (v: string) => void;
}) => (
  <View className="bg-white p-4 rounded-xl shadow-md">
    <Text className="text-[#6F6F6F] text-[12px] font-medium">Amount</Text>
    <View className="flex-row items-center mt-1">
      <Text className="text-[#1F1F1F] text-[20px] font-bold mr-1">Rp</Text>
      <TextInput
        value={amount ? formatPrice(Number(amount)).replace('Rp', '') : ''}
        onChangeText={text => {
          const numericValue = text.replace(/\D/g, '');
          setAmount(numericValue);
        }}
        placeholder="0"
        keyboardType="numeric"
        className="flex-1 text-[24px] font-bold text-[#1F1F1F]"
      />
    </View>
    {amount && Number(amount) < 10000 && (
      <Text className="text-red-500 text-[10px] mt-1">
        *Balance less than minimum, minimum balance Rp10,000
      </Text>
    )}
    <Text className="text-[#9F9F9F] text-[10px] mt-1">
      *Minimum balance that can be sent is Rp10,000
    </Text>

    <View className="flex-row items-center border rounded-lg mt-4 px-3">
      <NoteIcon width={24} height={24} />
      <TextInput
        placeholder="Enter Description"
        placeholderTextColor="#9F9F9F"
        className="flex-1 text-[14px] text-[#1F1F1F]"
      />
    </View>
  </View>
);
