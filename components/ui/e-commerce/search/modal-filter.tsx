import React, { useState } from 'react';
import {
  Modal,
  View,
  Pressable,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import RectangleIcon from '@/assets/icons/global/rectangle-icon';
import { formatPrice } from '@/utils/format-currency/currency';
import StarIcons from '@/assets/icons/e-commerce/stars-icons';
import { ChevronRight } from 'lucide-react-native';

interface ModalFilterProps {
  visible: boolean;
  onClose?: () => void;
  onApply: (filters: any) => void;
}

const ModalFilter: React.FC<ModalFilterProps> = ({
  visible,
  onClose,
  onApply,
}) => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);

  const [condition, setCondition] = useState<'New' | 'Second' | null>(null);
  const [rating, setRating] = useState<number | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [promo, setPromo] = useState<string | null>(null);
  const [shipping, setShipping] = useState<string | null>(null);

  const isActive =
    !!minPrice ||
    !!maxPrice ||
    !!condition ||
    !!rating ||
    !!location ||
    !!category ||
    !!promo ||
    !!shipping;

  const handleReset = () => {
    setMinPrice('');
    setMaxPrice('');
    setRating(null);
    setCondition(null);
    setLocation(null);
    setCategory(null);
    setPromo(null);
    setShipping(null);
  };

  const priceRanges = [
    { min: 49000, max: 129000 },
    { min: 129000, max: 499000 },
  ];

  const handleMinPriceChange = (val: string) => {
    setMinPrice(val);
    setSelectedPreset(null);
  };
  const handleMaxPriceChange = (val: string) => {
    setMaxPrice(val);
    setSelectedPreset(null);
  };

  const handleConditionSelect = (value: 'New' | 'Second') => {
    if (condition === value) {
      setCondition(null);
    } else {
      setCondition(value);
    }
  };

  const handleRatingSelect = (value: number) => {
    setRating(rating === value ? null : value);
  };

  const handleSelect = (
    value: string,
    currentValue: string | null,
    setter: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    setter(currentValue === value ? null : value);
  };

  return (
    <Modal transparent animationType="slide" visible={visible}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.6)',
        }}
      >
        <Pressable style={{ flexGrow: 1 }} onPress={onClose} />
        <View
          style={{
            backgroundColor: '#fff',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 15,
            maxHeight: '90%',
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

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Price */}
            <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 8 }}>
              Price
            </Text>
            <View style={{ flexDirection: 'row', marginBottom: 8 }}>
              {/* Min */}
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
                    padding: 0,
                  }}
                  keyboardType="numeric"
                  placeholder="Minimum"
                  value={minPrice}
                  onChangeText={handleMinPriceChange}
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

              {/* Max */}
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
                    padding: 0,
                  }}
                  keyboardType="numeric"
                  placeholder="Maximum"
                  value={maxPrice}
                  onChangeText={handleMaxPriceChange}
                />
              </View>
            </View>

            {/* Preset Price */}
            <View style={{ flexDirection: 'row', marginTop: 16 }}>
              {priceRanges.map((range, index) => {
                const isSelected = selectedPreset === index;
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setMinPrice(range.min.toString());
                      setMaxPrice(range.max.toString());
                      setSelectedPreset(index);
                    }}
                    style={{
                      alignItems: 'center',
                      paddingHorizontal: 16,
                      paddingVertical: 8,
                      marginRight: 8,
                      backgroundColor: isSelected ? '#E6F4EA' : '#f4f4f4',
                      borderWidth: 1,
                      borderColor: isSelected ? '#16A34A' : '#fff',
                      borderRadius: 20,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#169953',
                      }}
                    >
                      {formatPrice(range.min)} - {formatPrice(range.max)}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* CONDITION OF GOODS */}
            <View style={{ marginTop: 20 }}>
              <Text
                style={{ fontSize: 14, fontWeight: '600', marginBottom: 8 }}
              >
                Condition of Goods
              </Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {['New', 'Second'].map(item => {
                  const isSelected = condition === item;
                  return (
                    <TouchableOpacity
                      key={item}
                      onPress={() =>
                        handleConditionSelect(item as 'New' | 'Second')
                      }
                      style={{
                        alignItems: 'center',
                        paddingHorizontal: 16,
                        paddingVertical: 8,
                        marginRight: 8,
                        backgroundColor: isSelected ? '#E6F4EA' : '#F5F5F5',
                        borderWidth: 1,
                        borderColor: isSelected ? '#16A34A' : '#fff',
                        borderRadius: 20,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#169953',
                        }}
                      >
                        {item}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* RATING */}
            <View style={{ marginTop: 20 }}>
              <View style={{ flexDirection: 'row' }}>
                <Text
                  style={{ fontSize: 14, fontWeight: '600', marginBottom: 8 }}
                >
                  Rating
                </Text>
                <View style={{ flex: 1 }} />
                <Text style={{ fontSize: 14, color: '#169953' }}>See All</Text>
                <ChevronRight size={16} color="#169953" />
              </View>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {[4, 3].map((val, idx) => {
                  const isSelected = rating === val;
                  return (
                    <TouchableOpacity
                      key={idx}
                      onPress={() => handleRatingSelect(val)}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingHorizontal: 16,
                        paddingVertical: 8,
                        backgroundColor: isSelected ? '#E6F4EA' : '#F5F5F5',
                        borderRadius: 20,
                        borderWidth: isSelected ? 1 : 0,
                        borderColor: isSelected ? '#16A34A' : 'transparent',
                        marginRight: 8,
                      }}
                    >
                      <Text style={{ fontSize: 14, color: '#169953' }}>
                        Rating {val} and above
                      </Text>
                      <View style={{ marginLeft: 4 }}>
                        <StarIcons width={16} height={16} />
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* LOCATION */}
            <View style={{ marginTop: 20 }}>
              <View style={{ flexDirection: 'row' }}>
                <Text
                  style={{ fontSize: 14, fontWeight: '600', marginBottom: 8 }}
                >
                  Location
                </Text>
                <View style={{ flex: 1 }} />
                <Text style={{ fontSize: 14, color: '#169953' }}>See All</Text>
                <ChevronRight size={16} color="#169953" />
              </View>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {['Jakarta', 'Bandung', 'Surabaya', 'Yogyakarta'].map(item => {
                  const isSelected = location === item;
                  return (
                    <TouchableOpacity
                      key={item}
                      onPress={() => handleSelect(item, location, setLocation)}
                      style={{
                        alignItems: 'center',
                        paddingHorizontal: 16,
                        paddingVertical: 8,
                        marginRight: 8,
                        marginBottom: 3,
                        backgroundColor: isSelected ? '#E6F4EA' : '#F5F5F5',
                        borderRadius: 20,
                        borderWidth: isSelected ? 1 : 0,
                        borderColor: isSelected ? '#16A34A' : 'transparent',
                      }}
                    >
                      <Text style={{ color: '#169953' }}>{item}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* CATEGORY */}
            <View style={{ marginTop: 20 }}>
              <View style={{ flexDirection: 'row' }}>
                <Text
                  style={{ fontSize: 14, fontWeight: '600', marginBottom: 8 }}
                >
                  Category
                </Text>
                <View style={{ flex: 1 }} />
                <Text style={{ fontSize: 14, color: '#169953' }}>See All</Text>
                <ChevronRight size={16} color="#169953" />
              </View>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {['Electronics', 'Fashion', 'Beauty', 'Home'].map(item => {
                  const isSelected = category === item;
                  return (
                    <TouchableOpacity
                      key={item}
                      onPress={() => handleSelect(item, category, setCategory)}
                      style={{
                        alignItems: 'center',
                        paddingHorizontal: 16,
                        paddingVertical: 8,
                        marginRight: 8,
                        backgroundColor: isSelected ? '#E6F4EA' : '#F5F5F5',
                        borderRadius: 20,
                        borderWidth: isSelected ? 1 : 0,
                        borderColor: isSelected ? '#16A34A' : 'transparent',
                      }}
                    >
                      <Text style={{ color: '#169953' }}>{item}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* PROMO */}
            <View style={{ marginTop: 20 }}>
              <View style={{ flexDirection: 'row' }}>
                <Text
                  style={{ fontSize: 14, fontWeight: '600', marginBottom: 8 }}
                >
                  Promo
                </Text>
                <View style={{ flex: 1 }} />
                <Text style={{ fontSize: 14, color: '#169953' }}>See All</Text>
                <ChevronRight size={16} color="#169953" />
              </View>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {['Discount', 'Cashback', 'Buy 1 Get 1'].map(item => {
                  const isSelected = promo === item;
                  return (
                    <TouchableOpacity
                      key={item}
                      onPress={() => handleSelect(item, promo, setPromo)}
                      style={{
                        alignItems: 'center',
                        paddingHorizontal: 16,
                        paddingVertical: 8,
                        marginRight: 8,
                        backgroundColor: isSelected ? '#E6F4EA' : '#F5F5F5',
                        borderRadius: 20,
                        borderWidth: isSelected ? 1 : 0,
                        borderColor: isSelected ? '#16A34A' : 'transparent',
                      }}
                    >
                      <Text style={{ color: '#169953' }}>{item}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
            {/* SHIPPING */}
            <View style={{ marginTop: 20, marginBottom: 80 }}>
              <View style={{ flexDirection: 'row' }}>
                <Text
                  style={{ fontSize: 14, fontWeight: '600', marginBottom: 8 }}
                >
                  Shipping
                </Text>
                <View style={{ flex: 1 }} />
                <Text style={{ fontSize: 14, color: '#169953' }}>See All</Text>
                <ChevronRight size={16} color="#169953" />
              </View>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {['Free Shipping', 'Instant', 'Regular'].map(item => {
                  const isSelected = shipping === item;
                  return (
                    <TouchableOpacity
                      key={item}
                      onPress={() => handleSelect(item, shipping, setShipping)}
                      style={{
                        alignItems: 'center',
                        paddingHorizontal: 16,
                        paddingVertical: 8,
                        marginRight: 8,
                        backgroundColor: isSelected ? '#E6F4EA' : '#F5F5F5',
                        borderRadius: 20,
                        borderWidth: isSelected ? 1 : 0,
                        borderColor: isSelected ? '#16A34A' : 'transparent',
                      }}
                    >
                      <Text style={{ color: '#169953' }}>{item}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </ScrollView>
        </View>
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
              Apply
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalFilter;
