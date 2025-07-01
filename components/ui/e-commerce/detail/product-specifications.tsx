import React from 'react';
import { View, Text } from 'react-native';
import ReturnBox from '@/assets/icons/e-commerce/return-box';

type SpecificationProps = {
  data: {
    brand: string;
    category: string;
    function: string;
    dimensions: string;
    weight: string;
  };
};

export default function ProductSpecifications({ data }: SpecificationProps) {
  return (
    <View>
      <Text className="text-[14px] text-gray-600">
        <Text className="font-semibold text-black">Brand: </Text>
        <Text className="text-[#2F8E6E]">{data.brand}</Text>
      </Text>
      <Text className="text-[14px] text-gray-600">
        <Text className="font-semibold text-black">Category: </Text>
        <Text className="text-[#2F8E6E]">{data.category}</Text>
      </Text>
      <View className="flex-row items-center mt-2">
        <ReturnBox width={20} height={20} />
        <Text className="text-[14px] ml-1 text-[#2F8E6E]">
          Free 14 Days Returns (conditional)
        </Text>
      </View>
      <View className="flex-row border-b border-gray-200 pt-3 pb-2 mt-4">
        <Text className="text-[14px] text-gray-400">Function</Text>
        <Text className="text-[14px] text-gray-400 " style={{ marginLeft: 50 }}>
          {data.function}
        </Text>
      </View>
      <View className="flex-row border-b border-gray-200 pt-3 pb-2">
        <Text className="text-[14px] text-gray-400">Dimensions</Text>
        <Text className="text-[14px] text-gray-400 " style={{ marginLeft: 30 }}>
          {data.dimensions}
        </Text>
      </View>
      <View className="flex-row pt-3">
        <Text className="text-[14px] text-gray-400">Heavy</Text>
        <Text className="text-[14px] text-gray-400 " style={{ marginLeft: 65 }}>
          {data.weight}
        </Text>
      </View>
    </View>
  );
}
