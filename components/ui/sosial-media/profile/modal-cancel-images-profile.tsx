import { router } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface ModalCancelImagesProfileProps {
  setShowDiscardModal: (visible: boolean) => void;
}

const ModalCancelImagesProfile: React.FC<ModalCancelImagesProfileProps> = ({
  setShowDiscardModal,
}) => {
  const handleDiscard = () => {
    setShowDiscardModal(false);
    router.replace('/sosial-media/profile-sosial-media?query=profile');
  };

  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          backgroundColor: '#fff',
          padding: 20,
          borderRadius: 10,
          width: '80%',
          alignItems: 'center',
        }}
      >
        <Text style={{ marginBottom: 20, color: '#434343', fontSize: 14 }}>
          You have unsaved changes. Do you want to discard them?
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            width: '100%',
          }}
        >
          <TouchableOpacity onPress={handleDiscard}>
            <Text
              style={{ color: '#6F6F6F', fontWeight: 500, marginRight: 20 }}
            >
              Discard
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowDiscardModal(false)}>
            <Text style={{ color: '#6F6F6F', fontWeight: 500 }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ModalCancelImagesProfile;
