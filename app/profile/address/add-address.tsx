import BackIcons from '@/assets/icons/global/back-icons';
import { router } from 'expo-router';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, Check } from 'lucide-react-native';
import { useState, useEffect } from 'react';
import ModalLocationPicker from '@/components/ui/profile/modal-location';

type LocationType = {
  province?: string;
  city?: string;
  district?: string;
  postalCode?: string;
};

type SelectedLocation = {
  latitude: number;
  longitude: number;
  address?: string;
};

const AddAddress = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState<LocationType | null>(null);
  const [unit, setUnit] = useState('');
  const [isDefault, setIsDefault] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [selectedLocation, setSelectedLocation] =
    useState<SelectedLocation | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const allFilled = name && phone && location && unit;
    setIsFormValid(!!allFilled);
  }, [name, phone, location, unit]);

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center px-4 py-4 border-b border-gray-200">
        <TouchableOpacity onPress={() => router.back()}>
          <BackIcons width={24} height={24} fill="#000" />
        </TouchableOpacity>
        <Text className="text-[16px] font-semibold ml-2">Add Address</Text>
        <View className="flex-1" />
      </View>

      <ScrollView className="px-4 py-4 space-y-4">
        {/* Name */}
        <View>
          <Text className="text-sm font-medium mb-1">
            Recipient's Name <Text className="text-red-500">*</Text>
          </Text>
          <TextInput
            placeholder="Input your recipient's name"
            className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            value={name}
            onChangeText={setName}
          />
        </View>

        {/* Phone */}
        <View>
          <Text className="text-sm font-medium mb-1">
            Recipient’s Phone Number <Text className="text-red-500">*</Text>
          </Text>
          <View className="flex-row items-center border border-gray-300 rounded-md px-3 py-2">
            <Text className="text-sm text-black mr-2">+62</Text>
            <TextInput
              placeholder="Input your recipient’s phone number"
              keyboardType="phone-pad"
              className="flex-1 text-sm"
              value={phone}
              onChangeText={setPhone}
            />
          </View>
        </View>

        {/* Location Picker */}
        <View>
          <Text className="text-sm font-medium mb-1">
            Province / City / District / Postal Code{' '}
            <Text className="text-red-500">*</Text>
          </Text>
          <TouchableOpacity
            onPress={() => setShowLocationModal(true)}
            className="border border-gray-300 px-4 py-3 rounded-md"
          >
            <Text className="text-black text-sm">
              {location
                ? `${location.province}, ${location.city}, ${location.district}, ${location.postalCode}`
                : 'Pilih lokasi'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Unit */}
        <View>
          <Text className="text-sm font-medium mb-1">Block / Unit Number</Text>
          <TextInput
            placeholder="Input your Block / Unit Number"
            className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            value={unit}
            onChangeText={setUnit}
          />
        </View>

        {/* Pin Map */}
        <View>
          <Text className="text-sm font-medium mb-1">
            Pin Address <Text className="text-red-500">*</Text>
          </Text>
          <Pressable className="flex-row items-center justify-between border border-green-500 rounded-md px-3 py-3">
            <View className="flex-row items-center space-x-2">
              <MapPin size={16} color="#10B981" />
              <Text className="text-sm text-green-600">Select by map</Text>
            </View>
          </Pressable>
          <Text className="text-xs text-red-500 mt-1">
            ❗ Fill in the address first to set the location on the map
            accurately
          </Text>
        </View>

        {/* Default Checkbox */}
        <TouchableOpacity
          onPress={() => setIsDefault(!isDefault)}
          className="flex-row items-center mt-2"
        >
          <View className="w-5 h-5 border border-gray-400 rounded mr-2 items-center justify-center">
            {isDefault && <Check size={14} color="#000" />}
          </View>
          <Text className="text-sm text-black">Set as default address</Text>
        </TouchableOpacity>

        {/* Save Button */}
        <TouchableOpacity
          disabled={!isFormValid}
          className={`py-3 rounded-md items-center mt-6 ${
            isFormValid ? 'bg-primary' : 'bg-gray-300'
          }`}
        >
          <Text className="text-white font-medium">Save</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal for Location Picker */}
      <ModalLocationPicker
        visible={showLocationModal}
        onClose={() => setShowLocationModal(false)}
        onSelect={(val: LocationType) => {
          setLocation(val);
          setShowLocationModal(false);
        }}
      />
    </SafeAreaView>
  );
};

export default AddAddress;
