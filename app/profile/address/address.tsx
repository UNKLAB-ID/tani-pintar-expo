import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import BackIcons from '@/assets/icons/global/back-icons';
import { router } from 'expo-router';
import PlusIcons from '@/assets/icons/sosial-media/plus-icons';
import { Search } from 'lucide-react-native';
import AddressCard from '@/components/ui/profile/addres-card';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/utils/api/api';

interface Address {
  id: number;
  label: string;
  recipient_name: string;
  phone_number: string;
  province: string;
  city: string;
  district: string;
  full_address: string;
  is_default: boolean;
}

const fetchAddresses = async (): Promise<Address[]> => {
  const res = await api.get('/addresses/');
  if (res.success && res.data) {
    return res.data.results || res.data;
  }
  return [];
};

const setDefaultAddress = async (addressId: number): Promise<void> => {
  const res = await api.patch(`/addresses/${addressId}/set-default/`);
  if (!res.success) {
    throw new Error(res.message || 'Failed to set default address');
  }
};

const deleteAddress = async (addressId: number): Promise<void> => {
  const res = await api.delete(`/addresses/${addressId}/`);
  if (!res.success) {
    throw new Error(res.message || 'Failed to delete address');
  }
};

const AddressScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const queryClient = useQueryClient();

  const {
    data: addresses,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['addresses'],
    queryFn: fetchAddresses,
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });

  const setDefaultMutation = useMutation({
    mutationFn: setDefaultAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
    },
  });

  const handleSetDefault = (addressId: number) => {
    setDefaultMutation.mutate(addressId);
  };

  const handleDelete = (addressId: number) => {
    deleteMutation.mutate(addressId);
  };

  // Filter addresses based on search query
  const filteredAddresses = useMemo(() => {
    if (!addresses) return [];
    if (!searchQuery.trim()) return addresses;

    const query = searchQuery.toLowerCase();
    return addresses.filter(
      address =>
        address.recipient_name?.toLowerCase().includes(query) ||
        address.full_address?.toLowerCase().includes(query) ||
        address.province?.toLowerCase().includes(query) ||
        address.city?.toLowerCase().includes(query) ||
        address.district?.toLowerCase().includes(query) ||
        address.phone_number?.includes(query)
    );
  }, [addresses, searchQuery]);

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-gray-50">
      <View className="flex-row items-center px-4 py-4 border-b border-gray-200 bg-white">
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
        <View className="flex-row items-center bg-white px-4 rounded-full w-full h-[40px] border border-[#BCBCBC]">
          <Search size={20} color="#BCBCBC" />
          <TextInput
            placeholder="Search address"
            placeholderTextColor="#BCBCBC"
            className="ml-2 text-base text-black flex-1"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Address List */}
      {isLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#3B82F6" />
          <Text className="mt-4 text-gray-500">Loading addresses...</Text>
        </View>
      ) : isError ? (
        <View className="flex-1 justify-center items-center px-4">
          <Text className="text-red-500 text-center mb-4">
            Failed to load addresses
          </Text>
          <TouchableOpacity
            onPress={() => refetch()}
            className="bg-primary px-6 py-3 rounded-lg"
          >
            <Text className="text-white font-semibold">Retry</Text>
          </TouchableOpacity>
        </View>
      ) : filteredAddresses.length === 0 ? (
        <View className="flex-1 justify-center items-center px-4">
          <Text className="text-gray-500 text-center">
            {searchQuery ? 'No addresses found' : 'No addresses yet'}
          </Text>
          {!searchQuery && (
            <TouchableOpacity
              onPress={() => router.push('/profile/address/add-address')}
              className="bg-primary px-6 py-3 rounded-lg mt-4"
            >
              <Text className="text-white font-semibold">Add Address</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <FlatList
          data={filteredAddresses}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <AddressCard
              item={{
                id: item.id,
                label: item.label,
                name: item.recipient_name,
                phone: item.phone_number,
                address: `${item.full_address}, ${item.district}, ${item.city}, ${item.province}`,
                isDefault: item.is_default,
              }}
              onSetDefault={() => handleSetDefault(item.id)}
              onDelete={() => handleDelete(item.id)}
            />
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
          refreshing={isLoading}
          onRefresh={refetch}
        />
      )}
    </SafeAreaView>
  );
};

export default AddressScreen;
