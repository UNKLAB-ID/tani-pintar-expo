// screens/AuthScreen.tsx
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import OTPInput from '@/components/ui/component-globals/input-otp';
import CustomButton from '@/components/ui/component-globals/button-primary';
import { router } from 'expo-router';

const AuthScreen = () => {
  const [otp, setOtp] = useState('');

  console.log(otp);

  return (
    <View className="px-4 bg-white">
      <Text className="text-3xl font-semibold text-text-primary">Input Verification Code</Text>
      <Text className="text-xl text-text-secondary">We have sent a code to <Text className='text-text-primary'>baus@gmail.com</Text></Text>
      <View >
      <OTPInput value={otp} onChange={setOtp} />
      </View>
      <Text className="text-center text-xl text-text-primary">Send code again <Text className='text-primary'>00 : 59</Text></Text>
      <CustomButton title='Verify Now' className='py-[10px]' onPress={()=> router.push("/(tabs)/sosmed")} />
        <Text className="text-center text-xl text-text-secondary">Didn’t you receive any code? <Text className='text-primary'>Resend Code</Text></Text>
    </View>
  );
};

export default AuthScreen;
