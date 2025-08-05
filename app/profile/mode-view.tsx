import BackIcons from '@/assets/icons/global/back-icons';

import { router } from 'expo-router';
import { Text, View, TouchableOpacity, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { useThemeStore } from '@/store/theme/mode-view';

const ModeView = () => {
  const { theme, setTheme } = useThemeStore();

  const isSelectedLight = theme === 'light';
  const isSelectedDark = theme === 'dark';

  const handleLightSelect = () => {
    setTheme(isSelectedLight ? null : 'light');
  };

  const handleDarkSelect = () => {
    setTheme(isSelectedDark ? null : 'dark');
  };

  return (
    <SafeAreaView edges={['top', 'left', 'right']}>
      <View
        className="flex-row bg-white items-center p-4"
        style={{ borderBottomWidth: 1, borderBottomColor: '#DEDEDE' }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <BackIcons width={24} height={24} fill="#000" />
        </TouchableOpacity>
        <Text className="text-black text-[16px] font-bold ml-3">Mode View</Text>
      </View>

      <View className="mt-1 pl-4 py-4 bg-white">
        {/* Light Mode */}
        <View
          className="flex-row justify-between pb-4 items-start"
          style={{ borderBottomWidth: 1, borderBottomColor: '#DEDEDE' }}
        >
          <View className="flex-1">
            <Text className="text-[16px] font-medium ml-2">Light Mode</Text>
            <Text className="text-[14px] text-[#959595] ml-2 mt-1">
              Bright color display, suitable for use in daylight or bright
              places.
            </Text>
          </View>

          <Pressable onPress={handleLightSelect}>
            <View
              className={`w-5 h-5 rounded-md border-2 mr-4 mt-1 ${isSelectedLight ? 'bg-primary border-primary' : 'border-[#DEDEDE]'} items-center justify-center`}
            >
              {isSelectedLight && (
                <Text className="text-white text-xs font-bold">✓</Text>
              )}
            </View>
          </Pressable>
        </View>

        {/* Dark Mode */}
        <View
          className="flex-row justify-between py-4 items-start"
          style={{ borderBottomWidth: 1, borderBottomColor: '#DEDEDE' }}
        >
          <View className="flex-1">
            <Text className="text-[16px] font-medium ml-2">Dark Mode</Text>
            <Text className="text-[14px] text-[#959595] ml-2 mt-1">
              Dark color display, suitable for use at night or dark places.
            </Text>
          </View>

          <Pressable onPress={handleDarkSelect}>
            <View
              className={`w-5 h-5 rounded-md border-2 mr-4 mt-1 ${isSelectedDark ? 'bg-primary border-primary' : 'border-[#DEDEDE]'} items-center justify-center`}
            >
              {isSelectedDark && (
                <Text className="text-white text-xs font-bold">✓</Text>
              )}
            </View>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default ModeView;
