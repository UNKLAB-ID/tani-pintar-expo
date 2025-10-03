import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';

type BottomAlertProps = {
  visible: boolean;
  message: string;
  onClose: () => void;
  buttonText?: string;
};

const BottomAlert: React.FC<BottomAlertProps> = ({
  visible,
  message,
  onClose,
  buttonText = 'OK',
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end pb-5 mx-3">
        <View
          style={{ backgroundColor: '#1F1F1F', borderRadius: 16 }}
          className=" px-4 py-3 flex-row justify-between items-center"
        >
          <Text className="text-white text-[13px] flex-1 mr-3">{message}</Text>
          <TouchableOpacity onPress={onClose}>
            <Text className="text-white font-semibold">{buttonText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default BottomAlert;
