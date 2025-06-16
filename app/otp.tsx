// screens/AuthScreen.tsx
import React, { useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  BackHandler,
  Alert,
} from 'react-native';
import OTPInput from '@/components/ui/component-globals/input-otp';
import CustomButton from '@/components/ui/component-globals/button-primary';
import { router, useLocalSearchParams } from 'expo-router';
import BackIcons from '@/assets/icons/global/back-icons';
import { useForm, Controller } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import api from '@/utils/api/api';
import * as SecureStore from 'expo-secure-store';

const AuthScreen = () => {
  const { back, phone } = useLocalSearchParams();
  const {
    control,
    handleSubmit,
    setValue,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      code: '',
    },
  });

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      if (back === 'register') {
        router.replace('/register');
      } else if (back === 'login') {
        router.replace('/login');
      }
    }
  };

  const mutation = useMutation({
    mutationFn: async (data: { code: string }) => {
      const required = {
        code: data.code,
        phone_number: phone,
      };

      if (back === 'register') {
        return await api.post('/accounts/register/confirm', required);
      } else if (back === 'login') {
        return await api.post('/accounts/login/confirm', required);
      }
    },

    onSuccess: async res => {
      if (res?.success) {
        // TODO: Update this to better handling in the future
        // Save the JWT token to secure storage
        await SecureStore.setItemAsync('access_token', res.data.access);
        await SecureStore.setItemAsync('refresh_token', res.data.refresh);

        router.replace('/success-otp');
      } else if (res?.error) {
        Object.keys(res.error).forEach(field => {
          setError(field as keyof typeof errors, {
            type: 'server',
            message: res.error[field][0], // Ambil pesan error pertama
          });
        });
      } else {
        Alert.alert('Register Failed', res?.message);
      }
    },

    onError: error => {
      console.error('Verification error:', error);
      Alert.alert('Verification Failed', error.message);
    },
  });

  const handleVerify = (data: { code: string }) => {
    if (!data.code || data.code.length !== 4) {
      return;
    }

    mutation.mutate(data);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView className="px-5 bg-white pt-[64px]">
      <TouchableOpacity className="mb-3" onPress={handleBack}>
        <BackIcons width={24} height={24} color={'#1F1F1F'} />
      </TouchableOpacity>
      <View>
        <Text className="text-3xl font-semibold text-text-primary">
          Input Verification Code
        </Text>
        <Text
          className="text-xl text-text-secondary"
          style={{ fontWeight: 500 }}
        >
          We have sent a code to{' '}
          <Text className="text-text-primary">{phone}</Text>
        </Text>
        <View className="mt-[50px]">
          <Controller
            control={control}
            name="code"
            rules={{
              required: 'OTP is required',
              minLength: { value: 4, message: 'OTP must be 4 digits' },
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <OTPInput
                  value={value}
                  onChange={val => setValue('code', val)}
                />
                {error && (
                  <Text className="text-red-500 mt-1 text-center">
                    {error.message}
                  </Text>
                )}
              </>
            )}
          />
        </View>
        <Text
          className="text-center text-xl text-text-primary mt-3"
          style={{ fontWeight: 500 }}
        >
          Send code again <Text className="text-primary">00 : 59</Text>
        </Text>
        <View className="mt-[50px]">
          <CustomButton
            title="Verify Now"
            className="py-[10px]"
            onPress={handleSubmit(handleVerify)}
          />
        </View>
        <Text
          className="text-center text-xl text-text-secondary mt-7"
          style={{ fontWeight: 500 }}
        >
          Didn’t you receive any code?{' '}
          <Text className="text-primary">Resend Code</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default AuthScreen;
