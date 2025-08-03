import { View, Text, Modal, TouchableOpacity, Pressable } from 'react-native';
import { X } from 'lucide-react-native';

interface ModalGenderProps {
  visible: boolean;
  onChange: (val: string) => void;
  onClose: () => void;
}

const ModalGender: React.FC<ModalGenderProps> = ({
  visible,
  onChange,
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
              Gender
            </Text>
            <View style={{ flex: 1 }} />
          </View>

          {/* Option Buttons */}
          <TouchableOpacity
            onPress={() => {
              onChange('Male');
              onClose();
            }}
            style={{ paddingVertical: 12 }}
          >
            <Text style={{ fontSize: 14, color: '#1F1F1F' }}>Male</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              onChange('Female');
              onClose();
            }}
            style={{ paddingVertical: 12 }}
          >
            <Text style={{ fontSize: 14, color: '#1F1F1F' }}>Female</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalGender;
