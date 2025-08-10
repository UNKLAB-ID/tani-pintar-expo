// app/top-up/TopUpScreen.tsx
import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { TopUpMethodCard } from '@/components/ui/payment/card-topup-method';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackIcons from '@/assets/icons/global/back-icons';
import { router } from 'expo-router';

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
    image: require('@/assets/images/payment/alfamart.png'),
  },
];

export default function TopUpScreen() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-white">
      <View className="flex-row p-4  items-center">
        <TouchableOpacity onPress={() => router.back()}>
          <BackIcons width={24} height={24} color="#000" />
        </TouchableOpacity>
        <Text className=" text-[16px] font-semibold ml-3">
          Top Up Balance TaniPay
        </Text>
        <View className="flex-1" />
      </View>

      <View className="flex-1 bg-white px-4 pt-5">
        <Text className="text-lg font-semibold mb-3">Transfer Bank</Text>
        {bankList.map(item => (
          <View key={item.label} className="mb-2">
            <TopUpMethodCard
              label={item.label}
              image={item.image}
              selected={selected === item.label}
              onPress={() => setSelected(item.label)}
            />
          </View>
        ))}

        <Text className="text-lg font-semibold mt-4 mb-3">Pay at Outlet</Text>
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

        <Text className="text-lg font-semibold mt-4 mb-3">Other</Text>
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

        <TouchableOpacity
          className={`mt-6 py-3 rounded-xl ${
            selected ? 'bg-green-600' : 'bg-gray-300'
          }`}
          disabled={!selected}
          onPress={() => {
            // Navigasi ke halaman konfirmasi
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
