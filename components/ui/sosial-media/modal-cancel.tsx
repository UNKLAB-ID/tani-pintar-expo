import { router } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface ModalCancelImagesProfileProps {
  setShowDiscardModal: (visible: boolean) => void;
  desciption: string;
  headerDescription?: string;
  textButtonLeft: string;
  textButtonRight: string;
  path: any;
}

const ModalCancel: React.FC<ModalCancelImagesProfileProps> = ({
  setShowDiscardModal,
  desciption,
  headerDescription,
  textButtonLeft,
  textButtonRight,
  path,
}) => {
  const handleDiscard = () => {
    setShowDiscardModal(false);
    router.replace(path);

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
          width: '90%',
          alignItems: 'center',
        }}
      >
        <View>
          {headerDescription && (
            <Text style={{ marginBottom: 10, color: '#434343', fontSize: 18, fontWeight: 600, textAlign: "left" }}>
              {headerDescription}
            </Text>
          )}
          <Text style={{ marginBottom: 20, color: '#434343', fontSize: 14 }}>
            {desciption}
          </Text>
        </View>
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
              {textButtonLeft}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowDiscardModal(false)}>
            <Text style={{ color: '#6F6F6F', fontWeight: 500 }}>{textButtonRight}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ModalCancel;
