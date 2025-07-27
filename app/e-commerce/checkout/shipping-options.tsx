import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import ShippingIcon from '@/assets/icons/e-commerce/ship-icon';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackIcons from '@/assets/icons/global/back-icons';
import { Ionicons } from '@expo/vector-icons';

type ShippingOption = {
  id: number;
  label: string;
  cost: number;
  discountCost?: number;
  eta: string;
  isVoucherApplied: boolean;
};

const shippingOptions: ShippingOption[] = [
  {
    id: 1,
    label: 'Express',
    cost: 20000,
    eta: 'Estimated arrival of goods March 16',
    isVoucherApplied: false,
  },
  {
    id: 2,
    label: 'Standard',
    cost: 0,
    discountCost: 30000,
    eta: 'Estimated arrival of goods March 18',
    isVoucherApplied: true,
  },
  {
    id: 3,
    label: 'Cargo',
    cost: 25000,
    eta: 'Estimated arrival of goods March 19',
    isVoucherApplied: false,
  },
];

const ShippingOptionsScreen = () => {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<number | null>(1); // default terpilih Express

  const handleSelect = (option: ShippingOption) => {
    setSelectedId(option.id);
    // Simpan ke global state jika perlu
    console.log('[SELECTED SHIPPING]', option);
  };

  return (
    <>
      <StatusBar
        backgroundColor="#169953"
        barStyle="light-content"
        translucent={false}
      />
      <SafeAreaView
        className="flex-1 pt-3 bg-primary"
        edges={['top', 'left', 'right']}
      >
        <View className="flex-row items-center space-x-2 px-5 py-2">
          <TouchableOpacity className="p-1 mr-2" onPress={() => router.back()}>
            <BackIcons width={20} height={20} color="#FFF" />
          </TouchableOpacity>
          <Text className="text-white text-[14px]">Back to Checkout</Text>
        </View>

        <View className="flex-1 bg-primary p-4">
          <View className="flex-row items-center mb-4">
            <Text className="text-[20px] font-semibold text-white mr-3">
              Select Shipping
            </Text>
            <ShippingIcon width={24} height={24} color="#fff" />
          </View>

          <View className="bg-white rounded-xl px-3 py-4">
            <FlatList
              data={shippingOptions}
              keyExtractor={item => item.id.toString()}
              scrollEnabled={false}
              renderItem={({ item }) => {
                const selected = selectedId === item.id;

                return (
                  <TouchableOpacity
                    onPress={() => handleSelect(item)}
                    className="flex-row items-start space-x-3 p-4 mb-3 rounded-xl border-b border-[#f0f0f0]"
                  >
                    <View className="mt-1 mr-2">
                      {selected ? (
                        <Ionicons
                          name="radio-button-on"
                          size={18}
                          color="#169953"
                        />
                      ) : (
                        <Ionicons
                          name="radio-button-off"
                          size={18}
                          color="#DCDCDC"
                        />
                      )}
                    </View>

                    <ShippingIcon width={24} height={24} color="#169953" />

                    <View className="flex-1 ml-3">
                      <View className="flex-row items-center mb-1 flex-wrap">
                        <Text className="text-[14px] text-[#1F1F1F] font-medium">
                          {item.label}
                        </Text>

                        <Text className="text-[14px] mx-2 text-[#1F1F1F]">
                          (Rp{item.cost.toLocaleString()})
                        </Text>

                        {(item.discountCost || item.isVoucherApplied) && (
                          <Text className="text-[12px] text-[#9E9E9E] line-through">
                            Rp
                            {(item.discountCost ?? item.cost).toLocaleString()}
                          </Text>
                        )}
                      </View>

                      <Text className="text-[12px] text-[#9E9E9E]">
                        {item.eta}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>

          <View className="mt-6">
            <TouchableOpacity className="bg-primary rounded-xl py-3 items-center border">
              <Text className="text-white text-[14px] font-medium">Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default ShippingOptionsScreen;
