import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
  ScrollView,
  View,
  StatusBar,
  Alert,
  Text,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
//components
import MoneyBalanceIcon from '@/assets/icons/payment/money-balance-icon';
import { InfoBalanceCard } from '@/components/ui/payment/card-bank-info';
import { AmountInput } from '@/components/ui/payment/input-amount';
import { TransferHeader } from '@/components/ui/payment/transfer-header';

import ModalConfirmationWithdraw from '@/components/ui/payment/modal-confirmation-withdraw';

const WithDrawToOutlet = () => {
  const { id, name, image } = useLocalSearchParams<{
    id: string;
    name: string;
    image?: string;
  }>();
  // console.log('DEBUG withdraw-to-outlet params:', { id, name, image });

  const [amount, setAmount] = useState('');
  const [balance, setBalance] = useState(100000);
  const [shadowModal, setShadowModal] = useState(false);

  const handleTransfer = () => {
    const transferAmount = Number(amount);
    if (transferAmount <= 0 || transferAmount > balance) {
      Alert.alert('Error', 'Amount tidak valid atau melebihi saldo');
      return;
    }

    setBalance(prev => prev - transferAmount);
    setAmount('');
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
            title="Withdraw To"
            subtitle="Select cash withdrawal"
            onBack={() => router.back()}
          />
        </View>
        <View style={{ marginTop: 140, paddingHorizontal: 16 }}>
          <InfoBalanceCard
            icon={require('@/assets/images/payment/indomaret.png')}
            title={name || 'Outlet'}
            balance={balance}
            renderCustomIcon={<MoneyBalanceIcon width={22} height={22} />}
          />
        </View>

        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="mx-4 mt-4">
            <AmountInput
              amount={amount}
              setAmount={setAmount}
              showNote={false}
            />
          </View>

          <View className="mx-4 mt-3">
            <View className="flex-row bg-white p-4 rounded-xl justify-between items-center">
              <Text className="text-[#8D8D8D] text-[12px]">
                Cash withdrawal fee
              </Text>
              <Text className="text-primary text-[14px] font-semibold">
                Rp2.000
              </Text>
            </View>
          </View>
        </ScrollView>
        <View className="items-center bg-white p-3 rounded-xl">
          <TouchableOpacity
            className="bg-primary p-4 rounded-xl w-full items-center"
            onPress={handleTransfer}
            onPressIn={() => setShadowModal(true)}
          >
            <Text className="text-white text-[14px]">Confirmation</Text>
          </TouchableOpacity>
        </View>
        <ModalConfirmationWithdraw
          visible={shadowModal}
          onClose={() => router.back()}
        />
      </SafeAreaView>
    </>
  );
};

export default WithDrawToOutlet;
