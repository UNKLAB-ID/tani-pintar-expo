import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

interface FlashSaleCardProps {
  image: any;
  name: string;
  price: string;
  discount?: string;
  sold: number;
  total: number;
  onPress?: () => void;
}

const FlashSaleCard: React.FC<FlashSaleCardProps> = ({
  image,
  name,
  price,
  discount,
  sold,
  total,
  onPress,
}) => {
  const remaining = Math.max(total - sold, 0);
  const remainingPercent = total > 0 ? (remaining / total) * 100 : 0;
  const soldPercent = 100 - remainingPercent;

  return (
    <TouchableOpacity
      className="w-[128px] h-[184px] rounded-lg overflow-hidden bg-gray-400/10"
      onPress={onPress}
      activeOpacity={0.8}
    >
      {/* Gambar Produk */}
      <View
        className="justify-center items-center"
        style={{ width: 128, height: 128 }}
      >
        <Image
          source={image}
          className="rounded-2xl"
          style={{ width: 128, height: 128 }}
          resizeMode="contain"
        />
        {discount && (
          <View
            className="absolute bg-red-600 px-3 py-0.5"
            style={{
              top: 13,
              left: 0,
              borderTopRightRadius: 8,
              borderBottomRightRadius: 8,
            }}
          >
            <Text className="text-[14px] text-white font-bold">{discount}</Text>
          </View>
        )}
      </View>

      {/* Progress Bar */}
      <View
        className="flex-row bg-[#ddd] overflow-hidden relative"
        style={{
          width: 128,
          height: 14,
          borderBottomRightRadius: 8,
          borderBottomLeftRadius: 8,
        }}
      >
        <View
          className="h-full"
          style={{
            backgroundColor: '#FF3B30',
            borderBottomLeftRadius: 8,
            width: `${soldPercent}%`,
          }}
        />
        <View
          className="h-full"
          style={{
            backgroundColor: '#FFA500',
            borderBottomRightRadius: 8,
            width: `${remainingPercent}%`,
          }}
        />

        {sold > 0 && (
          <Text
            className="absolute text-white text-[12px] font-semibold rounded px-1"
            style={{
              left: '65%',
              top: '60%',
              transform: [{ translateX: -70 }, { translateY: -10 }],
            }}
          >
            {sold} Sold
          </Text>
        )}
      </View>

      {/* Info Produk */}
      <View className="px-[6px] py-[4px]">
        <Text
          className="text-[16px] font-normal text-[#1F1F1F] leading-[16px]"
          style={{ fontWeight: '400' }}
        >
          {name.length > 15 ? name.slice(0, 15) + '...' : name}
        </Text>

        <Text
          className="text-[14px] font-bold text-[#28a745]"
          numberOfLines={1}
        >
          {price}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default FlashSaleCard;
