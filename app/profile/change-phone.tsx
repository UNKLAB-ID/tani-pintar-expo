import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, BackHandler } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackIcons from '@/assets/icons/global/back-icons';
import ChangePhoneForm from '@/components/ui/profile/change-phone-form';
import VerifyCodePhone from './verify-code-phone';

const ChangePhone = () => {
  const [showVerify, setShowVerify] = useState(false);
  const [phone, setPhone] = useState('');

  const handleSubmit = (submittedPhone: string) => {
    setPhone(submittedPhone);
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
      <View
        className="flex-row items-center px-5 pt-4 pb-3"
        style={{ borderBottomWidth: 1, borderColor: '#F4F4F4' }}
      >
        <TouchableOpacity onPress={handleBack}>
          <BackIcons width={24} height={24} />
        </TouchableOpacity>
        <Text className="text-[16px] font-semibold ml-3">
          Change Phone Number
        </Text>
      </View>

      {/* Body: Tampilkan form berdasarkan state */}
      {showVerify ? (
        <VerifyCodePhone phone={phone} />
      ) : (
        <ChangePhoneForm onSubmit={handleSubmit} />
      )}
    </SafeAreaView>
  );
};

export default ChangePhone;
