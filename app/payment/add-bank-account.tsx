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
import ChevronDownIcon from '@/assets/icons/e-commerce/chevrondown-icons';
import ModalBankList from '@/components/ui/payment/modal-bank-list';
import { TransferHeader } from '@/components/ui/payment/transfer-header';
import { bankList } from '@/assets/data/listStore';

const AddBankAccount = () => {
  const [accountNumber, setAccountNumber] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedBank, setSelectedBank] = useState({
    name: 'Bank BCA',
    logo: require('@/assets/images/payment/bank/bca.png'),
  });

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <SafeAreaView
        edges={['top', 'bottom']}
        style={{
          flex: 1,
          backgroundColor: '#f8f8f8',
          justifyContent: 'space-between',
        }}
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
            title=" Add Bank Account"
            subtitle="Choose delivery bank account method"
            onBack={() => router.back()}
          />
        </View>

        <View style={{ top: 195 }} className="absolute w-full px-4 z-10">
          <View className="shadow-md bg-white p-4 rounded-xl">
            <Text className="text-[#6F6F6F] text-[12px] font-medium">
              Account Number
            </Text>
            <TextInput
              placeholder="Enter bank account number"
              placeholderTextColor="#AAAAAA"
              className="border-b border-[#D3D3D3]"
              value={accountNumber}
              onChangeText={setAccountNumber}
            />
            <Text className="text-[#6F6F6F] text-[12px] font-medium mt-3">
              Account Number
            </Text>
            <TouchableOpacity
              onPress={() => setShowModal(true)}
              className="flex-row items-center border-b py-3 border-[#D3D3D3] "
            >
              <Image
                source={selectedBank.logo}
                resizeMode="cover"
                className="w-8 h-8 rounded-full "
              />
              <Text className="ml-3 text-[14px]">{selectedBank.name}</Text>
              <View className="flex-1" />
              <ChevronDownIcon width={20} height={20} />
            </TouchableOpacity>
          </View>
        </View>
        <View
          className="items-center bg-white p-3 rounded-xl"
          style={{ top: 755 }}
        >
          <TouchableOpacity
            onPress={() => router.push('/payment/send-to-bank')}
            disabled={!accountNumber.trim()}
            className={` rounded-xl w-full py-3 items-center
           ${accountNumber.trim() ? 'bg-primary' : 'bg-[#e9e9e9]'}`}
          >
            <Text
              className={`text-[16px] font-semibold ${accountNumber.trim() ? 'text-white' : 'text-[#D3D3D3]'}`}
            >
              Continue
            </Text>
          </TouchableOpacity>
        </View>
        <ModalBankList
          data={bankList}
          onSelectItem={val => console.log('Selected Bank:', val)}
          visible={showModal}
          onClose={() => setShowModal(false)}
        />
      </SafeAreaView>
    </>
  );
};

export default AddBankAccount;
