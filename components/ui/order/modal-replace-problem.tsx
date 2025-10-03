import { router } from 'expo-router';
import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';

interface ModalReplaceProblemProps {
  visible: boolean;
  onClose: () => void;
  onConfirm?: () => void;
}

const ModalReplaceProblem = ({
  visible,
  onClose,
  onConfirm,
}: ModalReplaceProblemProps) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View
        className="justify-center items-center px-4 "
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.4)',
        }}
      >
        <View className="bg-white rounded-xl items-center pt-6 px-5 w-full max-w-md">
          <Text className="font-semibold text-[18px] text-center">
            Replace with this problem?
          </Text>
          <Text className="text-center text-[14px] text-[#B3B3B3] mt-2 mb-5">
            You need to refill the complaint details for new issues.
          </Text>

          {/* Buttons */}
          <View className="flex-row w-full p-4">
            <TouchableOpacity
              onPress={onClose}
              className="flex-1 py-3 bg-[#F5F5F5] rounded-xl border border-gray-300 mr-2"
            >
              <Text className="text-center text-black font-semibold">Back</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onConfirm}
              className="flex-1 py-3 bg-green-600 rounded-xl"
            >
              <Text className="text-center text-white font-semibold">
                Yes, Change
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalReplaceProblem;
