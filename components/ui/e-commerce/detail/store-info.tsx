import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';
import StarIcons from '@/assets/icons/e-commerce/stars-icons';

type StoreInfoProps = {
  toko: {
    image: ImageSourcePropType;
    name: string;
    location: string;
    rating: number;
    totalReview: number;
  };
  onPress?: () => void; // biar bisa dikendalikan dari luar
  showLocation?: boolean; // optional kalau kadang mau hide lokasi
  showRating?: boolean; // optional kalau kadang mau hide rating
};

export default function StoreInfo({
  toko,
  onPress,
  showLocation = true,
  showRating = true,
}: StoreInfoProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="flex-row items-center mt-2"
    >
      <Image
        source={toko.image}
        className="rounded-full"
        style={{ width: 30, height: 30 }}
        resizeMode="cover"
      />
      <View className="ml-3 flex-1">
        <Text className="text-[18px] font-semibold text-[#169953]">
          {toko.name}
        </Text>
        {showLocation && (
          <Text className="text-[12px] text-[#BCBCBC]">{toko.location}</Text>
        )}
        {showRating && (
          <View className="flex-row items-center mt-1">
            <StarIcons width={20} height={20} />
            <Text className="ml-1 text-[12px] text-black">
              {toko.rating.toFixed(1)}
            </Text>
            <Text className="ml-1 text-[12px] text-[#BCBCBC]">
              ({toko.totalReview})
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}
