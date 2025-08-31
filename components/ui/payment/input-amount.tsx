import React from 'react';
import { View, Text, TextInput } from 'react-native';
import NoteIcon from '@/assets/icons/e-commerce/note-icon';
import { formatPrice } from '@/utils/format-currency/currency';

export const AmountInput = ({
  amount,
  setAmount,
  showNote = true,
}: {
  amount: string;
  setAmount: (v: string) => void;
  showNote?: boolean;
}) => (
  <View className="bg-white p-4 rounded-xl shadow-md">
    <Text className="text-[#6F6F6F] text-[12px] font-medium">Amount</Text>
    <View className="flex-row items-center border-b border-[#D3D3D3] mt-1">
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
    {amount && Number(amount) < 10000 ? (
      <Text className="text-red-500 text-[10px] mt-2">
        *Balance less than minimum, minimum balance Rp10,000
      </Text>
    ) : (
      <Text className="text-[#8D8D8D] text-[10px] mt-2">
        *Minimum balance that can be sent is Rp10,000
      </Text>
    )}
    {showNote && (
      <View className="flex-row items-center border border-[#C8C8C8] rounded-lg mt-4 px-3">
        <NoteIcon width={24} height={24} />
        <TextInput
          placeholder="Enter Description"
          placeholderTextColor="#9F9F9F"
          className="flex-1 text-[14px] text-[#1F1F1F]"
        />
      </View>
    )}
  </View>
);
