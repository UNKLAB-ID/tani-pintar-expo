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
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { X } from 'lucide-react-native';
import ButtonPlusPrimaryIcons from '@/assets/icons/e-commerce/button-plus-primary-icons';
import MessageIcons from '@/assets/icons/global/message-icons';

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
  const handleAddToCart = () => {
    onClose();
    router.push('/e-commerce/cart');
  };
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={{ flex: 1 }}>
        {/* Overlay */}
        <Pressable
          onPress={onClose}
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
        />

        {/* Modal Content */}
        <View
          className=" absolute "
          style={{
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#fff',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingTop: 20,
            maxHeight: height * 0.85,
          }}
        >
          <Text
            className="ml-5 pb-3"
            style={{ fontSize: 16, fontWeight: '600', color: '#000' }}
          >
            Product Variants
          </Text>
          {/* Close Button */}
          <TouchableOpacity
            onPress={onClose}
            className="absolute "
            style={{ top: 17, right: 16, zIndex: 10 }}
          >
            <X size={24} color="#000" />
          </TouchableOpacity>

          {/* Scrollable Content */}
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Product Info */}
            <View
              className="flex-row items-center"
              style={{
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

            {/* Size Selection */}
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
                    className="flex-row items-center"
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

            {/* Quantity Selection */}
            <View
              className=" mt-6 pt-4 pb-3 bg-white"
              style={{
                borderTopWidth: 1,
                borderColor: '#e7e7e7',
              }}
            >
              <View
                className="flex-row items-center justify-between"
                style={{
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

          {/* Footer Buttons */}
          <View
            className="bg-white px-3 py-3"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: -2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 12,
            }}
          >
            <View className="mt-4 flex-row space-x-3 ">
              <TouchableOpacity className="border border-[#169953] w-[40px] h-[40px] mr-2 ml-3 rounded-2xl flex-row justify-center items-center py-2">
                <View>
                  <MessageIcons width={18} height={18} color={'#169953'} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleAddToCart}
                className="flex-1 w-[146px] h-[40px] border border-[#169953] rounded-2xl flex-row justify-center items-center py-2"
              >
                <View className="flex-row items-center ">
                  <View className="mt-3">
                    <ButtonPlusPrimaryIcons width={24} height={24} />
                  </View>
                  <Text className="text-[#169953] font-semibold text-[14px]">
                    Add to Cart
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity className="flex-1 bg-[#169953] w-[148px] h-[40px] mr-2 ml-3 rounded-2xl flex-row justify-center items-center py-2">
                <Text className="text-white font-semibold text-[14px]">
                  Checkout
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddToCartModal;
