import React from 'react';
import { View, Text, Image, Modal, TouchableOpacity } from 'react-native';

interface ModalVoucherProps {
  visible: boolean;
  status: 'success' | 'error';
  onClose: () => void;
  onUseVoucher?: () => void;
}

const ModalVoucher = ({
  visible,
  status,
  onClose,
  onUseVoucher,
}: ModalVoucherProps) => {
  const isSuccess = status === 'success';

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View
        className="justify-center items-center px-4"
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.4)',
        }}
      >
        <View className="bg-white rounded-xl items-center w-full">
          {/* Image */}
          <Image
            source={
              isSuccess
                ? require('../../../assets/images/CheckSuccess.png')
                : require('../../../assets/images/CheckFailed.png')
            }
            style={{ width: 366, height: 271 }}
            resizeMode="contain"
          />

          {/* Buttons */}
          <View className="flex-row px-5 pb-6 pt-4 w-full">
            {isSuccess ? (
              <>
                <TouchableOpacity
                  onPress={onClose}
                  className="flex-1 py-3 bg-[#F5F5F5] rounded-xl border border-primary mr-2"
                >
                  <Text className="text-center text-black font-semibold">
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={onUseVoucher}
                  className="flex-1 py-3 bg-primary rounded-xl"
                >
                  <Text className="text-center text-white font-semibold">
                    Use Voucher
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity
                onPress={onClose}
                className="flex-1 py-3 bg-primary rounded-xl"
              >
                <Text className="text-center text-white font-semibold">
                  Okay, Got it
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalVoucher;
