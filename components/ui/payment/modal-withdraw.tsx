import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';

interface ModalWithdrawProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ModalWithdraw: React.FC<ModalWithdrawProps> = ({
  visible,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal
      transparent
      visible={visible}
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
            TaniPay balance is insufficient
          </Text>
          <Text className="text-[14px] text-[#959595] text-center mb-5">
            The minimum available balance for cash withdrawal is Rp52.000. Top
            up your balance now and try again.
          </Text>

          <View className="flex-row  justify-between">
            <TouchableOpacity
              className="flex-1 mr-2 border border-primary py-2 rounded-xl items-center"
              onPress={onClose}
            >
              <Text className="text-primary font-semibold text-[16px]">
                Back
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 mr-2 border border-primary py-2 rounded-xl items-center"
              style={{ backgroundColor: '#169953' }}
              onPress={onConfirm}
            >
              <Text className="text-white font-semibold text-[16px]">
                Top up balance
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalWithdraw;
