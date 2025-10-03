import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, Pressable } from 'react-native';
import { X } from 'lucide-react-native';
import ModalReplaceProblem from './modal-replace-problem';

interface ModalSelectProblemProps {
  visible: boolean;
  onClose: () => void;
  onConfirm?: (problem: string) => void;
}

const dummyCancellationReasons = [
  {
    id: '1',
    problem: 'The goods have not arrived or are lost',
    description: 'The item is delayed, undelivered, or lost in transit',
    isSelected: false,
  },
  {
    id: '2',
    problem: 'Damaged goods',
    description:
      'Package not received due to Received item is cracked, torn, or physically damageddelivery issues',
    isSelected: false,
  },
  {
    id: '3',
    problem: 'Not as described',
    description: 'Received product is different from what was advertised',
    isSelected: false,
  },
  {
    id: '4',
    problem: 'Items suspected to be counterfeit',
    description: 'The product received is indicated as not being genuine',
    isSelected: false,
  },
];

const ModalSelectProblem = ({
  visible,
  onClose,
  onConfirm,
}: ModalSelectProblemProps) => {
  const [selectedProblem, setSelectedProblem] = useState<string | null>(null);
  const [showReplaceModal, setShowReplaceModal] = useState(false);

  const handleConfirm = () => {
    if (selectedProblem) {
      setShowReplaceModal(true); // munculkan modal replace
    }
  };

  const handleReplaceConfirm = () => {
    if (selectedProblem && onConfirm) {
      onConfirm(selectedProblem); // panggil onConfirm dari parent
      setSelectedProblem(null);
      setShowReplaceModal(false);
      onClose();
    }
  };

  return (
    <>
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
                onPress={() => setSelectedProblem(item.problem)}
              >
                <View className="flex-1">
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#1F1F1F',
                      flexShrink: 1,
                    }}
                  >
                    {item.problem}
                  </Text>
                  {selectedProblem === item.problem && (
                    <Text
                      style={{
                        fontSize: 12,
                        color: '#6B7280',
                        marginTop: 4,
                        flexShrink: 1,
                      }}
                    >
                      {item.description}
                    </Text>
                  )}
                </View>

                {/* Radio button */}
                <View
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    borderWidth: 2,
                    borderColor:
                      selectedProblem === item.problem ? '#16a34a' : '#9ca3af',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {selectedProblem === item.problem && (
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
                disabled={!selectedProblem}
                style={{
                  opacity: selectedProblem ? 1 : 0.5,
                  backgroundColor: selectedProblem ? '#16a34a' : '#e5e5e5',
                  borderRadius: 12,
                  paddingVertical: 14,
                }}
              >
                <Text
                  style={{
                    textAlign: 'center',
                    color: selectedProblem ? 'white' : '#9ca3af',
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

      {/* Modal Replace Problem */}
      <ModalReplaceProblem
        visible={showReplaceModal}
        onClose={() => setShowReplaceModal(false)}
        onConfirm={handleReplaceConfirm}
      />
    </>
  );
};

export default ModalSelectProblem;
