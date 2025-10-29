import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Location2Icons from '@/assets/icons/e-commerce/locations2-icons';
import ChevronDownIcon from '@/assets/icons/e-commerce/chevrondown-icons';

interface AddressSelectorProps {
  address: string;
  onSelect: () => void;
}

const AddressSelector: React.FC<AddressSelectorProps> = ({
  address = 'mambaus solihin',
  onSelect,
}) => {
  return (
    <View className="px-4 flex-row items-center">
      <Location2Icons width={24} height={24} />

      <Text style={{ color: '#afafaf', fontSize: 12 }}> Ship To</Text>
      <Text
        style={{
          fontWeight: 600,
          fontSize: 12,
          color: '#1f1f1f',
          marginLeft: 6,
        }}
      >
        {address}
      </Text>
      <TouchableOpacity
        onPress={onSelect}
        style={{ marginLeft: 10, marginTop: 6 }}
      >
        <ChevronDownIcon width={20} height={20} color="#1f1f1f" />
      </TouchableOpacity>
    </View>
  );
};

export default AddressSelector;
