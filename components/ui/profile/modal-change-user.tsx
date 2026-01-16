import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { X, Check } from 'lucide-react-native';
import { router } from 'expo-router';
import { useQuery } from '@tanstack/react-query';

import { useAuthStore } from '@/store/auth/role';
import { useRegisterRoleStore } from '@/store/auth/register-role';
import { useTranslate } from '@/i18n';
import api from '@/utils/api/api';

interface ChangeUserModalProps {
  visible: boolean;
  onClose: () => void;
}

const USER_ROLES = ['tani', 'vendor', 'agent'] as const;

const ROLE_LABELS: Record<string, { id: string; en: string }> = {
  tani: { id: 'Tani', en: 'Farmer' },
  vendor: { id: 'Vndor', en: 'Vendor' },
  agent: { id: 'Agen', en: 'Agent' },
};

const ChangeUserModal: React.FC<ChangeUserModalProps> = ({
  visible,
  onClose,
}) => {
  const t = useTranslate();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const { resetForm } = useRegisterRoleStore();

  const { vendorStatus, setRole, setVendorStatus } = useAuthStore();

  // Check vendor registration status from API
  const { data: vendorData, isLoading: isCheckingVendor } = useQuery({
    queryKey: ['vendorStatus'],
    queryFn: async () => {
      try {
        const res = await api.get('/vendors/me/');
        if (res.success && res.data) {
          // Update store with vendor status
          setVendorStatus({
            isRegistered: true,
            vendorType: res.data.vendor_type || 'individual',
            vendorId: res.data.id || res.data.uuid,
          });
          return res.data;
        }
        return null;
      } catch {
        return null;
      }
    },
    enabled: visible, // Only fetch when modal is visible
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  const isVendorRegistered = vendorStatus.isRegistered || !!vendorData;

  const handleSubmit = () => {
    if (!selectedRole) return;

    setRole(selectedRole as 'tani' | 'vendor' | 'agent');

    switch (selectedRole) {
      case 'vendor':
        if (isVendorRegistered) {
          // Already registered, go to vendor dashboard
          router.push('/(tabs)/ecommerce');
        } else {
          // Not registered, go to registration
          resetForm();
          router.push('/profile/register-role-user');
        }
        break;
      case 'agent':
        router.push('/(tabs)/sosmed');
        break;
      default:
        router.push('/(tabs)/sosmed');
        break;
    }

    onClose();
  };

  const getRoleDisplayName = (role: string) => {
    const labels = ROLE_LABELS[role];
    if (!labels) return role.charAt(0).toUpperCase() + role.slice(1);
    // Use translation key or fallback
    return t(
      role === 'tani' ? 'farmer' : role === 'vendor' ? 'vendor' : 'agent'
    );
  };

  const getRoleStatus = (role: string) => {
    if (role === 'vendor' && isVendorRegistered) {
      return { registered: true, label: t('available') };
    }
    return null;
  };

  return (
    <Modal transparent animationType="slide" visible={visible}>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          backgroundColor: 'rgba(0,0,0,0.4)',
        }}
      >
        <Pressable style={{ flex: 1 }} onPress={onClose} />

        <View
          style={{
            backgroundColor: 'white',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 20,
            maxHeight: '50%',
          }}
        >
          {/* Header */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 20,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: '600' }}>
              {t('changeUser')}
            </Text>
            <TouchableOpacity onPress={onClose}>
              <X size={22} color="#000" />
            </TouchableOpacity>
          </View>

          {/* Loading indicator */}
          {isCheckingVendor && (
            <View style={{ alignItems: 'center', paddingVertical: 10 }}>
              <ActivityIndicator size="small" color="#169953" />
            </View>
          )}

          {/* Role List */}
          <ScrollView showsVerticalScrollIndicator={false}>
            {USER_ROLES.map(role => {
              const isSelected = selectedRole === role;
              const status = getRoleStatus(role);

              return (
                <TouchableOpacity
                  key={role}
                  onPress={() => {
                    if (role !== 'vendor' || !isVendorRegistered) {
                      resetForm();
                    }
                    setSelectedRole(role);
                  }}
                  style={{
                    borderWidth: 1,
                    borderRadius: 16,
                    paddingVertical: 12,
                    paddingHorizontal: 16,
                    marginBottom: 12,
                    borderColor: isSelected ? '#169953' : '#ccc',
                    backgroundColor: isSelected ? '#D7FCE8' : '#fff',
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Text
                      style={{
                        color: '#000',
                        fontWeight: '500',
                        fontSize: 16,
                      }}
                    >
                      {getRoleDisplayName(role)}
                    </Text>
                    {status && status.label && (
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          backgroundColor: status.registered
                            ? '#D7FCE8'
                            : '#FFF3CD',
                          paddingHorizontal: 8,
                          paddingVertical: 4,
                          borderRadius: 8,
                        }}
                      >
                        {status.registered && (
                          <Check size={14} color="#169953" />
                        )}
                        <Text
                          style={{
                            fontSize: 12,
                            color: status.registered ? '#169953' : '#856404',
                            marginLeft: status.registered ? 4 : 0,
                          }}
                        >
                          {status.label}
                        </Text>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Submit Button */}
          <TouchableOpacity
            disabled={!selectedRole}
            onPress={handleSubmit}
            style={{
              marginTop: 20,
              borderRadius: 16,
              paddingVertical: 14,
              borderWidth: 1,
              backgroundColor: selectedRole ? '#169953' : '#E9E9E9',
              borderColor: selectedRole ? '#169953' : '#E9E9E9',
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                fontSize: 16,
                fontWeight: '600',
                color: selectedRole ? '#fff' : '#B0B0B0',
              }}
            >
              {selectedRole === 'vendor' && !isVendorRegistered
                ? t('register')
                : t('confirm')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ChangeUserModal;
