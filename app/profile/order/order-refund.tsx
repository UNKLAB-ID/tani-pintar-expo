import { View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackIcons from '@/assets/icons/global/back-icons';
import { router } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import { useState } from 'react';
import BottomAlert from '@/components/ui/order/bottom-alert';

const OrderRefund = () => {
  const itemCount = 1;
  const [alertVisible, setAlertVisible] = useState(false);
  const issues = [
    {
      id: 1,
      description: 'The goods have not arrived or are lost',
    },
    {
      id: 2,
      description: 'Damaged goods',
    },
    {
      id: 3,
      description: 'Not as described',
    },
    {
      id: 4,
      description: 'Items suspected to be counterfeit',
    },
    {
      id: 5,
      description: 'Insufficient / incomplete',
    },
  ];

  const handleIssuePress = (issue: string) => {
    if (issue === 'Insufficient / incomplete' && itemCount === 1) {
      setAlertVisible(true);
      return;
    }
    // kirim ke halaman detail refund
    router.push({
      pathname: '/profile/order/refund-detail',
      params: { issue }, // passing data ke halaman lain
    });
  };
  return (
    <SafeAreaView
      edges={['top', 'left', 'right', 'bottom']}
      className=" bg-[#f8f8f8] flex-1"
    >
      <View className="flex-row items-center p-4 bg-white border-b border-gray-200">
        <TouchableOpacity onPress={() => router.back()} className="">
          <BackIcons width={24} height={24} fill="#000" />
        </TouchableOpacity>
        <Text className="text-black text-[16px] font-bold ml-3">
          Order Return / Refund
        </Text>
      </View>
      <View className="p-4 bg-white">
        <View className=" bg-[#D7FCE8] p-4 rounded-xl flex-row  gap-x-3">
          <Image
            source={require('@/assets/images/trash/image18.png')}
            className="w-10 h-10 resize-contain rounded-full"
          />
          <View className="flex-1 ">
            <Text className="text-black font-semibold text-[14px] ">
              Discussion with Rizat Farm
            </Text>
            <Text className="text-[#5A5A5A] text-[14px] mt-1">
              For a faster resolution process, discuss your problem with the
              seller first.
            </Text>
            <TouchableOpacity className="py-2 px-3 bg-primary mt-3 rounded-xl items-center">
              <Text className="text-white font-semibold text-[14px]">
                Chat with Seller
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View className="bg-white mt-3 p-4">
        <Text className="text-black font-semibold text-[16px] mb-3">
          What’s the problem with your order?
        </Text>
        <Text className="text-[#5A5A5A] text-[14px]">
          Make sure to return the item through Taniverse to protect your rights.
        </Text>
        <View className="mt-4 space-y-3">
          {issues.map((item, issue) => {
            const isDisabled =
              item.description === 'Insufficient / incomplete' &&
              itemCount === 1;
            return (
              <TouchableOpacity
                onPress={() => handleIssuePress(item.description)}
                key={item.id}
                className="rounded-xl py-3 flex-row justify-between items-center px-2 "
              >
                <Text
                  className={`text-[14px] ${isDisabled ? 'text-[#c8c8c8]' : 'text-black'}`}
                >
                  {item.description}
                </Text>
                <ArrowRight />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <BottomAlert
        visible={alertVisible}
        message="Complaints about insufficient/incomplete items do not apply to transactions of 1 item."
        onClose={() => setAlertVisible(false)}
      />
    </SafeAreaView>
  );
};
export default OrderRefund;
