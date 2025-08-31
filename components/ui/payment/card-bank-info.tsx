import React from 'react';
import { View, Text, Image, ViewStyle, ImageStyle } from 'react-native';
import { formatPrice } from '@/utils/format-currency/currency';

interface InfoCardProps {
  icon?: any;
  title: string;
  subtitle?: string;
  initials?: string;
  maskedInfo?: string;
  balanceLabel?: string;
  balance: number;
  iconStyle?: ImageStyle;
  iconContainerStyle?: ViewStyle;
  renderCustomIcon?: React.ReactNode;
  titleIcon?: React.ReactNode;
}

export const InfoBalanceCard = ({
  icon,
  title,
  subtitle,
  initials,
  maskedInfo,
  balanceLabel = 'Your Balance',
  balance,
  iconStyle,
  iconContainerStyle,
  renderCustomIcon,
  titleIcon,
}: InfoCardProps) => {
  return (
    <View className="shadow-md bg-white p-4 rounded-xl">
      {/* Header */}
      <View className="flex flex-col border-b py-3 border-[#D3D3D3]">
        <View className="flex-row items-center">
          {icon ? (
            <Image
              source={icon}
              resizeMode="contain"
              style={[
                { width: 28, height: 28, borderRadius: 6, marginRight: 12 },
                iconStyle,
              ]}
            />
          ) : initials ? (
            <View
              className="bg-white rounded-full mr-3 items-center justify-center"
              style={{ elevation: 1, width: 36, height: 36 }}
            >
              <Text className="text-[14px] font-bold text-[#1F1F1F]">
                {initials}
              </Text>
            </View>
          ) : null}
          <View>
            <View className="flex-row">
              <Text className="text-[#6F6F6F] text-[12px] font-medium">
                {title}
              </Text>
              {titleIcon && <View className="ml-2">{titleIcon}</View>}
              {subtitle && (
                <Text className="text-[#6F6F6F] text-[12px] font-medium">
                  {' - '}
                  {subtitle}
                </Text>
              )}
            </View>
            {maskedInfo && (
              <Text className="text-[#1F1F1F] text-[12px] mt-1">
                {maskedInfo}
              </Text>
            )}
          </View>
        </View>
      </View>

      {/* Balance */}
      <View className="flex flex-col py-3 border-[#D3D3D3]">
        <View className="flex-row items-center">
          <View
            style={{
              padding: 8,
              borderRadius: 20,
              backgroundColor: '#fff',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 3,
              elevation: 3,
              ...iconContainerStyle,
            }}
            className="mr-3"
          >
            {renderCustomIcon}
          </View>
          <View>
            <Text className="text-[#6F6F6F] text-[12px] font-medium">
              {balanceLabel}
            </Text>
            <Text className="text-[#1F1F1F] text-[12px] mt-1">
              {formatPrice(balance)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
