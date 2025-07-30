import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import BackIcons from '@/assets/icons/global/back-icons';
import RecomendationCard from '@/components/ui/e-commerce/card-recomendation';
import { useEcommerceStore } from '@/store/e-commerce/ecommerce';

const SuccessScreen = () => {
  const router = useRouter();
  const { selectedPayment } = useEcommerceStore();

  const isCOD = ['cod', 'bayar di tempat', 'cash on delivery'].some(keyword =>
    selectedPayment?.label.toLowerCase().includes(keyword)
  );

  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      className="flex-1 bg-[#f8f8f8]"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        className="flex-1 bg-[#f8f8f8]"
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View className="relative flex-row bg-white  items-center p-4">
          <TouchableOpacity onPress={() => router.back()}>
            <BackIcons width={24} height={24} />
          </TouchableOpacity>
        </View>
        <View className="justify-center px-4 bg-white">
          <View>
            <Image
              source={require('@/assets/images/succes.png')}
              className="w-[100px] h-[100px] self-center mb-4"
              resizeMode="contain"
            />
            <Text className="text-[18px] font-semibold text-black text-center">
              {isCOD ? 'Purchase Successful!' : 'Payment Successful!'}
            </Text>
            <Text className="text-[14px] text-[#9E9E9E] text-center mt-2">
              {isCOD
                ? 'Prepare Rp270.000 in cash to pay to the courier when receiving your order.'
                : 'Your payment has been received. Your order is being processed.'}
            </Text>
          </View>
          <View className="mt-8 flex-row justify-center pb-4">
            <TouchableOpacity className="border border-[#169953] px-6 py-2 w-[171px] h-[40px] rounded-xl mr-4 justify-center items-center">
              <Text className="text-[14px] text-primary font-semibold text-center">
                Continue Shopping
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-[#169953] px-6 py-2 w-[171px] h-[40px] rounded-xl justify-center items-center">
              <Text className="text-white font-semibold text-[14px] text-center">
                Back to Home
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex-1 bg-[#f8f8f8] mt-4">
          <RecomendationCard title="You May Like This Item" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default SuccessScreen;
