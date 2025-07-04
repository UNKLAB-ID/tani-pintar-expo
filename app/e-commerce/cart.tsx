import BackIcons from '@/assets/icons/global/back-icons';
import LoveIcons from '@/assets/icons/global/love-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { formatPrice } from '@/utils/format-currency/currency';

import TrashIcons from '@/assets/icons/e-commerce/trash-icons';
import BoxPlusCartIcons from '@/assets/icons/e-commerce/plus-box-icons';
import BoxMinusCartIcons from '@/assets/icons/e-commerce/minus-box-icons';
import RecomendationCard from '@/components/ui/e-commerce/card-recomendation';
import ModalDelete from '@/components/ui/e-commerce/cart/modal-delete';
import ModalCheckout from '@/components/ui/e-commerce/cart/modal-checkout';

interface CartItem {
  id: string;
  image: any;
  name: string;
  price: string;
  discount: string;
  stock: number;
  variants?: { size: string }[];
}

interface ItemQuantities {
  [key: string]: number;
}

type GetDiscountedPrice = (priceString: string, discount: string) => number;

const getDiscountedPrice: GetDiscountedPrice = (priceString, discount) => {
  const priceNumber = parseInt(priceString.replace(/[^\d]/g, ''), 10);
  const discountAmount = (priceNumber * parseInt(discount, 10)) / 100;
  return Math.round(priceNumber - discountAmount);
};

export const otherProducts: CartItem[] = [
  {
    id: '1',
    image: require('@/assets/images/trash/image25.png'),
    name: 'H&L Semprotan S...',
    price: 'Rp36.000',
    discount: '20',
    stock: 100,
    variants: [{ size: '50 ml' }],
  },
  {
    id: '2',
    image: require('@/assets/images/trash/image18.png'),
    name: 'Electric Sprayer...',
    price: 'Rp250.000',
    discount: '17',
    stock: 100,
    variants: [{ size: '100 ml' }],
  },
];

const storeList = [
  {
    id: 1,
    name: 'H&L Official',
    location: 'Kota Tangerang',
    rating: 4.6,
    totalReview: 500,
    image: require('@/assets/images/trash/bottle.png'),
  },
];

