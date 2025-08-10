import React from 'react';
import { Modal, View, TouchableOpacity, Text, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomButton from '../../component-globals/button-primary';
import { router } from 'expo-router';

interface ModalSuccessTaniProps {
  modalSuccess: boolean;
  setModalSuccess: (value: boolean) => void;
}

const ModalSuccessTani: React.FC<ModalSuccessTaniProps> = ({
  modalSuccess,
  setModalSuccess,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <Modal
      visible={modalSuccess}
      transparent
      animationType="slide"
      statusBarTranslucent={true}
      onRequestClose={() => setModalSuccess(false)}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}
      >
        <TouchableOpacity
          style={{ flex: 1 }}
          activeOpacity={1}
          onPressOut={() => setModalSuccess(false)}
        />
        <View
          style={{
            backgroundColor: '#fff',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            height: 400,
            paddingBottom: insets.bottom,
          }}
        >
          {/* Header */}
          <View
            className="flex-row items-center"
            style={{
              paddingTop: 40,
              paddingBottom: 20,
              paddingHorizontal: 14,
              justifyContent: 'center', // ini supaya horisontal center
            }}
          >
            <Image source={require('../../../../assets/images/succes.png')} />
          </View>
          <View style={{ paddingHorizontal: 16 }}>
            <Text
              style={{
                fontWeight: 600,
                fontSize: 18,
                textAlign: 'center',
              }}
            >
              Penawaranmu berhasil diajukan.
            </Text>
            <Text
              style={{
                fontWeight: 600,
                fontSize: 18,
                textAlign: 'center',
              }}
            >
              diajukan.
            </Text>
            <Text
              style={{ textAlign: 'center', marginTop: 10, marginBottom: 50 }}
            >
              Kamu bisa cek statusnya kapan saja di menu penawaran
            </Text>
          </View>
          <View style={{ flex: 1, paddingHorizontal: 16 }}>
            <CustomButton
              title="Kembali"
              onPress={() => {
                router.push('/(tabs)/export?type_akses=history');
                setModalSuccess(false);
              }}
              className="py-[13px]"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalSuccessTani;
