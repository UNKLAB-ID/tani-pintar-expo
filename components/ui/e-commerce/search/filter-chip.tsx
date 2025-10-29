import React, { useState } from 'react';
import { TouchableOpacity, Text, ViewStyle } from 'react-native';
import { FunnelIcon } from 'lucide-react-native';
import ModalFilter from './modal-filter';

interface FilterChipProps {
  label: string;
  style?: ViewStyle;
}

const FilterChip: React.FC<FilterChipProps> = ({ label, style }) => {
  const [modalVisibleFilter, setModalVisibleFilter] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<any>({});

  const handleApply = (filters: any) => {
    setSelectedFilters(filters);

    const hasActive = Object.values(filters).some(
      val => val !== null && val !== ''
    );
    setIsActive(hasActive);

    setModalVisibleFilter(false);
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setModalVisibleFilter(true)}
        activeOpacity={0.8}
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 16,
            paddingVertical: 8,
            marginRight: 8,
            backgroundColor: isActive ? '#E6F4EA' : '#f4f4f4',
            borderWidth: 1,
            borderColor: isActive ? '#16A34A' : '#E9E9E9',
            borderRadius: 8,
          },
          style,
        ]}
      >
        <FunnelIcon
          width={14}
          height={14}
          color={isActive ? '#16A34A' : '#4B5563'}
          style={{ marginRight: 6 }}
        />
        <Text
          style={{
            fontSize: 13,
            color: isActive ? '#16A34A' : '#4B5563',
            fontWeight: '500',
          }}
        >
          {label}
        </Text>
      </TouchableOpacity>

      <ModalFilter
        visible={modalVisibleFilter}
        onClose={() => setModalVisibleFilter(false)}
        onApply={handleApply}
      />
    </>
  );
};

export default FilterChip;
