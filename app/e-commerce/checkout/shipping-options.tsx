import React, { useState, useEffect } from 'react';
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
import { useEcommerceStore } from '@/store/e-commerce/ecommerce';

type ShippingOption = {
  id: number;
  label: string;
  cost: number;
  discountCost?: number;
  eta: string;
  isVoucherApplied: boolean;
};

const defaultOptions: ShippingOption[] = [
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
    cost: 30000,
    eta: 'Estimated arrival of goods March 18',
    isVoucherApplied: false,
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
  const { shippingVoucher, setSelectedShipping, selectedShipping } =
    useEcommerceStore();

  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(
    selectedShipping?.id ?? 1
  );

  useEffect(() => {
    // Terapkan voucher jika ada
    const updatedOptions = defaultOptions.map(option => {
      if (shippingVoucher && option.id === selectedId) {
        return {
          ...option,
          discountCost: option.cost,
          cost: Math.max(option.cost - shippingVoucher.value, 0),
          isVoucherApplied: true,
        };
      } else {
        return {
          ...option,
          isVoucherApplied: false,
        };
      }
    });

    setShippingOptions(updatedOptions);
  }, [shippingVoucher, selectedId]);

  const handleSelect = (option: ShippingOption) => {
    const updated = { ...option };

    if (shippingVoucher) {
      updated.discountCost = option.cost;
      updated.cost = Math.max(option.cost - shippingVoucher.value, 0);
      updated.isVoucherApplied = true;
    }

    setSelectedId(option.id);
    setSelectedShipping(updated);
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
        {/* Header */}
        <View className="flex-row items-center space-x-2 px-5 py-2">
          <TouchableOpacity className="p-1 mr-2" onPress={() => router.back()}>
            <BackIcons width={20} height={20} color="#FFF" />
          </TouchableOpacity>
          <Text className="text-white text-[14px]">Back to Checkout</Text>
        </View>

        <View className="flex-1 bg-primary ">
          <View
            className="flex-row items-center mb-4 p-4"
            style={{ paddingBottom: 120 }}
          >
            <Text className="text-[20px] font-semibold text-white mr-3">
              Select Shipping
            </Text>
            <ShippingIcon width={24} height={24} color="#fff" />
          </View>
          {/* List Shipping Options */}
          <View
            className="flex-1 absolute w-full h-ful "
            style={{ top: 90, zIndex: 10 }}
          >
            <View
              className="bg-white rounded-xl p-4 mx-4"
              style={{
                // Android
                elevation: 10,
                // iOS
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.15,
                shadowRadius: 10,
              }}
            >
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

                          {item.isVoucherApplied ? (
                            <>
                              <Text className="text-[12px] text-[#9E9E9E] line-through">
                                Rp{item.discountCost?.toLocaleString()}
                              </Text>
                              <Text className="text-[14px] text-[#00A86B] font-semibold">
                                Rp{item.cost.toLocaleString()}
                              </Text>
                            </>
                          ) : (
                            <Text className="text-[14px] text-[#1F1F1F]">
                              Rp{item.cost.toLocaleString()}
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
          </View>

          <View className="flex-1 bg-white w-full">
            <View
              className="flex-1 justify-end p-4 mb-4"
              style={{ bottom: 300 }}
            >
              <TouchableOpacity
                onPress={() => router.back()}
                className="bg-primary rounded-xl py-3 items-center "
              >
                <Text className="text-white text-[14px] font-medium">Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default ShippingOptionsScreen;
