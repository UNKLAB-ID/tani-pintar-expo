import MoneyBalanceIcon from '@/assets/icons/payment/money-balance-icon';
import WalletSendMoneyIcon from '@/assets/icons/payment/wallet-sendmoney-icon';
import WalletPay from '@/assets/icons/payment/wallet-tanipay-icon';
import { PrimaryButton } from '@/components/ui/payment/button-primary';
import { InfoBalanceCard } from '@/components/ui/payment/card-bank-info';
import { PaymentMethodCard } from '@/components/ui/payment/card-payment-method';
import { AmountInput } from '@/components/ui/payment/input-amount';
import { TransferHeader } from '@/components/ui/payment/transfer-header';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, View, StatusBar, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SendToTaniPay = () => {
  const { name, phone, initials, image } = useLocalSearchParams<{
    name: string;
    phone: string;
    initials?: string;
    image?: string;
  }>();

  const [amount, setAmount] = useState('');
  const [balance, setBalance] = useState(100000);

  // masking phone
  const maskedInfo = phone ? `(+62) ${phone}` : '';

  function maskName(fullName: string) {
    if (!fullName) return '';

    const parts = fullName.trim().split(' ');
    return parts
      .map((part, index) => {
        if (part.length === 0) return '';
        // huruf pertama tetap, sisanya jadi '*'
        return part[0] + '*'.repeat(part.length - 1);
      })
      .join(' ');
  }
  const maskedName = maskName(name);

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
            title="Send to TaniPay"
            subtitle="select the contacts you want to transfer"
            onBack={() => router.back()}
          />
        </View>
        <View style={{ marginTop: 140, paddingHorizontal: 16 }}>
          <InfoBalanceCard
            icon={image ? { uri: image as string } : undefined}
            initials={initials}
            title={maskedName || 'Unknown'}
            titleIcon={<WalletPay width={16} height={16} />}
            maskedInfo={maskedInfo}
            balance={balance}
            renderCustomIcon={<MoneyBalanceIcon width={22} height={22} />}
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
            disabled={!name.trim() || Number(amount) > balance}
            onPress={handleTransfer}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default SendToTaniPay;
