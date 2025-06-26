import React from 'react';
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Dimensions,
  Pressable,
} from 'react-native';
import { X } from 'lucide-react-native';

interface Variant {
  size: string;
  stock: number;
}

interface AddToCartModalProps {
  visible: boolean;
  onClose: () => void;
  image: any;
  name: string;
  price: string;
  variants: Variant[];
  selectedVariant: string;
  setSelectedVariant: (variant: string) => void;
  quantity: number;
  setQuantity: (qty: number) => void;
}

const { height } = Dimensions.get('window');

const AddToCartModal: React.FC<AddToCartModalProps> = ({
  visible,
  onClose,
  image,
  name,
  price,
  variants,
  selectedVariant,
  setSelectedVariant,
  quantity,
  setQuantity,
}) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={{ flex: 1 }}>
        {/* Overlay - hanya menutupi area di atas footer */}
        <Pressable
          onPress={onClose}
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            paddingBottom: 70,
          }}
        />

        {/* Modal Content */}
        <View
          style={{
            position: 'absolute',
            bottom: 70,
            left: 0,
            right: 0,
            backgroundColor: '#fff',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,

            paddingTop: 20,
            maxHeight: height * 0.6,
          }}
        >
          {/* Close Button */}
          <TouchableOpacity
            onPress={onClose}
            style={{ position: 'absolute', top: 10, right: 16, zIndex: 10 }}
          >
            <X size={24} color="#000" />
          </TouchableOpacity>

          {/* ScrollView to handle content overflow */}
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Image & Info */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
                paddingHorizontal: 16,
                paddingBottom: 8,
              }}
            >
              <Image
                source={image}
                style={{ width: 80, height: 80, borderRadius: 8 }}
              />
              <View style={{ marginLeft: 12, flex: 1 }}>
                <Text
                  style={{ fontWeight: '600', fontSize: 16, color: '#000' }}
                  numberOfLines={2}
                >
                  {name}
                </Text>
                <Text
                  style={{
                    color: '#169953',
                    fontSize: 18,
                    fontWeight: '700',
                    marginTop: 4,
                  }}
                >
                  {price}
                </Text>
                <Text style={{ fontSize: 13, marginTop: 4, color: '#666' }}>
                  Available:{' '}
                  {variants.find(v => v.size === selectedVariant)?.stock || 0}
                </Text>
              </View>
            </View>

            {/* Size Section */}
            <Text
              style={{
                fontWeight: '600',
                fontSize: 14,
                color: '#000',
                marginTop: 20,
                marginLeft: 16,
              }}
            >
              Size
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ marginTop: 12 }}
            >
              {variants.map((v, i) => {
                const isSelected = selectedVariant === v.size;
                return (
                  <TouchableOpacity
                    key={i}
                    onPress={() => setSelectedVariant(v.size)}
                    style={{
                      width: 108,
                      height: 40,
                      borderWidth: 1,
                      borderColor: isSelected ? '#169953' : '#ccc',
                      backgroundColor: isSelected ? '#E6F5EF' : '#F4F4F4',
                      borderRadius: 12,
                      paddingVertical: 8,
                      paddingHorizontal: 16,
                      marginLeft: 8,
                      marginRight: 8,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <Text
                      style={{
                        color: isSelected ? '#169953' : '#666',
                        fontWeight: '600',
                        marginRight: 8,
                      }}
                    >
                      {v.size}
                    </Text>
                    <Image
                      source={image}
                      style={{ width: 30, height: 30, borderRadius: 6 }}
                    />
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* Quantity */}
            <View
              style={{
                borderTopWidth: 1,
                borderBottomWidth: 1,
                borderColor: '#C8C8C8',
                marginTop: 24,
                paddingTop: 16,
                paddingBottom: 12,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: 4,
                  marginLeft: 16,
                  marginRight: 16,
                }}
              >
                <Text style={{ fontWeight: '600', fontSize: 16 }}>
                  Quantity
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#F4F4F4',
                    borderRadius: 8,
                    paddingHorizontal: 8,
                    height: 36,
                    width: 120,
                    justifyContent: 'space-between',
                  }}
                >
                  <TouchableOpacity
                    onPress={() => quantity > 1 && setQuantity(quantity - 1)}
                    style={{
                      width: 32,
                      height: 32,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 22,
                        fontWeight: 'bold',
                        color: '#999',
                      }}
                    >
                      −
                    </Text>
                  </TouchableOpacity>

                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '600',
                      color: '#000',
                    }}
                  >
                    {quantity}
                  </Text>

                  <TouchableOpacity
                    onPress={() => {
                      const maxStock =
                        variants.find(v => v.size === selectedVariant)?.stock ||
                        1;
                      if (quantity < maxStock) setQuantity(quantity + 1);
                    }}
                    style={{
                      width: 32,
                      height: 32,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 22,
                        fontWeight: 'bold',
                        color: '#169953',
                      }}
                    >
                      +
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>

        {/* Transparent area for footer - tidak ada overlay di sini */}
        <View style={{ height: 70, backgroundColor: 'transparent' }} />
      </View>
    </Modal>
  );
};

export default AddToCartModal;
