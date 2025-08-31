import { AmountInput } from '@/components/ui/payment/input-amount';
import { TransferHeader } from '@/components/ui/payment/transfer-header';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  ScrollView,
  View,
  StatusBar,
  Text,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const RequestMoney = () => {
  const [amount, setAmount] = useState('');

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <SafeAreaView
        edges={['top', 'bottom']}
        style={{ flex: 1, backgroundColor: '#f8f8f8' }}
      >
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
          }}
        >
          <TransferHeader
            title="Request Money"
            subtitle="Request your friends for money"
            onBack={() => router.back()}
          />
        </View>

        <View style={{ flex: 1, top: 130, paddingBottom: 20 }}>
          <View className="mx-4 mt-4">
            <AmountInput amount={amount} setAmount={setAmount} />
          </View>
        </View>
        <View className="items-center bg-white p-3 rounded-xl">
          <TouchableOpacity
            className="rounded-xl w-full py-3 px-4  bg-primary"
            onPress={() =>
              router.push('/payment/sendmoney/request-money-code-qr')
            }
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text className="text-[14px] font-semibold text-white">
                Create QR Code
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default RequestMoney;
