import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, Pressable } from 'react-native';
import { X, Check } from 'lucide-react-native';

interface ModalSelectSolutionProps {
  visible: boolean;
  onClose: () => void;
  onCancel?: () => void;
  onConfirm?: (reason: string) => void;
}

const dummyCancellationReasons = [
  {
    id: '1',
    reason: 'Return and Refund',
    description:
      'The buyer will receive a refund after the problematic item is received by the seller or related party..',
    isSelected: false,
  },
  {
    id: '2',
    reason: 'Exchange of Goods',
    description:
      'Replacement items will be sent to the buyer after the return process is complete.',
    isSelected: false,
  },
];

const ModalSelectSolution = ({
  visible,
  onClose,
  onConfirm,
}: ModalSelectSolutionProps) => {
  const [selectedSolution, setSelectedSolution] = useState<string | null>(null);

  const handleConfirm = () => {
    if (selectedSolution && onConfirm) {
      onConfirm(selectedSolution); // kirim ke parent
      setSelectedSolution(null); // reset state internal
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
              Select Solution
            </Text>
            <TouchableOpacity onPress={onClose}>
              <X size={20} color="#1F1F1F" />
            </TouchableOpacity>
          </View>

          {/* List alasan */}
          {dummyCancellationReasons.map(item => (
            <TouchableOpacity
              key={item.id}
              className="px-5 py-3 flex-row items-center border border-[#DEDEDE] my-2 mx-4 rounded-xl"
              style={{
                backgroundColor:
                  selectedSolution === item.reason ? '#ECFDF3' : 'white',
                borderColor:
                  selectedSolution === item.reason ? '#16a34a' : '#DEDEDE',
              }}
              onPress={() => setSelectedSolution(item.reason)}
            >
              {/* Radio button */}
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor:
                    selectedSolution === item.reason ? '#16a34a' : '#9ca3af',
                  backgroundColor:
                    selectedSolution === item.reason ? '#16a34a' : 'white',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 12,
                }}
              >
                {selectedSolution === item.reason && (
                  <View>
                    <Check size={14} color="white" />
                  </View>
                )}
              </View>
              {/* Teks selalu fleksibel */}
              <View className="flex-1">
                <Text
                  style={{
                    fontSize: 14,
                    color: '#1F1F1F',

                    flexShrink: 1,
                  }}
                >
                  {item.reason}
                </Text>
                <Text style={{ fontSize: 12, color: '#8D8D8D' }}>
                  {item.description}
                </Text>
              </View>
            </TouchableOpacity>
          ))}

          {/* Confirm button */}
          <View className="px-5 pt-4 w-full">
            <TouchableOpacity
              onPress={handleConfirm}
              disabled={!selectedSolution}
              style={{
                opacity: selectedSolution ? 1 : 0.5,
                backgroundColor: selectedSolution ? '#16a34a' : '#e5e5e5',
                borderRadius: 12,
                paddingVertical: 14,
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  color: selectedSolution ? 'white' : '#9ca3af',
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

export default ModalSelectSolution;
