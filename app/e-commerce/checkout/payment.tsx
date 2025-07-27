import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Check } from 'lucide-react-native';

import BackIcons from '@/assets/icons/global/back-icons';
import ChevronTopIcon from '@/assets/icons/e-commerce/chevron-top';
import { useEcommerceStore } from '@/store/e-commerce/ecommerce';

const PaymentScreen = () => {
  const [selected, setSelected] = useState<number>(10); // Default: BCA VA
  const [expandedSection, setExpandedSection] = useState<string | null>('VA');

  const { setPaymentOption } = useEcommerceStore();

  useEffect(() => {
    // Set default BCA VA on first render
    setPaymentOption({
      id: 10,
      label: 'BCA Virtual Account',
      logo: require('@/assets/images/payment/bank/bca.png'),
    });
  }, []);

  const toggleSection = (section: string) => {
    setExpandedSection(prev => (prev === section ? null : section));
  };

  const handleSelect = (id: number, label: string, logo: any) => {
    setSelected(id);
    setPaymentOption({ id, label, logo });
  };

  const renderOption = ({
    id,
    label,
    logo,
    description,
  }: {
    id: number;
    label: string;
    logo: any;
    description?: string;
  }) => {
    const isSelected = selected === id;

    return (
      <TouchableOpacity
        onPress={() => handleSelect(id, label, logo)}
        className={`flex-row items-center justify-between p-4 mb-3 mx-4 rounded-xl border ${
          isSelected
            ? 'bg-[#E8FBF3] border-[#00A86B]'
            : 'bg-white border-[#E0E0E0]'
        }`}
      >
        <View className="flex-row items-center gap-3">
          <Image source={logo} className="w-8 h-8" resizeMode="contain" />
          <View>
            <Text className="text-[#1F1F1F] font-semibold text-[14px]">
              {label}
            </Text>
            {description && (
              <Text className="text-[#828282] text-[12px]">{description}</Text>
            )}
          </View>
        </View>
        <View
          className={`w-5 h-5 rounded-full border ${
            isSelected ? 'bg-[#00A86B] border-[#00A86B]' : 'border-[#BDBDBD]'
          } items-center justify-center`}
        >
          {isSelected && <Check size={12} color="white" />}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <SafeAreaView className="flex-1 bg-white">
        {/* Header */}
        <View className="flex-row items-center p-4 border-b border-[#E0E0E0]">
          <TouchableOpacity onPress={() => router.back()}>
            <BackIcons width={24} height={24} />
          </TouchableOpacity>
          <Text className="font-semibold text-[16px] ml-2">Payment Method</Text>
        </View>

        <ScrollView className="flex-1">
          {/* TaniPay Section */}
          <View
            className={`${expandedSection !== 'TaniPay' ? 'border-b border-[#E0E0E0]' : ''}`}
          >
            <TouchableOpacity
              onPress={() => toggleSection('TaniPay')}
              className="p-4"
            >
              <View className="flex-row items-center gap-3">
                <Text className="font-bold text-[#1F1F1F] text-[16px]">
                  TaniPay
                </Text>
                <View className="justify-end ml-auto mr-2">
                  <ChevronTopIcon
                    width={16}
                    height={16}
                    style={{
                      transform: [
                        {
                          rotate:
                            expandedSection === 'TaniPay' ? '180deg' : '0deg',
                        },
                      ],
                    }}
                  />
                </View>
              </View>
            </TouchableOpacity>
            {expandedSection === 'TaniPay' && (
              <View className="border-b border-[#E0E0E0] pb-4">
                {renderOption({
                  id: 12,
                  label: 'TaniPinjam',
                  description:
                    'Limit up to Rp20 Juta! Apply on the TaniPinjam page',
                  logo: require('@/assets/images/payment/bank/paylater.png'),
                })}
                {renderOption({
                  id: 13,
                  label: 'TaniPay (Balance Rp20.000)',
                  description: 'Topup minimum Rp10.000',
                  logo: require('@/assets/images/payment/bank/wallet.png'),
                })}
              </View>
            )}
          </View>

          {/* Virtual Account Section */}
          <View
            className={`${expandedSection !== 'VA' ? 'border-b border-[#E0E0E0]' : ''}`}
          >
            <TouchableOpacity
              onPress={() => toggleSection('VA')}
              className="p-4"
            >
              <View className="flex-row items-center gap-3">
                <Text className="font-bold text-[#1F1F1F] text-[16px]">
                  Virtual Account
                </Text>
                <View className="justify-end ml-auto mr-2">
                  <ChevronTopIcon
                    width={16}
                    height={16}
                    style={{
                      transform: [
                        {
                          rotate: expandedSection === 'VA' ? '180deg' : '0deg',
                        },
                      ],
                    }}
                  />
                </View>
              </View>
            </TouchableOpacity>
            {expandedSection === 'VA' && (
              <View className="border-b border-[#E0E0E0] pb-4">
                {renderOption({
                  id: 10,
                  label: 'BCA Virtual Account',
                  logo: require('@/assets/images/payment/bank/bca.png'),
                })}
                {renderOption({
                  id: 2,
                  label: 'Mandiri Virtual Account',
                  logo: require('@/assets/images/payment/bank/mandiri.png'),
                })}
                {renderOption({
                  id: 11,
                  label: 'BTN Virtual Account',
                  logo: require('@/assets/images/payment/bank/btn.png'),
                })}
                {renderOption({
                  id: 20,
                  label: 'BRI Virtual Account',
                  logo: require('@/assets/images/payment/bank/bri.png'),
                })}
                {renderOption({
                  id: 21,
                  label: 'BSI Virtual Account',
                  logo: require('@/assets/images/payment/bank/bsi.png'),
                })}
              </View>
            )}
          </View>

          {/* Cash Section */}
          <View
            className={`${expandedSection !== 'Cash' ? 'border-b border-[#E0E0E0]' : ''}`}
          >
            <TouchableOpacity
              onPress={() => toggleSection('Cash')}
              className="p-4"
            >
              <View className="flex-row items-center gap-3">
                <Text className="font-bold text-[#1F1F1F] text-[16px]">
                  Cash
                </Text>
                <View className="justify-end ml-auto mr-2">
                  <ChevronTopIcon
                    width={16}
                    height={16}
                    style={{
                      transform: [
                        {
                          rotate:
                            expandedSection === 'Cash' ? '180deg' : '0deg',
                        },
                      ],
                    }}
                  />
                </View>
              </View>
            </TouchableOpacity>
            {expandedSection === 'Cash' && (
              <View className="border-b border-[#E0E0E0] pb-4">
                {renderOption({
                  id: 18,
                  label: 'COD',
                  logo: require('@/assets/images/payment/bank/cod.png'),
                })}
              </View>
            )}
          </View>

          {/* Pay at Outlet Section */}
          <View
            className={`${expandedSection !== 'Outlet' ? 'border-b border-[#E0E0E0]' : ''}`}
          >
            <TouchableOpacity
              onPress={() => toggleSection('Outlet')}
              className="p-4"
            >
              <View className="flex-row items-center gap-3">
                <Text className="font-bold text-[#1F1F1F] text-[16px]">
                  Pay at Outlet
                </Text>
                <View className="justify-end ml-auto mr-2">
                  <ChevronTopIcon
                    width={16}
                    height={16}
                    style={{
                      transform: [
                        {
                          rotate:
                            expandedSection === 'Outlet' ? '180deg' : '0deg',
                        },
                      ],
                    }}
                  />
                </View>
              </View>
            </TouchableOpacity>
            {expandedSection === 'Outlet' && (
              <View className="border-b border-[#E0E0E0] pb-4">
                {renderOption({
                  id: 1,
                  label: 'Indomaret',
                  logo: require('@/assets/images/payment/indomaret.png'),
                })}
                {renderOption({
                  id: 22,
                  label: 'Alfamart',
                  logo: require('@/assets/images/payment/alfamart.png'),
                })}
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default PaymentScreen;
