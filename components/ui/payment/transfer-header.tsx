import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import BackIcons from '@/assets/icons/global/back-icons';

export const TransferHeader = ({
  title,
  subtitle,
  onBack,
}: {
  title: string;
  subtitle: string;
  onBack?: () => void;
}) => (
  <ImageBackground
    source={require('../../../assets/images/switch.png')}
    resizeMode="cover"
    style={styles.headerBg}
  >
    <TouchableOpacity onPress={onBack}>
      <BackIcons width={24} height={24} color="#fff" />
    </TouchableOpacity>
    <Text className="text-white text-[24px] mt-6 font-semibold">{title}</Text>
    <Text className="text-[14px] mt-2 text-white">{subtitle}</Text>
  </ImageBackground>
);

const styles = StyleSheet.create({
  headerBg: {
    paddingTop: 60, // kasih space biar ga nabrak status bar
    paddingHorizontal: 16,
    paddingBottom: 90,
  },
});
