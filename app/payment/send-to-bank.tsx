// screens/SendToBank.tsx
import { PrimaryButton } from '@/components/ui/payment/button-primary';
import { BankInfoCard } from '@/components/ui/payment/card-bank-info';
import { PaymentMethodCard } from '@/components/ui/payment/card-payment-method';
import { AmountInput } from '@/components/ui/payment/input-amount';
import { TransferHeader } from '@/components/ui/payment/transfer-header';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, View, StatusBar, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SendToBank = () => {
  const [amount, setAmount] = useState('');
  const [balance, setBalance] = useState(100000);

  const accountNumber = '777771234567';
  const maskedNumber =
    accountNumber.slice(0, -4).replace(/\d/g, '*') + accountNumber.slice(-4);

  const handleTransfer = () => {
    const transferAmount = Number(amount);
    if (transferAmount <= 0 || transferAmount > balance) {
      Alert.alert('Error', 'Amount tidak valid atau melebihi saldo');
      return;
    }

    setBalance(prev => prev - transferAmount);
    setAmount('');
    router.push('/payment/invoice');
  };
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
            title="Topup"
            subtitle="Select a method for TaniPay topup payments"
            onBack={() => router.back()}
          />
        </View>
        <View style={{ marginTop: 140, paddingHorizontal: 16 }}>
          <BankInfoCard
            bankName="BANK BCA"
            accountName="MAMBAUS SOLIHIN"
            maskedNumber={maskedNumber}
            balance={balance}
          />
        </View>

        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="mx-4 mt-4">
            <AmountInput amount={amount} setAmount={setAmount} />
          </View>

          <View className="mx-4 mt-3">
            <PaymentMethodCard
              method="Tani Pay"
              balance={balance}
              amount={Number(amount) || 0}
              onPress={() => console.log('Pilih metode pembayaran')}
            />
          </View>
        </ScrollView>
        <View className="items-center bg-white p-3 rounded-xl">
          <PrimaryButton
            title="Transfer (Free admin fee!)"
            fee={Number(amount) || 0}
            disabled={!accountNumber.trim() || Number(amount) > balance}
            onPress={handleTransfer}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default SendToBank;
