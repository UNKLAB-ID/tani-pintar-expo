import React from 'react';
import { View, Text, Image } from 'react-native';
import StarIcons from '@/assets/icons/e-commerce/stars-icons';

type StoreInfoProps = {
  toko: {
    image: any;
    name: string;
    location: string;
    rating: number;
    totalReview: number;
  };
};

export default function StoreInfo({ toko }: StoreInfoProps) {
  return (
    <View className="flex-row items-center mt-2">
      <Image
        source={toko.image}
        className=" rounded-full"
        style={{ width: 30, height: 30 }}
        resizeMode="contain"
      />
      <View className="ml-3 flex-1">
        <Text className="text-[18px] font-semibold text-[#169953]">
          {toko.name}
        </Text>
        <Text className="text-[12px] text-[#BCBCBC]">{toko.location}</Text>
        <View className="flex-row items-center mt-1">
          <StarIcons width={20} height={20} />
          <Text className="ml-1 text-[12px] text-black">
            {toko.rating.toFixed(1)}
          </Text>
          <Text className="ml-1 text-[12px] text-[#BCBCBC]">
            ({toko.totalReview})
          </Text>
        </View>
      </View>
    </View>
  );
}
