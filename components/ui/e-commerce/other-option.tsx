import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

const otherItems = [
  {
    id: 1,
    title: 'H&L Semprotan Sprayer Manual [2 Liter]',
    seller: 'H&L Official',
    volume: '2L',
    image: require('@/assets/images/trash/image18.png'),
  },
  {
    id: 2,
    title: 'PUPUK NPK MUTIARA 16–16–16 1KG',
    seller: 'Mudifarma',
    volume: '1KG',
    image: require('@/assets/images/trash/image25.png'),
  },
];

const OtherOption = () => {
  return (
    <View className="bg-white px-4 py-2 ">
      <Text className="text-black text-16px font-semibold mb-2">
        Other Options
      </Text>
      {otherItems.map(item => (
        <TouchableOpacity
          key={item.id}
          style={{
            borderColor: '#B3B3B3',
            borderWidth: 1,
            width: 358,
            height: 85,
          }}
          className="flex-row items-start mb-3 rounded-xl p-3"
          onPress={() => console.log('Open detail:', item.title)}
        >
          <Image
            source={item.image}
            style={{ width: 64, height: 64 }}
            className=" mr-3 rounded-xl"
            resizeMode="contain"
          />
          <View className="flex-1">
            <Text className="text-black text-[12px] font-semibold">
              {item.title}
            </Text>
            <View className="mt-2" />
            <Text style={{ color: '#B3B3B3' }} className="text-[10px] mb-1">
              {item.volume}
            </Text>
            <Text className="text-black text-[12px] font-semibold">
              {item.seller}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default OtherOption;
