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
        selected ? 'border-primary bg-[#D7FCE8]' : 'border-gray-400'
      }`}
    >
      <Image
        source={image}
        style={{ width: 32, height: 22, marginRight: 10 }}
        resizeMode="contain"
      />
      <Text className="flex-1 text-[14px] font-medium">{label}</Text>
      <View
        className={`w-5 h-5 rounded-md border-2 items-center justify-center ${
          selected ? 'border-primary bg-primary' : 'border-gray-400'
        }`}
      >
        {selected && <Check size={12} color="white" />}
      </View>
    </TouchableOpacity>
  );
};
