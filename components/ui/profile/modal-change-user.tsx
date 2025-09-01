import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { X } from 'lucide-react-native';
import { router } from 'expo-router';

import { useAuthStore } from '@/store/auth/role';

interface ChangeUserModalProps {
  visible: boolean;
  onClose: () => void;
}

const USER_ROLES = ['tani', 'vendor', 'agent'];

const ChangeUserModal: React.FC<ChangeUserModalProps> = ({
  visible,
  onClose,
}) => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const setRole = useAuthStore(state => state.setRole);

  const handleSubmit = () => {
    if (!selectedRole) return;

    setRole(selectedRole as 'tani' | 'vendor' | 'agent');

    switch (selectedRole) {
      case 'vendor':
        router.replace('/profile/register-role-user');
        break;
      case 'agent':
        router.replace('/profile/register-role-user');
        break;
      case 'tani':
        router.replace('/(tabs)/sosmed');
        break;
      default:
        router.replace('/');
        break;
    }

    onClose();
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
            <Text style={{ fontSize: 18, fontWeight: '600' }}>Try As Role</Text>
            <TouchableOpacity onPress={onClose}>
              <X size={22} color="#000" />
            </TouchableOpacity>
          </View>

          {/* Role List */}
          <ScrollView showsVerticalScrollIndicator={false}>
            {USER_ROLES.map(role => {
              const isSelected = selectedRole === role;
              return (
                <TouchableOpacity
                  key={role}
                  onPress={() => setSelectedRole(role)}
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
                  <Text
                    style={{ color: '#000', fontWeight: '500', fontSize: 16 }}
                  >
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </Text>
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
              Try Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ChangeUserModal;
