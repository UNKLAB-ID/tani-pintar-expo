import FacebookIcons from '@/assets/icons/global/facebook-icons';
import InstragamIcons from '@/assets/icons/global/instragam-icons';
import MessengerIcons from '@/assets/icons/global/messenger-icons';
import TelegramIcons from '@/assets/icons/global/telegram-icons';
import WaIcons from '@/assets/icons/global/wa-icons';
import CopyIcons from '@/assets/icons/sosial-media/copy-icons';
import GarisHorizotal from '@/assets/icons/sosial-media/garis-horizontal-icons';
import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

interface ModalSHareProfileProps {
  modalShare: boolean;
  setModalShare: (value: boolean) => void;
}

const ModalShare: React.FC<ModalSHareProfileProps> = ({
  modalShare,
  setModalShare,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalShare}
      statusBarTranslucent={true}
      onRequestClose={() => {
        setModalShare(false);
      }}
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
          onPressOut={() => setModalShare(false)}
        />
        <View
          style={{
            backgroundColor: '#fff',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingHorizontal: 16,
            paddingVertical: 20,
            height: 290,
          }}
        >
          {/* Garis horizontal */}
          <View style={{ alignItems: 'center', marginBottom: 16 }}>
            <GarisHorizotal width={86} height={6} />
          </View>
          <Text style={{ fontSize: 18, fontWeight: 600, marginBottom: 20 }}>
            Share link
          </Text>
          <View
            style={{ backgroundColor: '#F9F9F9', height: 64, borderRadius: 12 }}
            className="flex-row items-center justify-between px-4"
          >
            <Text style={{ fontSize: 16, color: '#525252' }}>
              https://www.taniverse.id/natasyajulio
            </Text>
            <View className="flex-row items-center justify-center">
              <CopyIcons width={24} height={24} />
            </View>
          </View>
          <View className="mt-5 flex-row items-center justify-between">
            <View>
              <View className="flex-row items-center justify-center">
                <View
                  className="flex-row items-center justify-center"
                  style={{
                    width: 40,
                    height: 40,
                    backgroundColor: '#F4F4F4',
                    borderRadius: 999,
                  }}
                >
                  <WaIcons width={20} height={20} />
                </View>
              </View>
              <Text style={{ fontSize: 12, color: '#525252' }}>Whatsapp</Text>
            </View>

            <View>
              <View className="flex-row items-center justify-center">
                <View
                  className="flex-row items-center justify-center"
                  style={{
                    width: 40,
                    height: 40,
                    backgroundColor: '#F4F4F4',
                    borderRadius: 999,
                  }}
                >
                  <FacebookIcons width={20} height={19.88} />
                </View>
              </View>
              <Text style={{ fontSize: 12, color: '#525252' }}>Facebook</Text>
            </View>

            <View>
              <View className="flex-row items-center justify-center">
                <View
                  className="flex-row items-center justify-center"
                  style={{
                    width: 40,
                    height: 40,
                    backgroundColor: '#F4F4F4',
                    borderRadius: 999,
                  }}
                >
                  <InstragamIcons width={20} height={20} />
                </View>
              </View>
              <Text style={{ fontSize: 12, color: '#525252' }}>Instagram</Text>
            </View>

            <View>
              <View className="flex-row items-center justify-center">
                <View
                  className="flex-row items-center justify-center"
                  style={{
                    width: 40,
                    height: 40,
                    backgroundColor: '#F4F4F4',
                    borderRadius: 999,
                  }}
                >
                  <TelegramIcons width={20} height={20} />
                </View>
              </View>
              <Text style={{ fontSize: 12, color: '#525252' }}>Telegram</Text>
            </View>

            <View>
              <View className="flex-row items-center justify-center">
                <View
                  className="flex-row items-center justify-center"
                  style={{
                    width: 40,
                    height: 40,
                    backgroundColor: '#F4F4F4',
                    borderRadius: 999,
                  }}
                >
                  <MessengerIcons width={20} height={20} />
                </View>
              </View>
              <Text style={{ fontSize: 12, color: '#525252' }}>Messenger</Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalShare;
