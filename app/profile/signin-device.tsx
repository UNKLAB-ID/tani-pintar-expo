import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackIcons from '@/assets/icons/global/back-icons';
import { router } from 'expo-router';

const devices = [
  {
    id: 1,
    name: 'Redmi Note 12',
    time: '06 May 2025, 17:29',
    location: 'Jakarta, Indonesia',
    isCurrent: true,
  },
  {
    id: 2,
    name: 'Redmi Note 10S',
    time: '05 May 2025, 10:40',
    location: 'Depok, Indonesia',
    isCurrent: false,
  },
  {
    id: 3,
    name: 'Samsung S23',
    time: '04 May 2025, 09:40',
    location: 'Bogor, Indonesia',
    isCurrent: false,
  },
];

const SignInDeviceScreen = () => {
  return (
    <SafeAreaView edges={['top']} className="flex-1 ">
      {/* Header */}
      <View className="bg-white flex-row items-center px-4 py-3 border-b border-gray-200">
        <TouchableOpacity onPress={() => router.back()}>
          <BackIcons width={24} height={24} fill="#000" />
        </TouchableOpacity>
        <Text className="text-black text-base font-bold ml-3">
          Manage Login Device
        </Text>
      </View>

      {/* Main content */}
      <ScrollView className="px-4 mt-3">
        <View className="bg-white rounded-xl border border-gray-300 px-4 py-3">
          {devices.map((device, index) => (
            <View
              key={device.id}
              className={`py-3 ${index !== devices.length - 1 ? 'border-b border-gray-200' : ''}`}
            >
              <View className="flex-row items-center justify-between">
                <Text className="text-[12px] font-medium text-[#6F6F6F]">
                  {device.name}
                </Text>
                {device.isCurrent ? (
                  <View className="border border-green-600 px-2 py-0.5 rounded-full">
                    <Text className="text-green-600 text-xs font-medium">
                      Current Device
                    </Text>
                  </View>
                ) : (
                  <TouchableOpacity className="border border-red-500 px-3 py-2 rounded-md">
                    <Text className="text-red-500 text-xs font-medium">
                      Remove
                    </Text>
                  </TouchableOpacity>
                )}
              </View>

              <Text className="text-sm text-[#6F6F6F] mt-1">
                Last Activity Time: {device.time}
              </Text>
              <Text className="text-sm text-[#6F6F6F]">
                Location: {device.location}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignInDeviceScreen;
