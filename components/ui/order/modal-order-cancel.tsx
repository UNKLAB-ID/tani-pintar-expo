import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, Pressable } from 'react-native';
import { X } from 'lucide-react-native';

interface ModalOrderCancelProps {
  visible: boolean;
  onClose: () => void;
  onCancel?: () => void;
  onConfirm?: (reason: string) => void;
}

const dummyCancellationReasons = [
  { id: '1', reason: "I changed my mind / didn't buy it", isSelected: false },
  {
    id: '2',
    reason: 'Find products at lower prices elsewhere',
    isSelected: false,
  },
  { id: '3', reason: 'Estimated delivery time is too long', isSelected: false },
  { id: '4', reason: 'Want to change shipping address', isSelected: false },
  {
    id: '5',
    reason: 'Seller does not respond or takes a long time to process orders',
    isSelected: false,
  },
  {
    id: '6',
    reason: 'Wrong product/variant selection (color, size, etc.)',
    isSelected: false,
  },
  { id: '7', reason: 'Others', isSelected: false },
];

const ModalOrderCancel = ({
  visible,
  onClose,
  onConfirm,
}: ModalOrderCancelProps) => {
  const [selectedReason, setSelectedReason] = useState<string | null>(null);

  const handleConfirm = () => {
    if (selectedReason && onConfirm) {
      onConfirm(selectedReason);
      onClose();
      setSelectedReason(null);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View
        className="justify-end items-center"
        style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' }}
      >
        <Pressable style={{ flexGrow: 1 }} onPress={onClose} />
        <View
          style={{
            backgroundColor: 'white',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingVertical: 16,
            width: '100%',
          }}
        >
          {/* Header */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 16,
              paddingHorizontal: 16,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: '#1F1F1F',
                textAlign: 'center',
                flex: 1,
              }}
            >
              Reason
            </Text>
            <TouchableOpacity onPress={onClose}>
              <X size={20} color="#1F1F1F" />
            </TouchableOpacity>
          </View>

          {/* List alasan */}
          {dummyCancellationReasons.map(item => (
            <TouchableOpacity
              key={item.id}
              className="px-5 py-3 flex-row items-center"
              onPress={() => setSelectedReason(item.reason)}
            >
              {/* Teks selalu fleksibel */}
              <Text
                style={{
                  fontSize: 14,
                  color: '#1F1F1F',
                  flex: 1,
                  flexShrink: 1,
                }}
              >
                {item.reason}
              </Text>

              {/* Radio button */}
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor:
                    selectedReason === item.reason ? '#16a34a' : '#9ca3af',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {selectedReason === item.reason && (
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: '#16a34a',
                    }}
                  />
                )}
              </View>
            </TouchableOpacity>
          ))}

          {/* Confirm button */}
          <View className="px-5 pt-4 w-full">
            <TouchableOpacity
              onPress={handleConfirm}
              disabled={!selectedReason}
              style={{
                opacity: selectedReason ? 1 : 0.5,
                backgroundColor: selectedReason ? '#16a34a' : '#e5e5e5',
                borderRadius: 12,
                paddingVertical: 14,
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  color: selectedReason ? 'white' : '#9ca3af',
                  fontWeight: '600',
                }}
              >
                Confirm
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalOrderCancel;
