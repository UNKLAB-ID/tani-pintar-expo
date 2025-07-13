import ArrowRightIcons from '@/assets/icons/e-commerce/arrow-right-icons';
import LocationIcons from '@/assets/icons/e-commerce/locations-icons';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface LocationInfoProps {
  address: string;
  onPress?: () => void;
}

const LocationInfo: React.FC<LocationInfoProps> = ({ address, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} className="px-5">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <LocationIcons width={25} height={25} color="#28a745" />
          <View className="ml-2 flex-row">
            <Text
              className=" font-bold "
              style={{ color: '#C8C8C8', fontSize: 14 }}
            >
              Ship to
            </Text>
            <Text
              className="font-bold  ml-2"
              style={{ color: '#2b2b2b', fontSize: 14 }}
            >
              {address}
            </Text>
          </View>
        </View>
        <ArrowRightIcons width={18} height={18} />
      </View>
    </TouchableOpacity>
  );
};

export default LocationInfo;
