import BackIcons from '@/assets/icons/global/back-icons';
import EnglishIcon from '@/assets/icons/profile/english-icon';
import IndonesiaIcon from '@/assets/icons/profile/indonesia-icon';
import { router } from 'expo-router';
import { Text, View, TouchableOpacity, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';

const LanguageScreen = () => {
  const [isSelectedIndonesia, setSelectionIndonesia] = useState(false);
  const [isSelectedEnglish, setSelectionEnglish] = useState(false);

  return (
    <SafeAreaView edges={['top', 'left', 'right']}>
      <View
        className="flex-row bg-white items-center p-4"
        style={{ borderBottomWidth: 1, borderBottomColor: '#DEDEDE' }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <BackIcons width={24} height={24} fill="#000" />
        </TouchableOpacity>
        <Text className="text-black text-[16px] font-bold ml-3">
          Select Language
        </Text>
      </View>
      <View className="mt-1 p-4 bg-white">
        <View className="border border-gray-300 p-4 rounded-xl ">
          <View
            className="flex-row items-center pb-4"
            style={{ borderBottomWidth: 1, borderBottomColor: '#DEDEDE' }}
          >
            <IndonesiaIcon width={20} height={15} />
            <Text className="text-[14px] font-medium ml-2">Indonesia</Text>
            <View className="flex-1" />
            <Pressable
              onPress={() => setSelectionIndonesia(!isSelectedIndonesia)}
            >
              <View
                className={`w-5 h-5 rounded-md border-2 ${
                  isSelectedIndonesia
                    ? 'bg-primary border-primary'
                    : 'border-[#DEDEDE]'
                } items-center justify-center`}
              >
                {isSelectedIndonesia && (
                  <Text className="text-white text-xs font-bold">✓</Text>
                )}
              </View>
            </Pressable>
          </View>
          <View className="flex-row items-center pt-4">
            <EnglishIcon width={20} height={15} />
            <Text className="text-[14px] font-medium ml-2">English</Text>
            <View className="flex-1" />
            <Pressable onPress={() => setSelectionEnglish(!isSelectedEnglish)}>
              <View
                className={`w-5 h-5 rounded-md border-2 ${
                  isSelectedEnglish
                    ? 'bg-primary border-primary'
                    : 'border-[#DEDEDE]'
                } items-center justify-center`}
              >
                {isSelectedEnglish && (
                  <Text className="text-white text-xs font-bold">✓</Text>
                )}
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default LanguageScreen;
