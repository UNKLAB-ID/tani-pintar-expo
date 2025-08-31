import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  TextInput,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

// icon
import PoutingIcon from '@/assets/icons/payment/pouting-icon';
import BackIcons from '@/assets/icons/global/back-icons';
import EwalletSendMoneyIcon from '@/assets/icons/payment/ewallet-sendmoney-icon';
import BankSendMoneyIcon from '@/assets/icons/payment/bank-sendmoney-icon';
import WalletSendMoneyIcon from '@/assets/icons/payment/wallet-sendmoney-icon';
import CashHandIcon from '@/assets/icons/payment/cash-hand-icon';
import CardRecentRecipient from '@/components/ui/payment/card-recent-recipient';
import CardYourAccount from '@/components/ui/payment/card-youraccount-';
import SearchIconPrimary from '@/assets/icons/global/search-icons';
import { TransferHeader } from '@/components/ui/payment/transfer-header';

const screenHeight = Dimensions.get('window').height;

// Recent Recipient
export const recentRecipients = [
  {
    id: 1,
    initials: 'TJ',
    name: 'Toni Jansen',
    account: 'TaniPay 3686',
  },
  {
    id: 2,
    initials: 'M',
    name: 'Michael',
    account: 'TaniPay 7777',
  },
  {
    id: 3,
    initials: 'P',
    name: 'Putri',
    account: 'TaniPay 8999',
  },
];

// To your account
export const bankAccounts = [
  {
    id: 1,
    bankName: 'Bank BCA',
    accountNumber: '15500009993547',
    accountHolder: 'Mambaun Solihin',
    bankLogo: require('@/assets/images/payment/bank/bca.png'),
  },
  {
    id: 2,
    bankName: 'Bank BCA',
    accountNumber: '15500009993547',
    accountHolder: 'Mambaun Solihin',
    bankLogo: require('@/assets/images/payment/bank/bca.png'),
  },
  {
    id: 3,
    bankName: 'Bank BCA',
    accountNumber: '15500009993547',
    accountHolder: 'Mambaun Solihin',
    bankLogo: require('@/assets/images/payment/bank/bca.png'),
  },
];

const SendMoney = () => {
  const [search, setSearch] = useState('');

  const filteredAccounts = bankAccounts.filter(
    item =>
      item.bankName.toLowerCase().includes(search.toLowerCase()) ||
      item.accountNumber.includes(search) ||
      item.accountHolder.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#169553"
        translucent
      />

      <SafeAreaView
        edges={['top']}
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
            title="Send Money"
            subtitle="Choose delivery method"
            onBack={() => router.back()}
          />
        </View>
        <View style={{ top: 150 }} className="w-full px-4 z-10">
          <View className="flex-row justify-center gap-x-6 rounded-xl bg-white p-4 shadow-md">
            <View className="items-center">
              <TouchableOpacity
                onPress={() =>
                  router.push('/payment/sendmoney/add-bank-account')
                }
                className="items-center border border-[#C8C8C8] rounded-2xl p-4"
              >
                <BankSendMoneyIcon width={24} height={24} />
              </TouchableOpacity>
              <Text className="mt-3 text-[12px] font-medium">Bank</Text>
            </View>
            <View className="items-center">
              <TouchableOpacity
                onPress={() =>
                  router.push('/payment/sendmoney/wallet-list-screen')
                }
                className="items-center border border-[#C8C8C8] rounded-2xl p-4"
              >
                <EwalletSendMoneyIcon width={24} height={24} />
              </TouchableOpacity>
              <Text className="mt-3 text-[12px] font-medium">E-wallet</Text>
            </View>
            <View className="items-center">
              <TouchableOpacity
                onPress={() => router.push('/payment/sendmoney/tanipay')}
                className="items-center border border-[#C8C8C8] rounded-2xl p-4"
              >
                <WalletSendMoneyIcon width={24} height={24} />
              </TouchableOpacity>
              <Text className="mt-3 text-[12px] font-medium">Tani Pay</Text>
            </View>
            <View className="items-center">
              <TouchableOpacity
                onPress={() => router.push('/payment/sendmoney/request-money')}
                className="items-center border border-[#C8C8C8] rounded-2xl p-4"
              >
                <CashHandIcon width={24} height={24} />
              </TouchableOpacity>
              <Text className="mt-3 text-[12px] font-medium">
                Request Money
              </Text>
            </View>
          </View>
        </View>
        <View style={{ top: 150 }} className="flex flex-col px-4 mt-4">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-[16px] font-semibold">Recent Recipient</Text>
            <TouchableOpacity>
              <Text className="text-[#6F6F6F] text-[14px] font-medium">
                See All
              </Text>
            </TouchableOpacity>
          </View>
          {recentRecipients.length === 0 ? (
            <View className="p-4 justify-center items-center">
              <PoutingIcon width={24} height={24} />
              <Text style={{ marginTop: 8, color: '#999' }}>
                Sorry, there is no data to display
              </Text>
            </View>
          ) : (
            <View className="flex-row gap-x-3">
              {recentRecipients.map(item => (
                <CardRecentRecipient
                  key={item.id}
                  initials={item.initials}
                  name={item.name}
                  account={item.account}
                  onPress={() => console.log('Klik:', item.name)}
                />
              ))}
            </View>
          )}
        </View>

        <View
          style={{ height: screenHeight * 0.43, marginTop: 170 }}
          className="flex flex-col p-4 bg-white mx-4 rounded-xl"
        >
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-[16px] font-semibold">To your account</Text>
            <TouchableOpacity>
              <Text className="text-[#6F6F6F] text-[14px] font-medium">
                See All
              </Text>
            </TouchableOpacity>
          </View>
          {bankAccounts.length === 0 ? (
            <View className="mt-5 p-5 justify-center items-center">
              <PoutingIcon width={24} height={24} />
              <Text style={{ marginTop: 8, color: '#999' }}>
                Sorry, there is no data to display
              </Text>
            </View>
          ) : (
            <>
              {/* Search bar */}
              <View className="flex-row items-center border border-gray-300 rounded-xl px-3 mb-4">
                <SearchIconPrimary />
                <TextInput
                  placeholder="Search account"
                  value={search}
                  onChangeText={setSearch}
                  className="flex-1 text-[14px] "
                />
              </View>

              {/* List akun */}
              {bankAccounts.map(item => (
                <CardYourAccount
                  key={item.id}
                  bankName={item.bankName}
                  bankLogo={item.bankLogo}
                  accountHolder={item.accountHolder}
                  accountNumber={item.accountNumber}
                />
              ))}
            </>
          )}
        </View>
      </SafeAreaView>
    </>
  );
};
export default SendMoney;
