import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { FC } from 'react';
import { formatDate } from '@/utils/format-date/date';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackIcons from '@/assets/icons/global/back-icons';
import { router } from 'expo-router';

const trackingSteps = [
  {
    status: 'Order placed',
    location: 'Jakarta Timur',
    date: '2025-12-17 12:00',
    done: true,
  },
  {
    status: 'Preparing to ship',
    location: 'Jakarta Timur',
    date: '2025-12-17 15:00',
    done: true,
  },
  {
    status: 'Order arrives at East Jakarta Hub transit location',
    location: 'Jakarta Timur',
    date: '2025-12-17 17:30',
    done: true,
  },
  {
    status: 'Orders are processed at transit locations',
    location: 'Jakarta Timur',
    date: '2025-12-17 19:00',
    done: true,
  },
  {
    status: 'Orders are shipped from transit locations',
    location: 'Jakarta Timur',
    date: '2025-12-17 21:30',
    done: true,
  },
  {
    status: 'The order is on its way to Sunter DC',
    location: 'Jakarta Utara',
    date: '2025-12-17 23:00',
    done: true,
  },
  {
    status: 'Order arrived at transit location',
    location: 'Jakarta Utara',
    date: '2025-12-18 07:30',
    done: true,
  },
  {
    status: 'Orders are processed at the Sunter DC sorting location',
    location: 'Jakarta Utara',
    date: '2025-12-18 10:00',
    done: true,
  },
  {
    status: 'Courier has been assigned. Order will be shipped.',
    location: 'Jakarta Utara',
    date: '2025-12-18 11:00',
    done: true,
  },
  {
    status: 'Order in delivery process',
    location: 'Jakarta Utara',
    date: '2025-12-18 12:00',
    done: true,
  },
  {
    status: 'Go to the location',
    location: 'Jl. Diponegoro, Jakarta Pusat',
    date: '2025-12-18 17:00',
    done: false,
  },
];

const TrackingDetails: FC = () => {
  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-white">
      <View className="flex-row items-center justify-between px-4 py-3 bg-white">
        <TouchableOpacity onPress={() => router.back()} className="z-10">
          <BackIcons width={24} height={24} fill="#000" />
        </TouchableOpacity>
        <Text className="absolute left-1/2 -translate-x-1/2 text-[16px] font-bold">
          Tracking Details
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        className="px-4 pt-6"
      >
        {/* Product Header */}
        <View className="flex-row items-start mb-4">
          <Image
            source={require('@/assets/images/trash/image25.png')}
            className="w-16 h-16 rounded-md mr-3"
            resizeMode="cover"
          />
          <View className="flex-1">
            <Text className="text-black font-semibold text-sm">
              BELI 3 GRATIS 1 PUPUK BUAH BOOSTER...
            </Text>
            <Text className="text-gray-500 text-xs mt-1">
              Receipt Number : JNEP099228838
            </Text>
          </View>
        </View>

        {/* Address & Info */}
        <View className="mb-4 space-y-2">
          <View className="flex-row justify-between">
            <Text className="text-gray-500">From</Text>
            <Text className="text-black font-medium">Jakarta Timur</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-500">Destination</Text>
            <Text className="text-black font-medium text-right flex-1 text-end">
              Jln. Pangeran Diponegoro, Blok A, No.19. Ahmad
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-500">Courier</Text>
            <Text className="text-black font-medium">JNE</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-500">Weight</Text>
            <Text className="text-black font-medium">1.00 Kg</Text>
          </View>
        </View>

        {/* Status Timeline */}
        <View className="flex-row items-center">
          <Text className=" text-[#5A5A5A] text-[16px] mb-2">Status</Text>
          <View className="px-4 border border-[#DBFDDB] bg-[#DBFDDB] rounded-xl mx-2 py-1 mb-2">
            <Text className=" text-primary text-[16px] ">Delivered</Text>
          </View>
        </View>

        <View className="ml-2 border-l border-gray-300 pl-4">
          {trackingSteps.map((step, index) => (
            <View key={index} className="relative pb-6">
              {/* Icon */}
              <View
                className="absolute -left-[17px] top-0 w-6 h-6"
                style={{
                  marginLeft: -9, // setengah lebar circle
                  backgroundColor: step.done ? '#169953' : '#D3D3D3',
                  borderRadius: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 10,
                }}
              >
                {step.done && (
                  <Text className="text-white text-[12px] font-bold">✓</Text>
                )}
              </View>

              {/* Texts */}
              <Text className="text-black text-sm font-medium">
                {step.status}
              </Text>
              <Text className="text-gray-500 text-xs">{step.location}</Text>
              <Text className="text-gray-400 text-xs">
                {formatDate(String(step.date))} WIB
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Live Tracking Button */}
      <SafeAreaView edges={['bottom']} className="bg-white">
        <View className="px-4 py-2">
          <TouchableOpacity
            onPress={() => router.push('/profile/order/live-tracking')}
            className="bg-primary py-3 rounded-xl"
          >
            <Text className="text-white font-semibold text-center text-base">
              Live Tracking
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default TrackingDetails;
