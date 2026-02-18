import React from 'react';
import ScanScreen from '../AI';
import DashboardScreen from '../dashboard/dashboard';
import { useAuthStore } from '@/store/auth/role';

const AiScreen = () => {
  const role = useAuthStore(state => state.role);

  if (role === 'vendor') {
    return <DashboardScreen />;
  }
  return <ScanScreen />;
};

export default AiScreen;
