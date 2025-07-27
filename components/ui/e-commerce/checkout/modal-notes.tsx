import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
} from 'react-native';
import { X } from 'lucide-react-native';
import NoteIcon from '@/assets/icons/e-commerce/note-icon';

interface NoteInputModalProps {
  value: string;
  onChange: (val: string) => void;
}

const NoteInputModal: React.FC<NoteInputModalProps> = ({ value, onChange }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [tempNote, setTempNote] = useState(value);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    setTempNote(value);
  };

  const handleSave = () => {
    onChange(tempNote);
    toggleModal();
  };

  const isDisabled = tempNote.trim().length === 0;

  return (
    <>
      {/* Trigger Button */}
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
        }}
        onPress={toggleModal}
      >
        <NoteIcon width={20} height={20} />
        <Text
          style={{
            fontSize: 14,
            fontWeight: '600',
            color: '#1F1F1F',
            width: 50,
          }}
        >
          Note
        </Text>
        <Text
          style={[
            {
              flex: 1,
              paddingHorizontal: 12,
              paddingVertical: 8,

              fontSize: 13,
              borderRadius: 8,
            },
            { color: value ? '#1F1F1F' : '#B0B0B0' },
          ]}
          numberOfLines={1}
        >
          {value || 'Type any messages...'}
        </Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.overlay}>
          {/* Outside touch area to close modal */}
          <Pressable style={{ flexGrow: 1 }} onPress={toggleModal} />

          {/* Modal content */}
          <View style={styles.modalContainer}>
            {/* Header */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 16,
              }}
            >
              <TouchableOpacity onPress={toggleModal}>
                <X size={20} color="#1F1F1F" />
              </TouchableOpacity>
              <Text
                className="ml-3"
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: '#1F1F1F',
                }}
              >
                Note
              </Text>
              <View style={{ width: 20 }} />
            </View>

            {/* Input */}
            <View style={styles.inputWrapper}>
              <TextInput
                value={tempNote}
                onChangeText={setTempNote}
                placeholder="Please leave a note"
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
                  style={{
                    position: 'absolute',
                    right: 10,
                    top: 10,
                    padding: 4,
                  }}
                >
                  <X size={16} color="#4CAF50" />
                </TouchableOpacity>
              )}
            </View>

            {/* Confirm Button */}
            <TouchableOpacity
              onPress={handleSave}
              disabled={isDisabled}
              style={[
                {
                  marginTop: 20,
                  paddingVertical: 12,
                  borderRadius: 10,
                },
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
    </>
  );
};

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
  inputWrapper: {
    position: 'relative',
    borderWidth: 1,
    borderColor: '#4CAF50',
    borderRadius: 8,
  },
});

export default NoteInputModal;
