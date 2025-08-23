import BackIcons from '@/assets/icons/global/back-icons';
import ShareGlobalIcons from '@/assets/icons/global/share-global-icons';
import { router } from 'expo-router';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const InvoiceScreen = () => {
  return (
    <SafeAreaView edges={['top', 'bottom']} className="flex-1 bg-[#f8f8f8]">
      <ScrollView className="p-4">
        {/* Header */}
        <View className="justify-between flex-row p-4">
          <TouchableOpacity onPress={() => router.back()}>
            <BackIcons width={24} height={24} />
          </TouchableOpacity>
          <ShareGlobalIcons width={24} height={24} color="#000" />
        </View>
        <View className="w-full items-center p-3 shadow bg-white rounded-2xl">
          <View className="bg-green-500 w-16 h-16 rounded-full justify-center items-center self-center">
            <Text className="text-white text-2xl font-bold">✓</Text>
          </View>

          <Text className="text-base text-gray-700 mt-3 text-center">
            Payment Success!
          </Text>
          <Text className="text-xl font-bold mt-1 text-center">Rp50.000</Text>

          {/* Card */}
          <View className="w-full mt-4">
            <Text className="text-sm font-bold text-gray-700 mb-3">
              Transaction details
            </Text>

            <View className="flex-row justify-between mb-2 w-full">
              <Text className="text-gray-600">Payment status</Text>
              <Text className="text-green-600 font-semibold">Completed ✓</Text>
            </View>

            <View className="flex-row justify-between mb-2 w-full">
              <Text className="text-gray-600">Payment method</Text>
              <Text className="text-gray-800">TaniPay</Text>
            </View>

            <View className="flex-row justify-between mb-2 w-full">
              <Text className="text-gray-600">Transfer to</Text>
              <Text className="text-gray-800">Tis Jalaludin</Text>
            </View>

            <View className="flex-row justify-between mb-2 w-full">
              <Text className="text-gray-600">Name bank</Text>
              <Text className="text-gray-800 max-w-[60%]">
                Mandiri (1515892012783949)
              </Text>
            </View>

            <View className="flex-row justify-between mb-2 w-full">
              <Text className="text-gray-600">Date</Text>
              <Text className="text-gray-800">03 July 2025</Text>
            </View>

            <View className="flex-row justify-between mb-2 w-full">
              <Text className="text-gray-600">Time</Text>
              <Text className="text-gray-800">07:00 AM</Text>
            </View>

            <View className="flex-row justify-between mb-2 w-full">
              <Text className="text-gray-600">Transaction ID</Text>
              <Text className="text-gray-800">058889273910319032b2...</Text>
            </View>

            <View className="flex-row justify-between mb-2 w-full">
              <Text className="text-gray-600">Amount</Text>
              <Text className="text-gray-800">Rp50.000</Text>
            </View>

            <View className="flex-row justify-between mb-2 w-full">
              <Text className="text-gray-600">Admin fee</Text>
              <View className="flex-row items-center">
                <Text className="line-through text-gray-400 mr-1">Rp2.000</Text>
                <Text className="text-green-600 font-semibold">Free!</Text>
              </View>
            </View>

            <View className="flex-row justify-between mt-3 pt-2 border-t border-gray-200 w-full">
              <Text className="text-base font-bold">Total</Text>
              <Text className="text-base font-bold">Rp50.000</Text>
            </View>
          </View>

          {/* Footer */}
          <Text className="text-xs text-gray-500 text-center mt-4 w-full">
            PT. TaniVerse Cipta Digital Indonesia{'\n'}
            Jl. Jend. Sudirman Kav. 52–53, Senayan, Kebayoran Baru, Jakarta
            Selatan, Daerah Khusus Ibukota Jakarta 12190.
          </Text>
        </View>

        {/* Buttons */}
      </ScrollView>
      {/* Bottom Buttons */}
      <View
        className="w-full bg-white p-4"
        style={{
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          // Elevation untuk Android
          elevation: 5,
        }}
      >
        <TouchableOpacity className="bg-green-50 py-3 rounded-xl items-center">
          <Text className="text-green-700 font-semibold">Share receipt</Text>
        </TouchableOpacity>
        <TouchableOpacity className="border border-[#E9E9E9] py-3 mt-3 rounded-xl items-center">
          <Text className="font-semibold">Get PDF receipt</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default InvoiceScreen;
