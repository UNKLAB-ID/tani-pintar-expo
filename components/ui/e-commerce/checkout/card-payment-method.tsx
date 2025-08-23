import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageSourcePropType,
} from 'react-native';
import { Check } from 'lucide-react-native';
import ChevronTopIcon from '@/assets/icons/e-commerce/chevron-top';
import { useEcommerceStore } from '@/store/e-commerce/ecommerce';

interface Option {
  id: number;
  label: string;
  logo: ImageSourcePropType;
  description?: string;
}

interface Section {
  key: string;
  title: string;
  options: Option[];
}

interface PaymentMethodProps {
  defaultSection?: string;
  defaultSelectedId?: number;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({
  defaultSection = 'VA',
  defaultSelectedId = 10,
}) => {
  const [selected, setSelected] = useState<number>(defaultSelectedId);
  const [expandedSection, setExpandedSection] = useState<string | null>(
    defaultSection
  );
  const { setPaymentOption } = useEcommerceStore();

  useEffect(() => {
    if (sections.length > 0) {
      const defaultOption = sections
        .flatMap(s => s.options)
        .find(o => o.id === defaultSelectedId);
      if (defaultOption) setPaymentOption(defaultOption);
    }
  }, []);

  const toggleSection = (section: string) => {
    setExpandedSection(prev => (prev === section ? null : section));
  };

  const handleSelect = (option: Option) => {
    setSelected(option.id);
    setPaymentOption(option);
  };

  const renderOption = (option: Option) => {
    const isSelected = selected === option.id;

    return (
      <TouchableOpacity
        key={option.id}
        onPress={() => handleSelect(option)}
        className={`flex-row items-center justify-between p-4 mb-3 mx-4 rounded-xl border ${
          isSelected
            ? 'bg-[#E8FBF3] border-[#00A86B]'
            : 'bg-white border-[#E0E0E0]'
        }`}
      >
        <View className="flex-row items-center gap-3">
          <Image
            source={option.logo}
            className="w-8 h-8"
            resizeMode="contain"
          />
          <View>
            <Text className="text-[#1F1F1F] font-semibold text-[14px]">
              {option.label}
            </Text>
            {option.description && (
              <Text className="text-[#828282] text-[12px]">
                {option.description}
              </Text>
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

  const sections: Section[] = [
    {
      key: 'TaniPay',
      title: 'TaniPay',
      options: [
        {
          id: 12,
          label: 'TaniPinjam',
          description: 'Limit up to Rp20 Juta! Apply on the TaniPinjam page',
          logo: require('@/assets/images/payment/bank/paylater.png'),
        },
        {
          id: 13,
          label: 'TaniPay (Balance Rp20.000)',
          description: 'Topup minimum Rp10.000',
          logo: require('@/assets/images/payment/bank/wallet.png'),
        },
      ],
    },
    {
      key: 'VA',
      title: 'Virtual Account',
      options: [
        {
          id: 10,
          label: 'BCA Virtual Account',
          logo: require('@/assets/images/payment/bank/bca.png'),
        },
        {
          id: 2,
          label: 'Mandiri Virtual Account',
          logo: require('@/assets/images/payment/bank/mandiri.png'),
        },
        {
          id: 11,
          label: 'BTN Virtual Account',
          logo: require('@/assets/images/payment/bank/btn.png'),
        },
        {
          id: 20,
          label: 'BRI Virtual Account',
          logo: require('@/assets/images/payment/bank/bri.png'),
        },
        {
          id: 21,
          label: 'BSI Virtual Account',
          logo: require('@/assets/images/payment/bank/bsi.png'),
        },
      ],
    },
    {
      key: 'Cash',
      title: 'Cash',
      options: [
        {
          id: 18,
          label: 'COD',
          logo: require('@/assets/images/payment/bank/cod.png'),
        },
      ],
    },
    {
      key: 'Outlet',
      title: 'Pay at Outlet',
      options: [
        {
          id: 1,
          label: 'Indomaret',
          logo: require('@/assets/images/payment/indomaret.png'),
        },
        {
          id: 22,
          label: 'Alfamart',
          logo: require('@/assets/images/payment/alfamart.png'),
        },
      ],
    },
  ];

  return (
    <ScrollView className="flex-1">
      {sections.map(section => (
        <View
          key={section.key}
          className={`${expandedSection !== section.key ? 'border-b border-[#E0E0E0]' : ''}`}
        >
          <TouchableOpacity
            onPress={() => toggleSection(section.key)}
            className="p-4"
          >
            <View className="flex-row items-center gap-3">
              <Text className="font-bold text-[#1F1F1F] text-[16px]">
                {section.title}
              </Text>
              <View className="justify-end ml-auto mr-2">
                <ChevronTopIcon
                  width={16}
                  height={16}
                  style={{
                    transform: [
                      {
                        rotate:
                          expandedSection === section.key ? '180deg' : '0deg',
                      },
                    ],
                  }}
                />
              </View>
            </View>
          </TouchableOpacity>
          {expandedSection === section.key && (
            <View className="border-b border-[#E0E0E0] pb-4">
              {section.options.map(renderOption)}
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

export default PaymentMethod;
