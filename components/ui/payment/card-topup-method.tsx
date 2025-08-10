import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Check } from 'lucide-react-native';
import { ImageSourcePropType } from 'react-native';

interface TopUpMethodCardProps {
  label: string;
  image: ImageSourcePropType;
  selected: boolean;
  onPress: () => void;
}

export const TopUpMethodCard = ({
  label,
  image,
  selected,
  onPress,
}: TopUpMethodCardProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-row items-center p-3 rounded-xl border ${
        selected ? 'border-green-600 bg-green-50' : 'border-gray-300'
      }`}
    >
      <Image source={image} className="w-6 h-6 mr-3" resizeMode="contain" />
      <Text className="flex-1 text-black">{label}</Text>
      <View
        className={`w-5 h-5 rounded-full border-2 items-center justify-center ${
          selected ? 'border-green-600 bg-green-600' : 'border-gray-400'
        }`}
      >
        {selected && <Check size={12} color="white" />}
      </View>
    </TouchableOpacity>
  );
};
