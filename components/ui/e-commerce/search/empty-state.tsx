import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

interface EmptyStateProps {
  title?: string;
  message?: string;
  buttonLabel?: string;
  onPressButton?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No Results Found',
  message = "Try adjusting your search\nto find what you're looking for",
  buttonLabel = 'Search Again',
  onPressButton,
}) => {
  return (
    <View className="items-center justify-center mt-10 px-4">
      <Image
        source={require('@/assets/images/EmptyState.png')}
        style={{ width: 250, height: 200 }}
        resizeMode="contain"
      />
      <Text className="font-semibold text-[20px] text-[#1F1F1F] mt-4">
        {title}
      </Text>
      <Text className="text-center text-[16px] text-[#525252] mt-1">
        {message}
      </Text>
      <TouchableOpacity
        onPress={onPressButton}
        className="bg-[#169953] rounded-full mt-10 mb-10 px-5 py-4"
        style={{ width: 340, height: 55 }}
      >
        <Text
          className="text-white text-center font-bold"
          style={{ fontSize: 18 }}
        >
          {buttonLabel}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmptyState;
