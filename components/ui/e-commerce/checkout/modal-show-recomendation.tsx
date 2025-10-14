import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, Pressable } from 'react-native';
import RectangleIcon from '@/assets/icons/global/rectangle-icon';
import { X, Check } from 'lucide-react-native';

interface ModalShowRecomendationProps {
  visible: boolean;
  onClose: () => void;
  onSelectSort: (id: string) => void;
  selectedOption: string;
}

type SortOption = {
  id: string;
  label: string;
};

const sortOptions: SortOption[] = [
  { id: 'latest', label: 'Latest' },
  { id: 'popular', label: 'Most Popular' },
  { id: 'highest_price', label: 'Highest Price' },
  { id: 'lowest_price', label: 'Lowest Price' },
  { id: 'most_buyers', label: 'Most Buyers' },
  { id: 'most_reviews', label: 'Most Reviews' },
];

const ModalShowRecomendation: React.FC<ModalShowRecomendationProps> = ({
  visible,
  onClose,
  onSelectSort,
  selectedOption,
}) => {
  const [localSelected, setLocalSelected] = useState(selectedOption);

  // Sync perubahan dari parent
  useEffect(() => {
    setLocalSelected(selectedOption);
  }, [selectedOption]);

  const handleSelect = (id: string) => {
    setLocalSelected(id);
    onSelectSort(id);
  };

  const handleReset = () => {
    setLocalSelected('latest');
    onSelectSort('latest');
  };

  return (
    <Modal transparent animationType="slide" visible={visible}>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          backgroundColor: 'rgba(0,0,0,0.4)',
        }}
      >
        {/* Klik area luar untuk menutup */}
        <Pressable style={{ flexGrow: 1 }} onPress={onClose} />

        {/* Kontainer utama modal */}
        <View
          style={{
            backgroundColor: '#fff',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 20,
          }}
        >
          {/* Garis abu di atas */}
          <View style={{ alignItems: 'center', marginBottom: 8 }}>
            <RectangleIcon width={86} height={4} />
          </View>

          {/* Header */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 16,
            }}
          >
            <TouchableOpacity onPress={onClose}>
              <X size={22} color="#1F1F1F" />
            </TouchableOpacity>

            <Text
              style={{
                fontSize: 17,
                fontWeight: '600',
                color: '#1F1F1F',
                marginLeft: 12,
              }}
            >
              Urutkan
            </Text>
            <View style={{ flex: 1 }} />

            <TouchableOpacity onPress={handleReset}>
              <Text style={{ color: '#FF2727', fontWeight: '600' }}>Reset</Text>
            </TouchableOpacity>
          </View>

          {/* Daftar Opsi */}
          <View>
            {sortOptions.map(option => {
              const isSelected = localSelected === option.id;
              return (
                <TouchableOpacity
                  key={option.id}
                  onPress={() => handleSelect(option.id)}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingVertical: 14,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: isSelected ? '#1F1F1F' : '#555',
                    }}
                  >
                    {option.label}
                  </Text>

                  {/* Kotak checkbox */}
                  <View
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 6,
                      borderWidth: 1.5,
                      borderColor: isSelected ? '#00B14F' : '#aaa',
                      backgroundColor: isSelected ? '#00B14F' : '#fff',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {isSelected && (
                      <Check size={14} color="#fff" strokeWidth={3} />
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalShowRecomendation;
