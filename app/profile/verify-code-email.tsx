import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, BackHandler, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as SecureStore from 'expo-secure-store';
import { useForm, Controller } from 'react-hook-form';
import { router, useLocalSearchParams } from 'expo-router';

import OTPInput from '@/components/ui/component-globals/input-otp';
import CustomButton from '@/components/ui/component-globals/button-primary';

type Props = {
  email: string;
  onSuccess?: () => void;
};
const VerifyCodeEmail = ({ email, onSuccess }: Props) => {
  const {
    control,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: { code: '' },
  });

  const handleVerify = (data: { code: string }) => {
    if (!data.code || data.code.length !== 4) {
      setError('code', {
        type: 'manual',
        message: 'Code must be 4 digits',
      });
      return;
    }

    if (data.code === '0000') {
      SecureStore.setItemAsync('new_email', email as string);
      router.replace({
        pathname: '/profile/edit-profile',
        params: { newEmail: email },
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-5 pt-[62px]">
      <Text className="text-3xl font-semibold text-text-primary">
        Input Verification Code
      </Text>
      <Text className="text-xl text-text-secondary font-medium mt-1">
        We have sent a code to <Text className="">{email}</Text>
      </Text>

      {/* OTP Input */}
      <View className="mt-[50px] ">
        <Controller
          control={control}
          name="code"
          rules={{
            required: 'OTP is required',
            minLength: { value: 4, message: 'OTP must be 4 digits' },
          }}
          render={({ field: { value }, fieldState: { error } }) => (
            <>
              <OTPInput value={value} onChange={val => setValue('code', val)} />
              {error && (
                <Text className="text-red-500 mt-1 text-center">
                  {error.message}
                </Text>
              )}
            </>
          )}
        />
      </View>

      {/* Timer */}
      <Text className="text-center text-xl text-text-primary mt-3 font-medium">
        Send code again <Text className="text-primary">00 : 59</Text>
      </Text>

      {/* Submit Button */}
      <View className="mt-[50px]">
        <CustomButton
          title="Verify Now"
          className="py-[10px]"
          onPress={handleSubmit(handleVerify)}
        />
      </View>

      {/* Resend Text */}
      <Text className="text-center text-xl text-text-secondary mt-7 font-medium">
        Didn’t you receive any code?{' '}
        <Text className="text-primary">Resend Code</Text>
      </Text>
    </SafeAreaView>
  );
};

export default VerifyCodeEmail;
