import { View, Text, Modal, TouchableOpacity, Pressable } from 'react-native';
import { X } from 'lucide-react-native';

interface ModalCashbackProps {
  visible: boolean;
  onClose: () => void;
}
const ModalCashback: React.FC<ModalCashbackProps> = ({ visible, onClose }) => {
  return (
    <Modal transparent animationType="slide" visible={visible}>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          backgroundColor: 'rgba(0,0,0,0.4)',
        }}
      >
        <Pressable style={{ flexGrow: 1 }} onPress={onClose} />

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
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: '#1F1F1F',
                marginLeft: 12,
              }}
            >
              CashBack
            </Text>
          </View>
          <Text className="text-[14px] font-medium text-[#6F6F6F]">
            This cashback balance can only be used to pay and cannot be
            withdrawn.
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default ModalCashback;
