import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';

const defaultItems = [
  {
    id: '1',
    title: 'H&L Semprotan Sprayer Manual [2 Liter]',
    seller: 'H&L Official',
    volume: '2L',
    image: require('@/assets/images/trash/image18.png'),
  },
  {
    id: '2',
    title: 'PUPUK NPK MUTIARA 16–16–16 1KG',
    seller: 'Mudifarma',
    volume: '1KG',
    image: require('@/assets/images/trash/image25.png'),
  },
];

export interface OtherOptionItem {
  id: string;
  title: string;
  seller: string;
  volume?: string;
  image: { uri: string } | number;
}

interface OtherOptionProps {
  items?: OtherOptionItem[];
  isLoading?: boolean;
  title?: string;
}

const OtherOption: React.FC<OtherOptionProps> = ({
  items,
  isLoading = false,
  title = 'Popular Products',
}) => {
  const displayItems = items && items.length > 0 ? items : defaultItems;

  return (
    <View className="bg-white px-4 py-2">
      <Text className="text-black text-[16px] font-semibold mb-2">{title}</Text>

      {isLoading ? (
        <View className="py-4 items-center">
          <ActivityIndicator size="small" color="#169953" />
        </View>
      ) : (
        displayItems.map(item => (
          <TouchableOpacity
            key={item.id}
            style={{
              borderColor: '#B3B3B3',
              borderWidth: 1,
            }}
            className="flex-row items-start mb-3 rounded-xl p-3"
            onPress={() =>
              router.push({
                pathname: '/e-commerce/detail/[uuid]',
                params: { uuid: item.id },
              })
            }
          >
            <Image
              source={
                typeof item.image === 'number'
                  ? item.image
                  : { uri: item.image.uri }
              }
              style={{ width: 64, height: 64 }}
              className="mr-3 rounded-xl"
              resizeMode="contain"
            />
            <View className="flex-1">
              <Text
                className="text-black text-[12px] font-semibold"
                numberOfLines={2}
              >
                {item.title}
              </Text>
              <View className="mt-2" />
              {item.volume && (
                <Text style={{ color: '#B3B3B3' }} className="text-[10px] mb-1">
                  {item.volume}
                </Text>
              )}
              <Text className="text-black text-[12px] font-semibold">
                {item.seller}
              </Text>
            </View>
          </TouchableOpacity>
        ))
      )}
    </View>
  );
};

export default OtherOption;
