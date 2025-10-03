import BackIcons from '@/assets/icons/global/back-icons';
import SearchIconPrimary from '@/assets/icons/global/search-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { View, TouchableOpacity, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import PayTab from '../../../components/ui/order/pay';
import ProcessingTab from '../../../components/ui/order/processing';
import ShippedTab from '../../../components/ui/order/shipped';
import CanceledTab from '../../../components/ui/order/canceled';
import ComplatedTab from '../../../components/ui/order/complated';
import RefundTab from '@/components/ui/order/refund';

const OrderScreen = () => {
  const { tab } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState('Pay');

  useEffect(() => {
    if (typeof tab === 'string') {
      setActiveTab(tab);
    }
    console.log('Render tab:', activeTab);
  }, [tab]);

  console.log('Component render - activeTab:', activeTab);

  const tabs = [
    'Pay',
    'Processing',
    'Shipped',
    'Completed',
    'Canceled',
    'Refund',
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Pay':
        return <PayTab />;
      case 'Processing':
        return <ProcessingTab />;
      case 'Shipped':
        return <ShippedTab />;
      case 'Completed':
        return <ComplatedTab />;

      case 'Canceled':
        return <CanceledTab />;
      case 'Refund':
        return <RefundTab />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView edges={['top', 'left', 'right']} className=" bg-white">
      {/* Header */}
      <View className="flex-row items-center p-4">
        <TouchableOpacity onPress={() => router.back()}>
          <BackIcons width={24} height={24} fill="#000" />
        </TouchableOpacity>
        <Text className="text-black text-[16px] font-bold ml-3">My Order</Text>
        <View className="flex-1" />
        <SearchIconPrimary width={24} height={24} />
      </View>

      {/* Horizontal Scroll Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 12 }}
      >
        <View className="flex-row gap-x-3">
          {tabs.map(tab => (
            <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)}>
              <View
                className={`py-2 px-5 rounded-full ${
                  activeTab === tab
                    ? 'bg-primary border-primary'
                    : 'bg-[#F4F4F4] border-[#F4F4F4]'
                } border`}
              >
                <Text
                  className={`font-semibold ${
                    activeTab === tab ? 'text-white' : 'text-[#959595]'
                  }`}
                >
                  {tab}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Tab Content */}
      <View className=" mt-4">{renderTabContent()}</View>
    </SafeAreaView>
  );
};

export default OrderScreen;
