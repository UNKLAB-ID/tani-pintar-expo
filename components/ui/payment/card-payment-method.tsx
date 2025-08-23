import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import WalletSendMoneyIcon from '@/assets/icons/payment/wallet-sendmoney-icon';
import ChevronDownIcon from '@/assets/icons/e-commerce/chevrondown-icons';
import TreePointPrimaryIcon from '@/assets/icons/payment/tree-point-primary-icon';
import ModalSelectMethod from './modal-select-method';
import { router } from 'expo-router';

type PaymentMethodCardProps = {
  method?: string;
  balance: number;
  amount: number;
  onPress: () => void;
};

export const PaymentMethodCard = ({
  method = 'Tani Pay',
  balance,
  amount,
  onPress,
}: PaymentMethodCardProps) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(method);
  const isInsufficient = amount > 0 && balance < amount;

  return (
    <View className="bg-white p-4 rounded-xl shadow-md">
      <TouchableOpacity onPress={() => setShowModal(true)}>
        <View className="flex-row items-center">
          {isInsufficient ? (
            <TreePointPrimaryIcon width={24} height={24} />
          ) : (
            <WalletSendMoneyIcon width={24} height={24} />
          )}

          <Text
            className={`ml-3 text-[16px] font-medium ${
              isInsufficient ? 'text-primary' : 'text-[#6F6F6F]'
            }`}
          >
            {isInsufficient ? 'Select a method' : selectedMethod}
          </Text>

          <View className="flex-1" />
          <ChevronDownIcon width={24} height={24} />
        </View>
      </TouchableOpacity>
      <ModalSelectMethod
        visible={showModal}
        onClose={() => setShowModal(false)}
        balance={balance}
        amount={amount}
        onSelect={method => {
          setSelectedMethod(method);
          router.push('/payment/send-money-topup');
          setShowModal(false);
        }}
      />
    </View>
  );
};
