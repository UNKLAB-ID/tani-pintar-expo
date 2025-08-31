import React from 'react';
import { View, Text, Image, Modal, TouchableOpacity } from 'react-native';

interface ModalShippedProps {
  visible: boolean;
  onClose: () => void;
  onCancel?: () => void;
}

const ModalShipped = ({ visible, onClose, onCancel }: ModalShippedProps) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View
        className="justify-center items-center px-4"
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.4)',
        }}
      >
        <View className="bg-white rounded-xl items-center pt-4 px-3  w-full">
          <Text className="font-semibold text-[18px]">
            Yeay! Your order is complete 🎉
          </Text>
          <Text className="text-center text-[14px] text-[#B3B3B3] my-1">
            Make sure the items you receive are complete and in good condition
            before clicking &apos;Confirm&apos;. After that, the order will be completed,
            and payment will be forwarded to the Seller.
          </Text>

          {/* Buttons */}
          <View className="flex-row px-5 pb-6 pt-4 w-full">
            <>
              <TouchableOpacity
                onPress={onClose}
                className="flex-1 py-3 bg-[#F5F5F5] rounded-xl border border-primary mr-2"
              >
                <Text className="text-center text-primary font-semibold">
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-1 py-3 bg-primary rounded-xl">
                <Text className="text-center text-white font-semibold">
                  Confirm
                </Text>
              </TouchableOpacity>
            </>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalShipped;
