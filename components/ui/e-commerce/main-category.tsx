import React from "react";
import { View, Text } from "react-native";
import TopUpIcons from "@/assets/icons/e-commerce/topup-icons";

const iconMap: Record<string, React.FC<{ width: number; height: number }>> = {
  TopUpIcons,
};

interface MainCategoryCardProps {
  item: {
    icon: string;
    label: string;
  };
}

const MainCategoryCard: React.FC<MainCategoryCardProps> = ({ item }) => {
  const IconComponent = iconMap[item.icon] || TopUpIcons;

  return (
    <View className="items-center flex-1">
      <View
        className="p-4 rounded-full mb-1"
        style={{ backgroundColor: "#f9f9f9" }}
      >
        <IconComponent width={28} height={28} />
      </View>
      <Text className="text-xs font-medium text-center leading-4">
        {item.label}
      </Text>
    </View>
  );
};

export default MainCategoryCard;
