import { useState, useEffect } from 'react';
import BackIcons from '@/assets/icons/global/back-icons';
import { router } from 'expo-router';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo } from '@expo/vector-icons';
import GoogleIcon from '@/assets/icons/profile/google-icon';
import FacebookIcon from '@/assets/icons/profile/fb-icon';

const SosmedAccountScreen = () => {
  return (
    <SafeAreaView edges={['top', 'left', 'right']} className="flex-1">
      <View className="bg-[#f8f8f8]">
        <View className="flex-row bg-white items-center p-4">
          <TouchableOpacity onPress={() => router.back()}>
            <BackIcons width={24} height={24} fill="#000" />
          </TouchableOpacity>
          <Text className="text-black text-[16px] font-bold ml-3">
            Social Media Accounts
          </Text>
        </View>
        <View className=" bg-white p-4 mt-1">
          <TouchableOpacity
            style={{ borderBottomWidth: 1, borderColor: '#F4F4F4' }}
            className=" p-3 mt-2"
          >
            <View className="flex-row items-center">
              <GoogleIcon width={30} height={30} />
              <Text className=" text-[12px] font-medium">Google</Text>
              <View className="flex-1 items-center" />
              <Text className="text-[12px] font-medium">Baus@gmail.com</Text>

              <Entypo name="chevron-right" size={20} color="#6F6F6F" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ borderBottomWidth: 1, borderColor: '#F4F4F4' }}
            className=" p-3 mt-2"
          >
            <View className="flex-row items-center mb-2">
              <FacebookIcon width={24} height={24} />
              <Text className="text-[12px] font-medium ml-2">Facebook</Text>
              <View className="flex-1 items-center" />
              <Text className="text-[12px] font-medium text-primary">Link</Text>

              <Entypo name="chevron-right" size={20} color="#6F6F6F" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SosmedAccountScreen;
