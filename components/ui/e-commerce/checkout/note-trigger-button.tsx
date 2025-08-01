import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import NoteIcon from '@/assets/icons/e-commerce/note-icon';
import BottomTextInputModal from '@/components/ui/component-globals/modal-input';

interface NoteTriggerButtonProps {
  value: string;
  onChange: (val: string) => void;
}

const NoteTriggerButton: React.FC<NoteTriggerButtonProps> = ({
  value,
  onChange,
}) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => setModalVisible(!isModalVisible);

  return (
    <>
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
          numberOfLines={1}
          style={{
            flex: 1,
            paddingHorizontal: 12,
            paddingVertical: 8,
            fontSize: 13,
            borderRadius: 8,
            color: value ? '#1F1F1F' : '#B0B0B0',
          }}
        >
          {value || 'Type any messages...'}
        </Text>
      </TouchableOpacity>

      <BottomTextInputModal
        title=" Note"
        placeholder="Type your note here..."
        visible={isModalVisible}
        onClose={toggleModal}
        value={value}
        onChange={onChange}
        confirmLabel="Save"
      />
    </>
  );
};

export default NoteTriggerButton;
