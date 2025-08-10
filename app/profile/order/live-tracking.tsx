import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const LiveTrackingStatic = () => {
  const router = useRouter();

  return (
    <SafeAreaView edges={['top', 'bottom']} className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 pt-[48px] pb-[16px] bg-white">
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="black" />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: '600', color: '#000' }}>
          Live Tracking
        </Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Map Section */}
      <View className="w-full h-[380px] relative">
        <Image
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Google_Maps_logo_2020.svg',
          }}
          className="w-full h-full"
          resizeMode="cover"
        />

        {/* Origin Marker */}
        <View className="absolute left-[25%] top-[50%] w-[14px] h-[14px] rounded-full bg-green-500 border-[2px] border-white" />

        {/* Destination Marker */}
        <View className="absolute left-[65%] top-[30%] w-[14px] h-[14px] rounded-full bg-green-500 border-[2px] border-white" />

        {/* Connecting Line */}
        <View
          className="absolute bg-green-500"
          style={{
            left: '25%',
            top: '50%',
            width: 130,
            height: 2,
            transform: [{ rotate: '-30deg' }],
          }}
        />
      </View>

      {/* Bottom Package Info */}
      <View className="mt-auto w-full rounded-t-2xl bg-white px-6 py-5 shadow-lg border-t border-gray-100">
        <Text
          style={{
            fontSize: 16,
            fontWeight: '600',
            color: '#1F2937',
            marginBottom: 14,
          }}
        >
          Package Information
        </Text>

        {/* Delivery Person */}
        <View className="flex-row items-center mb-4">
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
            className="w-[40px] h-[40px] rounded-full mr-3"
          />
          <View>
            <Text style={{ fontSize: 14, fontWeight: '600', color: '#1F2937' }}>
              Stevenward Holdser
            </Text>
            <Text style={{ fontSize: 12, color: '#6B7280' }}>
              Delivery Man - JNE
            </Text>
          </View>
        </View>

        {/* Package Details */}
        <View className="flex-row justify-between items-center border-t border-gray-200 pt-3">
          <View className="items-center">
            <Text style={{ fontSize: 12, color: '#6B7280' }}>Weight</Text>
            <Text style={{ fontSize: 14, fontWeight: '600', color: '#000' }}>
              1.00 Kg
            </Text>
          </View>
          <View className="items-center">
            <Text style={{ fontSize: 12, color: '#6B7280' }}>Estimate</Text>
            <Text style={{ fontSize: 14, fontWeight: '600', color: '#000' }}>
              1–3 Days
            </Text>
          </View>
          <View className="items-center">
            <Text style={{ fontSize: 12, color: '#6B7280' }}>Status</Text>
            <Text style={{ fontSize: 14, fontWeight: '600', color: '#22C55E' }}>
              Delivery
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LiveTrackingStatic;
