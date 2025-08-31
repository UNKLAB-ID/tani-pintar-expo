import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { TopUpMethodCard } from '@/components/ui/payment/card-topup-method';
import { SafeAreaView } from 'react-native-safe-area-context';

import { router } from 'expo-router';
import Header from '@/components/ui/component-globals/header-global';

const bankList = [
  { label: 'Bank BCA', image: require('@/assets/images/payment/bank/bca.png') },
  {
    label: 'Bank Mandiri',
    image: require('@/assets/images/payment/bank/mandiri.png'),
  },
  { label: 'Bank BTN', image: require('@/assets/images/payment/bank/btn.png') },
  { label: 'Bank BRI', image: require('@/assets/images/payment/bank/bri.png') },
  { label: 'Bank BSI', image: require('@/assets/images/payment/bank/bsi.png') },
];

const outletList = [
  {
    label: 'Indomaret',
    image: require('@/assets/images/payment/indomaret.png'),
  },
  {
    label: 'Alfa Group',
    image: require('@/assets/images/payment/alfamart.png'),
  },
];

const otherList = [
  {
    label: 'Kantor Pos Indonesia',
    image: require('@/assets/images/payment/pos.png'),
  },
];

export default function TopUpScreen() {
  const [selected, setSelected] = useState<string | null>(null);
  const bankIdMap: Record<string, string> = {
    'Bank BCA': 'bca',
    'Bank Mandiri': 'mandiri',
    'Bank BTN': 'btn',
    'Bank BRI': 'bri',
    'Bank BSI': 'bsi',
    Indomaret: 'indomaret',
    'Alfa Group': 'alfamart',
    'Kantor Pos Indonesia': 'kantorpos',
  };
  return (
    <SafeAreaView edges={['top', 'bottom']} className="flex-1 bg-[#f8f8f8]">
      <View className=" bg-white ">
        <Header title="Top Up Balance TaniPay" />
      </View>

      <View className="flex-1 bg-white px-4 pt-5 mt-3">
        <Text className="text-[16px] font-semibold mb-3">Transfer Bank</Text>
        {bankList.map(item => (
          <View key={item.label} className="mb-2">
            <TopUpMethodCard
              label={item.label}
              image={item.image}
              selected={selected === item.label}
              onPress={() => {
                console.log('[DEBUG] Selected:', item.label); // Cek label yang dipilih
                setSelected(item.label);
              }}
            />
          </View>
        ))}

        <Text className="text-[16px] font-semibold mt-4 mb-3">
          Pay at Outlet
        </Text>
        {outletList.map(item => (
          <View key={item.label} className="mb-2">
            <TopUpMethodCard
              label={item.label}
              image={item.image}
              selected={selected === item.label}
              onPress={() => setSelected(item.label)}
            />
          </View>
        ))}

        <Text className="text-[16px] font-semibold mt-4 mb-3">Other</Text>
        {otherList.map(item => (
          <View key={item.label} className="mb-2">
            <TopUpMethodCard
              label={item.label}
              image={item.image}
              selected={selected === item.label}
              onPress={() => setSelected(item.label)}
            />
          </View>
        ))}
      </View>
      <View className="p-4 bg-white">
        <TouchableOpacity
          className={`mt-6 py-3 rounded-xl ${
            selected ? 'bg-green-600' : 'bg-gray-300'
          }`}
          disabled={!selected}
          onPress={() => {
            const id = bankIdMap[selected!] || '';
            let methodType: 'bank' | 'mart' | 'pos' = 'bank';
            if (['Indomaret', 'Alfa Group'].includes(selected!)) {
              methodType = 'mart';
            } else if (selected === 'Kantor Pos Indonesia') {
              methodType = 'pos';
            }

            router.push({
              pathname: '/payment/topup/payment-topup',
              params: { bankId: id, methodType },
            });
          }}
        >
          <Text className="text-white text-center font-semibold">
            Confirmation
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
