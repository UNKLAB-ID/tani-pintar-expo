import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import RectangleIcon from '@/assets/icons/global/rectangle-icon';
import StarIcons from '@/assets/icons/e-commerce/stars-icons';

interface ModaFilterStoreProps {
  visible: boolean;
  onReset: () => void;
  onClose: () => void;
  onApply: (filters: any) => void;
}

const ModaFilterStore: React.FC<ModaFilterStoreProps> = ({
  visible,
  onClose,
  onReset,
  onApply,
}) => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [condition, setCondition] = useState<'New' | 'Second' | null>(null);
  const [rating, setRating] = useState<number | null>(null);

  const isActive = minPrice || maxPrice || condition || rating;

  const handleReset = () => {
    setMinPrice('');
    setMaxPrice('');
    setCondition(null);
    setRating(null);
    onReset();
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
        <Pressable style={{ flexGrow: 1 }} onPress={onClose} />

        <View
          style={{
            backgroundColor: '#fff',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 20,
          }}
        >
          <View style={{ alignItems: 'center', marginBottom: 8 }}>
            <RectangleIcon width={86} height={4} />
          </View>

          {/* Header */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 16,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#1F1F1F' }}>
              Filter
            </Text>
            <TouchableOpacity onPress={handleReset}>
              <Text style={{ color: '#FF2727', fontWeight: '600' }}>Reset</Text>
            </TouchableOpacity>
          </View>

          {/* Price */}
          <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 8 }}>
            Price
          </Text>
          <View style={{ flexDirection: 'row', marginBottom: 8 }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1,
                borderRadius: 12,
                paddingVertical: 12,
                paddingHorizontal: 16,

                borderColor: minPrice ? '#16A34A' : '#D1D1D1',
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: '#1F1F1F',
                  marginRight: 4,
                  fontWeight: 400,
                }}
              >
                Rp
              </Text>
              <TextInput
                style={{
                  flex: 1,
                  fontSize: 14,
                  color: '#1F1F1F',
                  padding: 0, // hilangkan padding default
                }}
                keyboardType="numeric"
                placeholder="Minimum"
                value={minPrice}
                onChangeText={setMinPrice}
              />
            </View>

            <View
              style={{
                width: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text
                style={{ color: '#A1A1A1', fontSize: 18, fontWeight: '500' }}
              >
                –
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1,
                borderRadius: 12,
                paddingVertical: 12,
                paddingHorizontal: 16,

                borderColor: maxPrice ? '#16A34A' : '#D1D1D1',
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: '#1F1F1F',
                  marginRight: 4,
                  fontWeight: 400,
                }}
              >
                Rp
              </Text>
              <TextInput
                style={{
                  flex: 1,
                  fontSize: 14,
                  color: '#1F1F1F',
                }}
                keyboardType="numeric"
                placeholder="Maximum"
                value={maxPrice}
                onChangeText={setMaxPrice}
              />
            </View>
          </View>

          {/* Condition */}
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
              marginTop: 20,
              marginBottom: 8,
            }}
          >
            Condition of Goods
          </Text>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            {['New', 'Second'].map(item => (
              <TouchableOpacity
                key={item}
                onPress={() =>
                  setCondition(
                    condition === item ? null : (item as 'New' | 'Second')
                  )
                }
                style={{
                  borderWidth: 1,
                  borderColor: condition === item ? '#16A34A' : '#D1D1D1',
                  borderRadius: 12,
                  paddingVertical: 8,
                  paddingHorizontal: 18,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    color: condition === item ? '#16A34A' : '#1F1F1F',
                  }}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Rating */}
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
              marginTop: 20,
              marginBottom: 8,
            }}
          >
            Rating
          </Text>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: 10,
              marginTop: 8,
            }}
          >
            {[1, 2, 3, 4, 5].map(r => (
              <TouchableOpacity
                key={r}
                onPress={() => setRating(rating === r ? null : r)}
                style={{
                  borderWidth: 1,
                  borderColor: rating === r ? '#16A34A' : '#D1D1D1',
                  borderRadius: 12,
                  paddingVertical: 8,
                  paddingHorizontal: 16,
                  flexDirection: 'row',
                }}
              >
                <StarIcons width={24} height={24} />
                <Text
                  style={{
                    fontSize: 14,
                    color: rating === r ? '#16A34A' : '#1F1F1F',
                  }}
                >
                  Rating {r}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {/* Show Product Button */}
        <View
          style={{
            backgroundColor: '#fff',
            justifyContent: 'center',
            padding: 12,
            elevation: 10, // android shadow
            shadowColor: '#000', // iOS shadow
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.25,
            shadowRadius: 6,
          }}
        >
          <TouchableOpacity
            onPress={() =>
              onApply({
                minPrice: minPrice ? Number(minPrice) : null,
                maxPrice: maxPrice ? Number(maxPrice) : null,
                rating,
              })
            }
            style={{
              borderRadius: 12,
              paddingVertical: 14,
              alignItems: 'center',
              backgroundColor: isActive ? '#16A34A' : '#D9D9D9',
            }}
            disabled={!isActive}
          >
            <Text
              style={{
                color: '#fff',
                fontWeight: '600',
                fontSize: 16,
              }}
            >
              Show Product
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModaFilterStore;
