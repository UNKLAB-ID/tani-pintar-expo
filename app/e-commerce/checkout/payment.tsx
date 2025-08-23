import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
  ImageSourcePropType,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Check } from 'lucide-react-native';

import BackIcons from '@/assets/icons/global/back-icons';
import ChevronTopIcon from '@/assets/icons/e-commerce/chevron-top';
import { useEcommerceStore } from '@/store/e-commerce/ecommerce';
import PaymentMethod from '@/components/ui/e-commerce/checkout/card-payment-method';

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

  const handleSelect = (
    id: number,
    label: string,
    logo: ImageSourcePropType
  ) => {
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
    logo: ImageSourcePropType;
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

        <PaymentMethod defaultSection="VA" defaultSelectedId={10} />
      </SafeAreaView>
    </>
  );
};

export default PaymentScreen;
