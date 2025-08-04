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

interface ChangeUserModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit?: (role: string) => void;
}

const USER_ROLES = ['Distributor', 'Vendor', 'Consumen', 'Suplier', 'Agent'];

const ChangeUserModal: React.FC<ChangeUserModalProps> = ({
  visible,
  onClose,
  onSubmit,
}) => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!selectedRole) return;

    // Navigasi khusus saat memilih "Vendor"
    if (selectedRole === 'Vendor') {
      router.push('/vendor/dashboard');
    }

    // Bisa juga handle lainnya kalau mau
    if (onSubmit) {
      onSubmit(selectedRole);
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
        {/* Press outside to close */}
        <Pressable className="flex-1" onPress={onClose} />
        <View
          style={{
            backgroundColor: 'white',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 20,
          }}
        >
          {/* Header */}
          <View className="flex-row justify-between items-center mb-5">
            <Text className="text-lg font-semibold">Change User</Text>
            <TouchableOpacity onPress={onClose}>
              <X size={22} color="#000" />
            </TouchableOpacity>
          </View>

          {/* Roles */}
          <ScrollView showsVerticalScrollIndicator={false}>
            {USER_ROLES.map(role => {
              const isSelected = selectedRole === role;
              return (
                <TouchableOpacity
                  key={role}
                  onPress={() => setSelectedRole(role)}
                  className={`border rounded-xl px-4 py-3 mb-3 ${
                    isSelected
                      ? 'border-[#169953] bg-[#D7FCE8]'
                      : 'border-gray-300 bg-white'
                  }`}
                >
                  <Text className="text-black font-medium text-base">
                    {role}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Button pinned at bottom inside modal */}
          <TouchableOpacity
            disabled={!selectedRole}
            onPress={handleSubmit}
            className={`mt-5 rounded-xl py-3 border 
    ${selectedRole ? 'bg-primary border-primary' : 'bg-[#E9E9E9] border-[#E9E9E9]'}`}
          >
            <Text
              className={`text-center text-base font-semibold ${
                selectedRole ? 'text-white' : 'text-[#B0B0B0]'
              }`}
            >
              Carry On
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ChangeUserModal;
