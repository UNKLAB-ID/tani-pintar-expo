import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, StatusBar, Alert, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
//components

import { TransferHeader } from '@/components/ui/payment/transfer-header';
import WalletSendMoneyIcon from '@/assets/icons/payment/wallet-sendmoney-icon';

const CashWithDrawCode = () => {
  const [time, setTime] = useState({
    hours: 1,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prev => {
        let { hours, minutes, seconds } = prev;

        if (hours === 0 && minutes === 0 && seconds === 0) {
          clearInterval(timer);
          return prev;
        }

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const format = (num: number) => String(num).padStart(2, '0');
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
        {/* Header */}
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
          <TransferHeader
            title="Cash Withdraw Code"
            subtitle="Show this code to the merchant cashier"
            onBack={() => router.back()}
          />
        </View>

        {/* Main Content */}
        <View style={{ marginTop: 140, paddingHorizontal: 16, flex: 1 }}>
          {/* Countdown Box */}
          <View className="bg-white p-6 rounded-xl items-center">
            <Text className="mb-5 text-[14px] text-[#6F6F6F] font-medium">
              Remaining withdraw time in :
            </Text>
            <View className="flex-row items-center">
              {[time.hours, time.minutes, time.seconds].map((val, idx) => (
                <React.Fragment key={idx}>
                  <View className="w-12 h-12 border border-primary rounded-xl bg-[#D7FCE8] items-center justify-center mx-1">
                    <Text className="font-semibold text-[16px] text-[#1F1F1F]">
                      {format(val)}
                    </Text>
                  </View>
                  {idx < 2 && (
                    <Text className="mx-1 font-semibold text-[16px]">:</Text>
                  )}
                </React.Fragment>
              ))}
            </View>
          </View>

          {/* Withdraw Code Card */}
          <View className="bg-white rounded-xl p-5 items-center mt-4">
            <View className="flex-row items-center mb-3">
              <WalletSendMoneyIcon width={24} height={24} />
              <Text className="ml-2  text-[16px] text-[#525252]">TaniPay</Text>
            </View>
            <View className="bg-[#D7FCE8] w-full rounded-xl p-4 items-center">
              <Text className="text-[12px] text-[#787878] mb-1">
                Cash Withdrawal Code
              </Text>
              <Text className="text-[22px] font-bold tracking-widest text-[#1F1F1F] mb-3">
                1620 6250 0973
              </Text>
            </View>

            <View className="w-full flex-row justify-between border-t border-[#F2F2F2] pt-3">
              <Text className="text-[12px] text-[#6F6F6F]">
                Cash withdraw amount
              </Text>
              <Text className="text-[14px] font-semibold text-primary">
                Rp50.000
              </Text>
            </View>
          </View>

          {/* Instruction */}
          <View className="bg-white rounded-xl p-5 mt-4 flex-1">
            <Text className="font-semibold text-[14px] text-[#1F1F1F] mb-3">
              How to Withdraw Cash at Indomaret
            </Text>
            {[
              'Visit Indomaret and tell the cashier that you want to withdraw cash from TaniPay.',
              'Tell the cashier your TaniPay mobile number.',
              'Show the cash withdrawal code and tell the amount you want to withdraw.',
              'The merchant will deduct Rp50.000 from your TaniPay balance.',
              'Be sure to receive the money from the cashier and check the transaction history. Save the receipt as proof.',
            ].map((step, idx) => (
              <View key={idx} className="flex-row mb-3">
                <View className="w-5 h-5 rounded-full bg-[#E8E8E8] items-center justify-center mr-2">
                  <Text className="text-[12px] font-semibold text-[#1F1F1F]">
                    {idx + 1}
                  </Text>
                </View>
                <Text className="flex-1 text-[13px] text-[#6F6F6F]">
                  {step}
                </Text>
              </View>
            ))}
          </View>

          {/* Cancel Button */}
          <View className="items-center mt-4">
            <TouchableOpacity className="border border-primary py-4 rounded-xl w-full items-center">
              <Text className="text-primary text-[14px] font-semibold">
                Cancel Cash Withdraw
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default CashWithDrawCode;
