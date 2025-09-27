import { Modal, View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { router } from 'expo-router';

interface ModalLeaveReviewProps {
  visible: boolean;
  onClose: () => void;
  onSubmit?: () => void;
}

const ModalLeaveReview = ({
  visible,
  onClose,
  onSubmit,
}: ModalLeaveReviewProps) => {
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
          <Text className="font-semibold text-[18px]">Leave Review?</Text>
          <Text className="text-center text-[14px] text-[#B3B3B3] my-1">
            You’re about to leave the review page. Changes will not be saved.
          </Text>

          {/* Buttons */}
          <View className="flex-row px-5 pb-6 pt-4 w-full">
            <>
              <TouchableOpacity
                onPress={() => router.back()}
                className="flex-1 py-3 bg-[#F5F5F5] rounded-xl border border-primary mr-2"
              >
                <Text className="text-center text-primary font-semibold">
                  Leave
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onClose}
                className="flex-1 py-3 bg-primary rounded-xl"
              >
                <Text className="text-center text-white font-semibold">
                  Stay
                </Text>
              </TouchableOpacity>
            </>
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default ModalLeaveReview;