const CartScreen = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [itemQuantities, setItemQuantities] = useState<ItemQuantities>(
    otherProducts.reduce((acc, product) => {
      acc[product.id] = 1;
      return acc;
    }, {} as ItemQuantities)
  );

  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [cartData, setCartData] = useState(otherProducts);
  const [isCheckoutVisible, setCheckoutVisible] = useState(false);

  const handleBack = () => router.push('/(tabs)/ecommerce');

  const toggleSelect = (id: string) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    if (selectedItems.length > 0) {
      setCheckoutVisible(true);
    } else {
      setCheckoutVisible(false);
    }
  }, [selectedItems]);

  const calculateSubtotal = () => {
    return selectedItems.reduce((total, itemId) => {
      const item = cartData.find(i => i.id === itemId);
      if (!item) return total;

      const quantity = itemQuantities[item.id] || 1;
      const discountedPrice = getDiscountedPrice(item.price, item.discount);

      return total + discountedPrice * quantity;
    }, 0);
  };

  const increaseQuantity = (itemId: string) => {
    const item = cartData.find(i => i.id === itemId);
    const currentQty = itemQuantities[itemId] || 0;
    const maxQty = item?.stock ?? 99;
    if (currentQty >= maxQty) return;

    setItemQuantities(prev => ({
      ...prev,
      [itemId]: currentQty + 1,
    }));
  };

  const decreaseQuantity = (itemId: string) => {
    setItemQuantities(prev => ({
      ...prev,
      [itemId]: Math.max((prev[itemId] || 0) - 1, 0),
    }));
  };

  const renderItem = ({ item }: { item: CartItem }) => {
    const isSelected = selectedItems.includes(item.id);

    interface ItemQuantities {
      [key: string]: number;
    }

    const decreaseQuantity = (itemId: string) => {
      setItemQuantities((prev: ItemQuantities) => ({
        ...prev,
        [itemId]: Math.max((prev[itemId] || 0) - 1, 0),
      }));
    };

    return (
      <View className="bg-white p-3 ">
        {/* Toko */}
        <View className="flex-row items-center mb-2 mt-2">
          <TouchableOpacity onPress={() => toggleSelect(item.id)}>
            <View
              style={{ width: 24, height: 24 }}
              className={` rounded border-2 mr-2 ${
                isSelected ? 'bg-primary border-primary' : 'border-gray-400'
              } items-center justify-center`}
            >
              {isSelected && (
                <Text className="text-white text-xs font-bold">✓</Text>
              )}
            </View>
          </TouchableOpacity>
          <Image
            source={storeList[0]?.image}
            className="w-6 h-6 rounded-full"
            resizeMode="contain"
          />
          <Text className="text-[16px] font-semibold text-black">
            {storeList[0]?.name ?? 'Unknown Store'}
          </Text>
        </View>
        {/* Konten Produk */}
        <View className="flex-row items-start">
          {/* Gambar Produk */}
          <Image
            source={item.image}
            className="w-[143px] h-[139px] rounded-xl"
            resizeMode="contain"
          />

          {/* Info Produk */}
          <View className="ml-3 flex-1 justify-between mt-3">
            <View className="flex-row justify-between items-start">
              <Text
                className="text-base font-semibold flex-1"
                numberOfLines={1}
              >
                {item.name}
              </Text>
              <View className="flex-row space-x-3">
                <TouchableOpacity style={{ marginLeft: 10 }}>
                  <LoveIcons width={20} height={20} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ marginLeft: 20 }}
                  onPress={() => {
                    setItemToDelete(item.id); // <-- tangkap item yang akan dihapus
                    setDeleteModalVisible(true); // munculkan modal
                  }}
                >
                  <TrashIcons width={20} height={20} color="#C8C8C8" />
                </TouchableOpacity>
              </View>
            </View>
            <Text className="text-xs text-[#bcbcbc] mt-1">
              {item.variants?.[0]?.size || 'No size available'}
            </Text>

            {/* Harga */}
            <View
              className="flex-row items-center justify-between"
              style={{ marginTop: 30 }}
            >
              <Text className="text-base font-bold text-black mr-2">
                {formatPrice(getDiscountedPrice(item.price, item.discount))}
              </Text>
              <View className="flex-row items-center ">
                <TouchableOpacity
                  className="items-center"
                  onPress={() => decreaseQuantity(item.id)}
                >
                  <BoxMinusCartIcons width={30} height={30} />
                </TouchableOpacity>
                <Text className="mx-3">{itemQuantities[item.id] || 1}</Text>
                <TouchableOpacity
                  className="items-center"
                  onPress={() => increaseQuantity(item.id)}
                >
                  <BoxPlusCartIcons width={30} height={30} />
                </TouchableOpacity>
              </View>
            </View>
            <Text className="text-xs line-through text-[#bcbcbc] mt-1">
              {item.price}
            </Text>
          </View>
        </View>
        <View
          className="mt-6"
          style={{
            borderBottomWidth: 1,
            borderColor: '#C8C8C8',
            marginHorizontal: 12,
            marginBottom: 12,
          }}
        />
        <ModalDelete
          isVisible={isDeleteModalVisible}
          onClose={() => {
            setDeleteModalVisible(false);
            setItemToDelete(null);
          }}
          onConfirm={() => {
            if (itemToDelete) {
              setCartData(prev =>
                prev.filter(item => item.id !== itemToDelete)
              );
              setSelectedItems(prev => prev.filter(id => id !== itemToDelete));
            } else {
              setCartData(prev =>
                prev.filter(item => !selectedItems.includes(item.id))
              );
              setSelectedItems([]);
            }
            setItemToDelete(null);
            setDeleteModalVisible(false);
          }}
          selectedCount={itemToDelete ? 1 : selectedItems.length}
        />
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8F8F8]">
      <View className="flex-row justify-between bg-white items-center p-4 ">
        <TouchableOpacity onPress={handleBack}>
          <BackIcons width={24} height={24} />
        </TouchableOpacity>
        <Text className="text-xl font-semibold">Cart</Text>
        <TouchableOpacity>
          <LoveIcons width={24} height={24} />
        </TouchableOpacity>
      </View>

      {/* Cart items will be displayed here */}
      {cartData.length === 0 ? (
        <View className="flex-1 bg-[#f8f8f8]  mt-4 items-center">
          <Image
            source={require('@/assets/images/Empty-Cart.png')}
            className="w-[250px] h-[250px] mt-10"
            resizeMode="contain"
          />
          <Text className="text-[16px] font-semibold">
            Oops, your cart is still empty!
          </Text>
          <Text className="text-[14px] text-gray-500 text-center mt-2 px-6">
            Come on, hurry up and find your favorite {'\n'} products before they
            run out!
          </Text>
          <View className="mt-6 w-full">
            <RecomendationCard />
          </View>
        </View>
      ) : (
        <FlatList
          data={cartData}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingVertical: 16 }}
          ListHeaderComponent={
            selectedItems.length > 0 ? (
              <View
                className="flex-row items-center justify-between bg-[#fff] px-4 border-b border-[#E0E0E0]"
                style={{ height: 40 }}
              >
                <Text className="text-[12px] text-[#7d7d7d] font-medium">
                  {selectedItems.length} selected product
                  {selectedItems.length > 1 ? 's' : ''}
                </Text>
                <TouchableOpacity onPress={() => setDeleteModalVisible(true)}>
                  <Text className="text-sm text-[#0AAD55] font-semibold">
                    Wipe
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null
          }
          ListFooterComponent={
            <View className="mt-4">
              <RecomendationCard />
            </View>
          }
        />
      )}
      {/* Checkout Button */}
      <ModalCheckout
        isVisible={selectedItems.length > 0}
        onConfirm={() => {
          console.log('Checkout confirmed');
          setSelectedItems([]);
          setCheckoutVisible(false);
        }}
        totalItems={selectedItems.length}
        subtotal={calculateSubtotal()}
      />
    </SafeAreaView>
  );
};
export default CartScreen;
