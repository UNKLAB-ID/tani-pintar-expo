import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, BackHandler } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackIcons from '@/assets/icons/global/back-icons';
import ChangeEmailForm from '@/components/ui/profile/change-email-form';
import VerifyCodeEmail from './verify-code-email';
import { router } from 'expo-router';

const ChangeEmail = () => {
  const [showVerify, setShowVerify] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = (submittedEmail: string) => {
    setEmail(submittedEmail);
    setShowVerify(true);
  };

  const handleBack = () => {
    if (showVerify) {
      setShowVerify(false);
      return true;
    }

    // Kalau pakai router.back() → return true
    // Kalau pakai exitApp → tetap harus return boolean
    BackHandler.exitApp();
    return true;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBack
    );
    return () => backHandler.remove();
  }, [showVerify]);

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-white">
      {/* Header - tetap Change Email */}
      <View
        className="flex-row items-center px-5 pt-4 pb-3"
        style={{ borderBottomWidth: 1, borderColor: '#F4F4F4' }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <BackIcons width={24} height={24} />
        </TouchableOpacity>
        <Text className="text-[16px] font-semibold ml-3">Change Email</Text>
      </View>

      {/* Body: Tampilkan form berdasarkan state */}
      {showVerify ? (
        <VerifyCodeEmail email={email} />
      ) : (
        <ChangeEmailForm onSubmit={handleSubmit} />
      )}
    </SafeAreaView>
  );
};

export default ChangeEmail;
