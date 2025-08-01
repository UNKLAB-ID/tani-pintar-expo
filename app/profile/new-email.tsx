import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import BackIcons from '@/assets/icons/global/back-icons';

const ChangeEmail = () => {
  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-white">
      {/* Header */}
      <View
        className="flex-row items-center px-5 pt-4 pb-3 "
        style={{ borderBottomWidth: 1, borderColor: '#F4F4F4' }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <BackIcons width={24} height={24} />
        </TouchableOpacity>
        <Text className="text-[16px] font-semibold ml-3">Change Email</Text>
      </View>

      {/* Body */}
      <View className="flex-1 px-5 py-4">
        <Text className="text-[14px] text-[#8D8D8D]">
          Make sure your email is active!
        </Text>
        <View className="mt-4">
          <Text className="text-[14px] font-semibold my-2 ">New Email</Text>
          <TextInput
            // value={email}
            // onChangeText={setEmail}
            placeholder="Enter your new email"
            placeholderTextColor="#B0B0B0"
            keyboardType="email-address"
            autoCapitalize="none"
            className="border border-[#D9D9D9] rounded-lg px-4 py-3 text-[14px] text-[#1F1F1F]"
          />
        </View>
        <View className="mt-6">
          <TouchableOpacity
            onPress={() => {
              // Handle email change logic here
            }}
            className="bg-primary rounded-xl py-3"
          >
            <Text className="text-white text-center text-[16px] font-semibold">
              Verify your new email
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChangeEmail;
