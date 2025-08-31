import React, { useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { TransferHeader } from '@/components/ui/payment/transfer-header';
import PaymentMethodSection from '@/components/ui/payment/card-payment-method-section';
import { bankList, storeList } from '@/assets/data/listStore';
import BankSendMoneyIcon from '@/assets/icons/payment/bank-sendmoney-icon';
import MoneyBalanceIcon from '@/assets/icons/payment/money-balance-icon';

const SendMoneyTopUp = () => {
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

        <View style={{ marginTop: 130, paddingHorizontal: 16 }}>
          <PaymentMethodSection
            title="Bank Transfer"
            icon={BankSendMoneyIcon}
            subtitle="From ATM, M-Banking, Internet Banking, and more."
            data={bankList}
            type="bank"
            onSelectItem={val => console.log('Selected Bank:', val)}
          />

          <PaymentMethodSection
            title="With cash"
            icon={MoneyBalanceIcon}
            subtitle="At your nearest minimart, warung, or agent"
            data={storeList}
            type="store"
            onSelectItem={val => console.log('Selected store:', val)}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default SendMoneyTopUp;
