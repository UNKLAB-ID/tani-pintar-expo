import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import TrashIcon from '@/assets/icons/e-commerce/trash-icons';
import EditAddressIcon from '@/assets/icons/profile/edit-icon';
import HomeAddressIcon from '@/assets/icons/profile/home-address';
import { Check } from 'lucide-react-native';

interface AddressItem {
  id: number;
  label: string;
  name: string;
  phone: string;
  address: string;
  isDefault: boolean;
}

interface AddressCardProps {
  item: AddressItem;
  onSetDefault?: () => void;
  onDelete?: () => void;
}

const AddressCard: React.FC<AddressCardProps> = ({
  item,
  onSetDefault,
  onDelete,
}) => {
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

      {/* Aksi */}
      <View className="flex-row items-center mt-3 pt-2 border-t border-gray-200">
        {/* Delete Button */}
        <TouchableOpacity
          className="flex-row items-center mr-4"
          onPress={onDelete}
        >
          <TrashIcon width={18} height={18} />
          <Text className="text-[#AAAAAA] text-sm ml-1">Delete</Text>
        </TouchableOpacity>

        {/* Edit Button */}
        <TouchableOpacity
          className="flex-row items-center mr-4"
          onPress={() =>
            router.push(`/profile/address/edit-address?id=${item.id}`)
          }
        >
          <EditAddressIcon width={20} height={20} />
          <Text className="text-[#4CAF50] text-sm ml-1">Edit</Text>
        </TouchableOpacity>

        {/* Set as Default Button */}
        {!item.isDefault && (
          <TouchableOpacity
            className="flex-row items-center ml-auto"
            onPress={onSetDefault}
          >
            <Check size={16} color="#3B82F6" />
            <Text className="text-[#3B82F6] text-sm ml-1">Set Default</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default AddressCard;
