import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import TopUpIcons from '@/assets/icons/e-commerce/topup-icons';

const iconMap: Record<string, React.FC<{ width: number; height: number }>> = {
  TopUpIcons,
};

interface MainCategoryCardProps {
  item: {
    icon: string;
    label: string;
    id: number | string;
    route?: string;
  };
  onPress?: () => void;
}

const MainCategoryCard: React.FC<MainCategoryCardProps> = ({
  item,
  onPress,
}) => {
  const IconComponent = iconMap[item.icon] || TopUpIcons;

  return (
    <TouchableOpacity
      className="items-center flex-1"
      activeOpacity={0.8}
      onPress={onPress}
      disabled={!onPress}
    >
      <View
        className="p-4 rounded-full mb-1"
        style={{ backgroundColor: '#f9f9f9' }}
      >
        <IconComponent width={28} height={28} />
      </View>
      <Text className="text-xs font-medium text-center leading-4">
        {item.label}
      </Text>
    </TouchableOpacity>
  );
};

export default MainCategoryCard;
