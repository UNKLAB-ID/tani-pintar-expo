import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';

import { router } from 'expo-router';
import TrashIcon from '@/assets/icons/e-commerce/trash-icons';
import EditAddressIcon from '@/assets/icons/profile/edit-icon';
import HomeAddressIcon from '@/assets/icons/profile/home-address';

const addresses = [
  {
    id: 1,
    label: 'Home',
    name: 'Mambaus Baus',
    phone: '0851876318390',
    address:
      'Jln. Pangeran Diponegoro, Blok A, no 19. Ahmad Yani, RT 002/009, Kel. Duri Kosambi, Kec. Cengkareng, Kota Jakarta Barat, DKI Jakarta, Code 1588',
    isDefault: true,
  },
  {
    id: 2,
    label: 'Home',
    name: 'Alter',
    phone: '08517261237819',
    address:
      'Menara Kadin Indonesia Lt. 15 Jl. HR. Rasuna Said Blok X-5, Kav 2–3 Jakarta 12950, Code 1555',
    isDefault: false,
  },
];
const AddressCard = ({ item }: { item: (typeof addresses)[0] }) => {
  return (
    <View
      className="bg-white mx-5 mb-4 border-gray-200 shadow-md shadow-gray-300 p-4 relative"
      style={{ borderWidth: 1, borderRadius: 12 }}
    >
      {/* Badge pojok kanan atas */}
      {item.isDefault && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            borderTopRightRadius: 12,
            backgroundColor: '#E6F6EC',
            borderColor: '#169953',
            borderWidth: 1,
            paddingHorizontal: 6,
            paddingVertical: 4,
          }}
        >
          <Text style={{ fontSize: 12, color: '#169953', fontWeight: '500' }}>
            Default address
          </Text>
        </View>
      )}

      {/* Label dan icon */}
      <View className="flex-row items-center pb-2 border-b border-gray-200">
        <HomeAddressIcon width={24} height={24} />
        <Text className="ml-2 text-[14px] font-semibold">{item.label}</Text>
      </View>

      {/* Nama dan No HP */}
      <View className="flex-row mt-1">
        <Text className="text-[14px] font-semibold">{item.name}</Text>
        <Text className="ml-2 text-[14px] text-[#AAAAAA]">{item.phone}</Text>
      </View>

      {/* Alamat */}
      <Text className="text-sm text-gray-700 leading-5 mt-1 font-medium">
        {item.address}
      </Text>

      {/* Aksi Edit & Hapus */}
      <View className="flex-row items-center mt-3 pt-2 border-t border-gray-200">
        <TouchableOpacity className="flex-row items-center mr-4">
          <TrashIcon width={18} height={18} />
          <Text className="text-[#AAAAAA] text-sm ml-1">Delete</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center">
          <EditAddressIcon width={20} height={20} />
          <Text className="text-[#4CAF50] text-sm ml-1">Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddressCard;
