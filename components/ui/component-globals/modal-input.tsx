import React from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  Pressable,
  StyleSheet,
} from 'react-native';
import { X } from 'lucide-react-native';

interface BottomTextInputModalProps {
  visible: boolean;
  title: string;
  value: string;
  placeholder?: string;
  defaultOpenText?: string;
  confirmLabel?: string;
  onChange: (val: string) => void;
  onClose: () => void;
}

const BottomTextInputModal: React.FC<BottomTextInputModalProps> = ({
  visible,
  title,
  value,
  placeholder = 'Type here...',
  defaultOpenText = 'Tap to edit...',
  confirmLabel = 'Confirm',
  onChange,
  onClose,
}) => {
  const [tempNote, setTempNote] = React.useState(value);
  const isDisabled = tempNote.trim().length === 0;

  React.useEffect(() => {
    setTempNote(value);
  }, [visible]);

  const handleSave = () => {
    onChange(tempNote);
    onClose();
  };

  return (
    <Modal transparent animationType="slide" visible={visible}>
      <View style={styles.overlay}>
        <Pressable style={{ flexGrow: 1 }} onPress={onClose} />

        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose}>
              <X size={20} color="#1F1F1F" />
            </TouchableOpacity>
            <Text style={styles.headerText}>{title}</Text>
            <View style={{ width: 20 }} />
          </View>

          {/* Input */}
          <View style={styles.inputWrapper}>
            <TextInput
              value={tempNote}
              onChangeText={setTempNote}
              placeholder={placeholder}
              placeholderTextColor="#C4C4C4"
              multiline
              style={{
                borderWidth: 1,
                borderColor: '#EAEAEA',
                borderRadius: 8,
                padding: 12,
                fontSize: 13,
                color: '#1F1F1F',
                textAlignVertical: 'top',
              }}
            />
            {tempNote.trim().length > 0 && (
              <TouchableOpacity
                onPress={() => {
                  setTempNote('');
                  onChange('');
                }}
                style={styles.clearButton}
              >
                <X size={16} color="#4CAF50" />
              </TouchableOpacity>
            )}
          </View>

          {/* Confirm */}
          <TouchableOpacity
            onPress={handleSave}
            disabled={isDisabled}
            style={[
              styles.confirmButton,
              { backgroundColor: isDisabled ? '#E0E0E0' : '#00A86B' },
            ]}
          >
            <Text
              style={{
                color: isDisabled ? '#A4A4A4' : '#FFFFFF',
                fontWeight: '600',
                fontSize: 14,
                textAlign: 'center',
              }}
            >
              Confirm
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default BottomTextInputModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F1F1F',
    marginLeft: 12,
  },
  inputWrapper: {
    position: 'relative',
    borderWidth: 1,
    borderColor: '#4CAF50',
    borderRadius: 8,
  },
  clearButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    padding: 4,
  },
  confirmButton: {
    marginTop: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },
});
