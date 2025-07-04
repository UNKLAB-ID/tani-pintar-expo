import React from 'react';
import { View, Text, TouchableOpacity, Modal, Dimensions } from 'react-native';

interface ModalDeleteProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  selectedCount?: number;
}

const ModalDelete: React.FC<ModalDeleteProps> = ({
  isVisible,
  onClose,
  onConfirm,
  selectedCount = 0,
}) => {
  return (
    <Modal
      transparent
      visible={isVisible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View
        className="flex-1 justify-center items-center"
        style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      >
        <View
          className="bg-white p-5 mx-4 rounded-2xl items-center"
          style={{ marginBottom: 30 }}
        >
          <Text className="text-[16px] font-semibold text-black text-center mb-2">
            Delete {selectedCount} item{selectedCount > 1 ? 's' : ''}?
          </Text>
          <Text className="text-[14px] text-[#555] text-center mb-5">
            This action cannot be undone. Are you sure you want to delete
            selected product?
          </Text>

          <View className="flex-row  justify-between">
            <TouchableOpacity
              className="flex-1 mr-2 border border-primary py-2 rounded-xl items-center"
              onPress={onClose}
            >
              <Text className="text-primary font-semibold text-[16px]">
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 mr-2 border border-primary py-2 rounded-xl items-center"
              style={{ backgroundColor: '#169953' }}
              onPress={onConfirm}
            >
              <Text className="text-white font-semibold text-[16px]">
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalDelete;
