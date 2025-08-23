import React from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { Clipboard } from 'react-native';
import { Copy } from 'lucide-react-native';

interface PaymentAccountCardProps {
  type: 'bank' | 'outlet';
  name: string;
  logo: any;
  accountNumber: string;
  note?: string;
  instructions?: string[];
}

export default function PaymentAccountCard({
  type,
  name,
  logo,
  accountNumber,
  note,
  instructions = [],
}: PaymentAccountCardProps) {
  const handleCopy = () => {
    Clipboard.setString(accountNumber);
    Alert.alert('Copied', 'Nomor berhasil disalin!');
  };

  return (
    <View className="p-4 bg-white rounded-xl shadow-sm">
      {/* Header */}
      <View className="flex-row items-center">
        <Image
          source={logo}
          className="w-[30px] h-[30px]"
          resizeMode="contain"
        />
        <Text className="ml-2 text-[14px] font-medium text-[#6F6F6F]">
          {type === 'bank' ? `${name} - Virtual Account` : name}
        </Text>
      </View>

      {/* Nomor */}
      <View style={{ marginLeft: 39 }}>
        <Text className="mt-3 text-[13px] text-[#6F6F6F]">
          {type === 'bank' ? 'No. Rekening' : 'No. Handphone'}
        </Text>

        <View className="flex-row items-center justify-between mt-1">
          <Text className="text-[16px] font-semibold text-green-600">
            {accountNumber}
          </Text>
          {type === 'bank' && (
            <TouchableOpacity
              onPress={handleCopy}
              className="flex-row items-center border border-gray-300 rounded-lg px-3 py-1"
            >
              <Text className="mr-1 text-[12px] font-medium">Copy</Text>
              <Copy size={14} color="#1f1f1f" strokeWidth={2} />
            </TouchableOpacity>
          )}
        </View>

        {/* Instruksi & Note */}
        {type === 'bank' && (
          <>
            <Text className="mt-3 text-[13px] text-green-500">
              Verification process less than 10 minutes after payment
            </Text>
            <Text className="mt-3 text-[13px] text-[#6F6F6F] leading-5">
              Pay the order to the Virtual Account above before making another
              order with the Virtual Account so that the number remains the
              same.
            </Text>
          </>
        )}
      </View>
    </View>
  );
}
