import React, { useMemo } from 'react';
import Header from '@/components/ui/component-globals/header-global';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import PaymentInstructionsTabs from '@/components/ui/payment/payment-instruction';
import AdminFeeCard from '@/components/ui/payment/card-admin-fee';
import PaymentAccountCard from '@/components/ui/payment/card-bank-account';
const paymentMethods = [
  {
    id: 'bca',
    type: 'bank',
    name: 'BCA Bank Transfer',
    fee: 1000,
    accountNumber: '123 8515 6178 064',
    note: 'Only accept from BCA Bank',
    image: require('@/assets/images/payment/bank/bca.png'),
  },
  {
    id: 'bri',
    type: 'bank',
    name: 'BRI Bank Transfer',
    fee: 1000,
    accountNumber: '987 6543 2109 876',
    note: 'Only accept from BRI Bank',
    image: require('@/assets/images/payment/bank/bri.png'),
  },
  {
    id: 'bsi',
    type: 'bank',
    name: 'BSI Bank Transfer',
    fee: 1000,
    accountNumber: '987 6543 2109 876',
    note: 'Only accept from BSI Bank',
    image: require('@/assets/images/payment/bank/bsi.png'),
  },
  {
    id: 'btn',
    type: 'bank',
    name: 'BTN Bank Transfer',
    fee: 1000,
    accountNumber: '987 6543 2109 876',
    note: 'Only accept from BTN Bank',
    image: require('@/assets/images/payment/bank/btn.png'),
  },
  {
    id: 'mandiri',
    type: 'bank',
    name: 'Mandiri Bank Transfer',
    fee: 1000,
    accountNumber: '987 6543 2109 876',
    note: 'Only accept from Mandiri Bank',
    image: require('@/assets/images/payment/bank/mandiri.png'),
  },
  {
    id: 'indomaret',
    type: 'outlet',
    name: 'Indomaret',
    fee: 2000,
    accountNumber: '0851 5617 8064',
    instructions: [
      'Visit the nearest Indomaret store',
      'Tell the cashier to top up TaniPay',
    ],
    image: require('@/assets/images/payment/indomaret.png'),
  },
  {
    id: 'alfamart',
    type: 'outlet',
    name: 'Alfamart',
    fee: 2000,
    accountNumber: '0852 3344 5566',
    instructions: [
      'Visit the nearest Alfamart store',
      'Tell the cashier to top up TaniPay',
    ],
    image: require('@/assets/images/payment/alfamart.png'),
  },
  {
    id: 'kantorpos',
    type: 'outlet',
    name: 'Kantor Pos',
    fee: 2000,
    accountNumber: '0812 3456 7890',
    instructions: [
      'Visit the nearest Kantor Pos',
      'Tell the teller to top up TaniPay',
    ],
    image: require('@/assets/images/payment/pos.png'),
  },
];
const PaymentTopUpScreen = () => {
  const { bankId, methodType } = useLocalSearchParams<{
    bankId?: string | string[];
    methodType?: string;
  }>();

  // Pastikan jadi string tunggal
  const bankIdStr = Array.isArray(bankId) ? bankId[0] : (bankId ?? '');

  const selectedMethod = useMemo(
    () => paymentMethods.find(m => m.id === bankIdStr) || paymentMethods[0],
    [bankIdStr]
  );

  return (
    <SafeAreaView
      edges={['top', 'bottom', 'right', 'left']}
      className="bg-[#f8f8f8] flex-1"
    >
      <View className="bg-white">
        <Header title="Payment Top Up" />
      </View>
      {/* Admin Fee */}
      <View className="px-4 pt-4">
        <AdminFeeCard fee={selectedMethod.fee} />
      </View>

      {/* Bank Info */}
      <View className="flex-1">
        <View className="p-4">
          <PaymentAccountCard
            type={selectedMethod.type as 'bank' | 'outlet'}
            name={selectedMethod.name}
            logo={selectedMethod.image}
            accountNumber={selectedMethod.accountNumber}
            note={selectedMethod.note}
            instructions={selectedMethod.instructions}
          />

          <View className="pb-4 px-4 mt-3 bg-white  rounded-xl">
            {bankIdStr && <PaymentInstructionsTabs bankId={bankIdStr} />}
          </View>
        </View>
      </View>

      <TouchableOpacity className="bg-primary border border-primary p-4 mx-4 rounded-xl">
        <Text className="text-white text-center">OK</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default PaymentTopUpScreen;
