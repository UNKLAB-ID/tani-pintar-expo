import { TransferHeader } from '@/components/ui/payment/transfer-header';
import DataPackageCard from '@/components/ui/topup/DataPackageCard';
import PhoneInputCard from '@/components/ui/topup/PhoneInputCard';
import ProductCard from '@/components/ui/topup/ProductTopUpCard';
import TopUpTabs from '@/components/ui/topup/TopUpTabs';

import {
  detectOperator,
  OperatorKey,
} from '@/utils/detect-operator/detectOperator';
import { useEcommerceStore } from '@/store/e-commerce/ecommerce';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/* ================== TABS ================== */

type PulsaTab = 'PULSA' | 'DATA';

const pulsaTabs: { key: PulsaTab; label: string }[] = [
  { key: 'PULSA', label: 'Pulsa' },
  { key: 'DATA', label: 'Data Packages' },
];

/* ================== DATA ================== */

const pulsaData: Record<OperatorKey, any[]> = {
  TELKOMSEL: [
    {
      nominal: 10000,
      price: 10500,
      originalPrice: 11000,
      promo: '5%',
      period: 'Active period 20 days',
    },
    {
      nominal: 15000,
      price: 16500,
      period: 'Active period 20 days',
    },
    {
      nominal: 25000,
      price: 26500,
      period: 'Active period 30 days',
    },
    {
      nominal: 50000,
      price: 51500,
      period: 'Active period 30 days',
    },
  ],
  INDOSAT: [
    {
      nominal: 10000,
      price: 10200,
      period: 'Active period 20 days',
    },
    {
      nominal: 20000,
      price: 20500,
      period: 'Active period 30 days',
    },
    {
      nominal: 50000,
      price: 51000,
      period: 'Active period 30 days',
    },
  ],
  XL: [
    {
      nominal: 15000,
      price: 15500,
      period: 'Active period 30 days',
    },
    {
      nominal: 25000,
      price: 25500,
      period: 'Active period 30 days',
    },
  ],
};

const dataPackageData = [
  {
    title: 'Telkomsel Freedom 10GB',
    description: 'Nikmati internet cepat sepuasnya',
    price: 45000,
    bestSeller: true,
  },
  {
    title: 'Telkomsel Unlimited Chat & Sosmed 5GB',
    description: 'WhatsApp, IG, TikTok',
    price: 30000,
    bestSeller: true,
  },
];

/* ================== SCREEN ================== */

export default function TopUpPulsaScreen() {
  const { setTopUpData } = useEcommerceStore();
  const [phone, setPhone] = useState('');
  const [operator, setOperator] = useState<OperatorKey | null>(null);
  const [activeTab, setActiveTab] = useState<PulsaTab>('PULSA');
  const [selectedPulsa, setSelectedPulsa] = useState<any>(null);
  const [selectedData, setSelectedData] = useState<any>(null);

  const onChangePhone = (value: string) => {
    const clean = value.replace(/[^0-9]/g, '');
    setPhone(clean);
    setOperator(detectOperator(clean));
    setActiveTab('PULSA');
    setSelectedPulsa(null);
    setSelectedData(null);
  };

  const totalPrice =
    activeTab === 'PULSA' ? selectedPulsa?.price : selectedData?.price;

  const showPayment =
    (activeTab === 'PULSA' && selectedPulsa) ||
    (activeTab === 'DATA' && selectedData);

  return (
    <>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      <SafeAreaView style={{ flex: 1, backgroundColor: '#f6f6f6' }}>
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
          }}
        >
          {/* HEADER */}
          <TransferHeader
            title="Pulsa"
            subtitle="You can top up your credit and buy data packages here"
            onBack={() => router.back()}
          />

          <View style={{ marginTop: '-10%' }}>
            {/* INPUT */}
            <PhoneInputCard
              value={phone}
              label="Phone Number"
              placeholder="Input your mobile phone number"
              showClear={phone.length > 0}
              operator={operator}
              onChange={onChangePhone}
              onClear={() => {
                setPhone('');
                setOperator(null);
                setSelectedPulsa(null);
                setSelectedData(null);
              }}
            />

            {/* TABS */}
            {operator && (
              <TopUpTabs<PulsaTab>
                tabs={pulsaTabs}
                activeTab={activeTab}
                onChangeTab={setActiveTab}
              />
            )}

            {/* PULSA */}
            {operator && activeTab === 'PULSA' && (
              <FlatList
                data={pulsaData[operator]}
                numColumns={2}
                columnWrapperStyle={{ gap: 12 }}
                contentContainerStyle={{
                  paddingHorizontal: 16,
                  paddingBottom: 180,
                  marginTop: 8,
                }}
                renderItem={({ item }) => (
                  <ProductCard
                    item={item}
                    variant="pulsa"
                    selected={selectedPulsa?.nominal === item.nominal}
                    onPress={() => setSelectedPulsa(item)}
                  />
                )}
              />
            )}

            {/* DATA */}
            {operator && activeTab === 'DATA' && (
              <FlatList
                data={dataPackageData}
                keyExtractor={item => item.title}
                contentContainerStyle={{
                  paddingHorizontal: 16,
                  paddingBottom: 140,
                  marginTop: 8,
                }}
                renderItem={({ item }) => (
                  <DataPackageCard
                    item={item}
                    selected={selectedData?.title === item.title}
                    onPress={() => setSelectedData(item)}
                  />
                )}
              />
            )}

            {/* EMPTY STATE */}
            {!operator && (
              <View className="flex-row items-center mt-8 px-6">
                <Image
                  source={require('@/assets/images/TopUpPulsa.png')}
                  style={{ width: 120, height: 120 }}
                  resizeMode="contain"
                />
                <View className="ml-4 flex-1">
                  <Text className="text-[16px] font-semibold mb-2">
                    Top up your phone credit?
                  </Text>
                  <Text className="text-[13px] text-gray-500">
                    Enter the number, just wait a few seconds
                  </Text>
                </View>
              </View>
            )}
          </View>

          {/* PAYMENT BAR */}
          {showPayment && (
            <SafeAreaView edges={['bottom']} className="bg-white">
              <View className="bg-white px-4 py-3 flex-row justify-between">
                <View>
                  <Text className="text-xs text-gray-500">Total Payment</Text>
                  <Text className="text-lg font-semibold">
                    Rp{totalPrice.toLocaleString()}
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => {
                    // Save topup data to store
                    if (activeTab === 'PULSA' && selectedPulsa) {
                      setTopUpData({
                        phoneNumber: phone,
                        operator,
                        nominal: selectedPulsa.nominal,
                        price: selectedPulsa.price,
                        originalPrice: selectedPulsa.originalPrice,
                        period: selectedPulsa.period,
                        promo: selectedPulsa.promo,
                        type: 'PULSA',
                      });
                    } else if (activeTab === 'DATA' && selectedData) {
                      setTopUpData({
                        phoneNumber: phone,
                        operator,
                        nominal: 0,
                        price: selectedData.price,
                        period: selectedData.description,
                        type: 'DATA',
                      });
                    }
                    router.push('/payment/topup/pulsa/payment-pulsa');
                  }}
                  className="bg-primary px-6 py-3 rounded-full"
                >
                  <Text className="text-white font-medium">Continue Pay</Text>
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          )}
        </View>
      </SafeAreaView>
    </>
  );
}
