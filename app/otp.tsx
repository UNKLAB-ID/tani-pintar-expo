// screens/AuthScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, BackHandler } from 'react-native';
import OTPInput from '@/components/ui/component-globals/input-otp';
import CustomButton from '@/components/ui/component-globals/button-primary';
import { router, useLocalSearchParams, useRootNavigationState } from 'expo-router';
import BackIcons from '@/assets/icons/global/back-icons';

const AuthScreen = () => {
  const [otp, setOtp] = useState('');
  const {back}= useLocalSearchParams()
  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      if(back === "register"){
        router.replace('/register');
      }else if(back === "login"){
        router.replace('/login');
      }
    }
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        handleBack();
        return true;
      }
    );

    return () => backHandler.remove();
  }, []);


  return (
    <SafeAreaView className="px-5 bg-white pt-[64px]">
      <TouchableOpacity className="mb-3" onPress={handleBack}>
        <BackIcons width={24} height={24} color={"#1F1F1F"} />
      </TouchableOpacity>
      <View>
        <Text className="text-3xl font-semibold text-text-primary">Input Verification Code</Text>
        <Text className="text-xl text-text-secondary">We have sent a code to <Text className='text-text-primary'>baus@gmail.com</Text></Text>
        <View className='mt-[50px]'>
          <OTPInput value={otp} onChange={setOtp} />
        </View>
        <Text className="text-center text-xl text-text-primary mt-3">Send code again <Text className='text-primary'>00 : 59</Text></Text>
        <View className='mt-[50px]'>
          <CustomButton title='Verify Now' className='py-[10px]' onPress={() => router.push("/success-otp")} />
        </View>
        <Text className="text-center text-xl text-text-secondary mt-7">Didn’t you receive any code? <Text className='text-primary'>Resend Code</Text></Text>
      </View>
    </SafeAreaView>
  );
};

export default AuthScreen;
