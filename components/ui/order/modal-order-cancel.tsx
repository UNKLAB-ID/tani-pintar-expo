import React from 'react';
import { View, Text, Image, Modal, TouchableOpacity } from 'react-native';

interface ModalOrderCancelProps {
  visible: boolean;
  onClose: () => void;
  onCancel?: () => void;
}

const ModalOrderCancel = ({
  visible,
  onClose,
  onCancel,
}: ModalOrderCancelProps) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View
        className="justify-center items-center px-4"
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.4)',
        }}
      >
        <View className="bg-white rounded-xl items-center p-3 w-full">
          {/* Image */}
          <Image
            source={require('@/assets/images/order-cancel.png')}
            resizeMode="contain"
          />
          <Text className="font-semibold text-[18px]">Cancel Order?</Text>
          <Text className="text-center text-[14px] text-[#B3B3B3] my-1">
            The order will disappear from your order list. are you sure you want
            to cancel the order?
          </Text>

          {/* Buttons */}
          <View className="flex-row px-5 pb-6 pt-4 w-full">
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
                onPress={onCancel}
                className="flex-1 py-3 bg-primary rounded-xl"
              >
                <Text className="text-center text-white font-semibold">
                  Yes, Cancel
                </Text>
              </TouchableOpacity>
            </>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalOrderCancel;
