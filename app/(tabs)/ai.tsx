import React from 'react';
import ScanScreen from '../AI';
import VendorScreen from '../vendor/dashboard';
import { useAuthStore } from '@/store/auth/role';

const AiScreen = () => {
  const role = useAuthStore(state => state.role);

  if (role === 'vendor') {
    return <VendorScreen />;
  }
  return <ScanScreen />;
};

export default AiScreen;
