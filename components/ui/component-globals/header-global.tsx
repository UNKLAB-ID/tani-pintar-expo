import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import BackIcons from '@/assets/icons/global/back-icons';

interface HeaderProps {
  title: string;
  onBack?: () => void;
  backIconColor?: string;
  rightIcon?: React.ReactNode; // Untuk ikon atau tombol di kanan
}

const Header: React.FC<HeaderProps> = ({
  title,
  onBack,
  backIconColor = '#000',
  rightIcon,
}) => {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <View className="flex-row p-4 items-center">
      <TouchableOpacity onPress={handleBack}>
        <BackIcons width={24} height={24} color={backIconColor} />
      </TouchableOpacity>

      <Text className="text-[16px] font-semibold ml-3">{title}</Text>

      <View className="flex-1" />

      {rightIcon && <View>{rightIcon}</View>}
    </View>
  );
};

export default Header;
