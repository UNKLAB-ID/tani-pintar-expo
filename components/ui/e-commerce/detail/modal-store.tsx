import React from 'react';
import { View, Text, Modal, TouchableOpacity, Pressable } from 'react-native';
import { X } from 'lucide-react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ReportIcons from '@/assets/icons/sosial-media/report-icons';

interface ModalStoreProps {
  visible: boolean;
  onOpenShare: () => void;
  onClose: () => void;
  onOpenReport?: () => void;
}

const ModalStore: React.FC<ModalStoreProps> = ({
  visible,
  onOpenShare,
  onOpenReport,
  onClose,
}) => {
  return (
    <Modal transparent animationType="slide" visible={visible}>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          backgroundColor: 'rgba(0,0,0,0.4)',
        }}
      >
        {/* Area gelap bisa tap untuk close */}
        <Pressable style={{ flexGrow: 1 }} onPress={onClose} />

        {/* Konten Modal */}
        <View
          style={{
            backgroundColor: 'white',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 20,
          }}
        >
          {/* Header */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 16,
            }}
          >
            <TouchableOpacity onPress={onClose}>
              <X size={20} color="#1F1F1F" />
            </TouchableOpacity>
            {/* <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: '#1F1F1F',
                marginLeft: 12,
              }}
            ></Text> */}
            <View style={{ flex: 1 }} />
          </View>

          {/* Option Buttons */}
          <TouchableOpacity
            onPress={() => {
              onClose();
              onOpenShare();
            }}
            style={{
              paddingVertical: 14,
              borderBottomWidth: 1,
              borderBottomColor: '#EAEAEA',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <Icon name="share" size={20} color="#555" />

            <Text style={{ fontSize: 14, color: '#1F1F1F' }}>Share shop</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              onClose();
              if (onOpenReport) {
                onOpenReport();
              }
            }}
            style={{
              paddingVertical: 14,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <ReportIcons width={20} height={20} color="#000" />
            <Text style={{ fontSize: 14 }}>Report shop</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalStore;
