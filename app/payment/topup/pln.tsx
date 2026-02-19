import { TransferHeader } from '@/components/ui/payment/transfer-header';
import PhoneInputCard from '@/components/ui/topup/PhoneInputCard';
import ProductCard from '@/components/ui/topup/ProductTopUpCard';
import TopUpTabs from '@/components/ui/topup/TopUpTabs';

import { router } from 'expo-router';
import { CloudLightningIcon } from 'lucide-react-native';
import { useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/* ================== TABS ================== */

const plnTabs = [
  { key: 'TOKEN', label: 'Electricity Token' },
  { key: 'BILL', label: 'Electricity Bills' },
] as const;

type PlnTab = (typeof plnTabs)[number]['key'];

/* ================== DATA ================== */

const plnTokenData = [
  { nominal: 25000, price: 20000 },
  { nominal: 50000, price: 50000 },
  { nominal: 100000, price: 100000 },
  { nominal: 200000, price: 200000 },
];

/* ================== SCREEN ================== */

export default function TopUpPlnScreen() {
  const [meterNumber, setMeterNumber] = useState('');
  const [activeTab, setActiveTab] = useState<PlnTab>('TOKEN');
  const [selectedToken, setSelectedToken] = useState<any>(null);

  // 🔥 simulasi validasi meter (nanti ganti API)
  const isInvalid = meterNumber.length > 0 && meterNumber.length < 8;

  const showPayment = activeTab === 'TOKEN' && selectedToken;
  const totalPrice = selectedToken?.price ?? 0;

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
            title="PLN Electricity"
            subtitle="Top up electricity token or pay electricity bills"
            onBack={() => router.back()}
          />

          <View style={{ marginTop: '-10%' }}>
            {/* INPUT METER */}
            <PhoneInputCard
              value={meterNumber}
              label="Meter Number"
              placeholder="Input your meter number"
              rightIcon={<CloudLightningIcon size={18} color="#169953" />}
              errorText={
                isInvalid ? 'Customer Number Not Available' : undefined
              }
              showClear={meterNumber.length > 0}
              onChange={val => {
                setMeterNumber(val.replace(/[^0-9]/g, ''));
                setSelectedToken(null);
              }}
              onClear={() => {
                setMeterNumber('');
                setSelectedToken(null);
              }}
            />

            {/* TABS */}
            {meterNumber.length > 0 && !isInvalid && (
              <TopUpTabs<PlnTab>
                tabs={plnTabs}
                activeTab={activeTab}
                onChangeTab={setActiveTab}
              />
            )}

            {/* TOKEN LIST */}
            {meterNumber && !isInvalid && activeTab === 'TOKEN' && (
              <FlatList
                data={plnTokenData}
                numColumns={2}
                columnWrapperStyle={{ gap: 12 }}
                contentContainerStyle={{
                  paddingHorizontal: 16,
                  paddingTop: 16,
                  paddingBottom: 140,
                }}
                renderItem={({ item }) => (
                  <ProductCard
                    item={item}
                    variant="pln"
                    selected={selectedToken?.nominal === item.nominal}
                    onPress={() => setSelectedToken(item)}
                  />
                )}
              />
            )}
          </View>

          {/* PAYMENT BAR */}
          {showPayment && (
            <View className="absolute bottom-0 left-0 right-0 bg-white px-4 py-3 flex-row justify-between border-t border-gray-200">
              <View>
                <Text className="text-xs text-gray-500">Total Payment</Text>
                <Text className="text-lg font-semibold">
                  Rp{totalPrice.toLocaleString()}
                </Text>
              </View>

              <SafeAreaView edges={['bottom']}>
                <TouchableOpacity className="bg-primary px-6 py-3 rounded-full">
                  <Text className="text-white font-medium">Continue Pay</Text>
                </TouchableOpacity>
              </SafeAreaView>
            </View>
          )}
        </View>
      </SafeAreaView>
    </>
  );
}
