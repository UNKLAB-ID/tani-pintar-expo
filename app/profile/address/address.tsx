import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import BackIcons from '@/assets/icons/global/back-icons';
import { router } from 'expo-router';
import PlusIcons from '@/assets/icons/sosial-media/plus-icons';
import { Search } from 'lucide-react-native';
import HomeIcons from '@/assets/icons/navbar/home-icons-disable';
import TrashIcon from '@/assets/icons/e-commerce/trash-icons';
import AddressCard from '@/components/ui/profile/addres-card';

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

const AddressScreen = () => {
  return (
    <SafeAreaView edges={['top']} className="flex-1 ">
      <View className="flex-row items-center px-4 py-4 border-b border-gray-200">
        <TouchableOpacity onPress={() => router.back()}>
          <BackIcons width={24} height={24} fill="#000" />
        </TouchableOpacity>
        <Text className="text-[16px] font-semibold ml-2">Address</Text>
        <View className="flex-1" />
        <TouchableOpacity
          onPress={() => router.push('/profile/address/add-address')}
        >
          <PlusIcons width={24} height={24} />
        </TouchableOpacity>
      </View>

      <View className="p-5 justify-center items-center">
        <View className="flex-row items-center bg-white px-4 rounded-full w-full h-[40px]  border border-[#BCBCBC]">
          <Search size={20} color="#BCBCBC" />
          <TextInput
            placeholder="Search adress"
            placeholderTextColor="#BCBCBC"
            className="ml-2 text-base text-black"
          />
        </View>
      </View>

      {/* Address List */}
      <FlatList
        data={addresses}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <AddressCard item={item} />}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
};
export default AddressScreen;
