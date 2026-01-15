import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { formatPrice } from '@/utils/format-currency/currency';
import { useQuery } from '@tanstack/react-query';
import api from '@/utils/api/api';
//icons
import BackIcons from '@/assets/icons/global/back-icons';
import LoveIcons from '@/assets/icons/global/love-icons';
import TrashIcons from '@/assets/icons/e-commerce/trash-icons';
import BoxPlusCartIcons from '@/assets/icons/e-commerce/plus-box-icons';
import BoxMinusCartIcons from '@/assets/icons/e-commerce/minus-box-icons';
//components
import RecomendationCard from '@/components/ui/e-commerce/card-recomendation';
import ModalDelete from '@/components/ui/e-commerce/cart/modal-delete';
import ModalCheckout from '@/components/ui/e-commerce/cart/modal-checkout';

// API Cart Item interface based on response
interface ApiCartItem {
  id: string;
  user: {
    id: number;
    username: string;
    profile: {
      id: number;
      full_name: string;
      profile_picture_url: string;
    };
  };
  product: {
    uuid: string;
    user: {
      id: number;
      username: string;
      profile: {
        full_name: string;
        profile_picture_url: string;
      };
    };
    name: string;
    image: string;
    available_stock: number;
    prices: {
      id: string;
      unit_of_measure: {
        id: string;
        name: string;
      };
      price: string;
    }[];
  };
  quantity: number;
  created_at: string;
  updated_at: string;
}

interface ItemQuantities {
  [key: string]: number;
}

const CartScreen = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [itemQuantities, setItemQuantities] = useState<ItemQuantities>({});
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [cartData, setCartData] = useState<ApiCartItem[]>([]);

  const handleWhistlist = () => {
    router.push('/e-commerce/wishlist');
  };

  const fetchListCart = async () => {
    const response = await api.get('/ecommerce/cart/');
    return response.data;
  };

  const {
    data: listCart,
    isLoading,
  } = useQuery({
    queryKey: ['listCart'],
    queryFn: fetchListCart,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (listCart?.results) {
      setCartData(listCart.results);
      // Initialize quantities from API data
      const quantities: ItemQuantities = {};
      listCart.results.forEach((item: ApiCartItem) => {
        quantities[item.id] = item.quantity || 1;
      });
      setItemQuantities(quantities);
    }
  }, [listCart]);

  const toggleSelect = (id: string) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  const getItemPrice = (item: ApiCartItem): number => {
    const priceStr = item.product.prices?.[0]?.price || '0';
    return Math.abs(parseFloat(priceStr));
  };

  const calculateSubtotal = () => {
    return selectedItems.reduce((total, itemId) => {
      const item = cartData.find(i => i.id === itemId);
      if (!item) return total;

      const quantity = itemQuantities[item.id] || 1;
      const price = getItemPrice(item);

      return total + price * quantity;
    }, 0);
  };

  const increaseQuantity = (itemId: string) => {
    const item = cartData.find(i => i.id === itemId);
    const currentQty = itemQuantities[itemId] || 1;
    const maxQty = item?.product.available_stock ?? 99;
    if (currentQty >= maxQty) return;

    setItemQuantities(prev => ({
      ...prev,
      [itemId]: currentQty + 1,
    }));
  };

  const decreaseQuantity = (itemId: string) => {
    setItemQuantities(prev => ({
      ...prev,
      [itemId]: Math.max((prev[itemId] || 1) - 1, 1),
    }));
  };

  const renderItem = ({ item }: { item: ApiCartItem }) => {
    const isSelected = selectedItems.includes(item.id);
    const price = getItemPrice(item);
    const unitOfMeasure = item.product.prices?.[0]?.unit_of_measure?.name || '';
    const sellerName = item.product.user?.profile?.full_name || item.product.user?.username || 'Tani Pintar';
    const sellerImage = item.product.user?.profile?.profile_picture_url;

    return (
      <View className="bg-white px-3 ">
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
          {sellerImage ? (
            <Image
              source={{ uri: sellerImage }}
              className="w-6 h-6 rounded-full"
              resizeMode="contain"
            />
          ) : (
            <View className="w-6 h-6 rounded-full bg-gray-300 items-center justify-center">
              <Text className="text-[10px] text-gray-600">
                {sellerName.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}
          <Text className="text-[12px] font-semibold text-black ml-2">
            {sellerName}
          </Text>
        </View>
        {/* Konten Produk */}
        <View className="flex-row items-start">
          {/* Gambar Produk */}
          <Image
            source={
              item.product.image
                ? { uri: item.product.image }
                : require('@/assets/images/trash/image18.png')
            }
            className="w-[100px] h-[94px] rounded-xl"
            resizeMode="contain"
          />

          {/* Info Produk */}
          <View className="ml-3 flex-1 justify-between mt-3">
            <View className="flex-row justify-between items-start">
              <Text
                className="text-[12px] font-semibold flex-1"
                numberOfLines={1}
              >
                {item.product.name}
              </Text>
              <View className="flex-row space-x-3">
                <TouchableOpacity style={{ marginLeft: 10 }}>
                  <LoveIcons width={20} height={20} color={'#C8C8C8'} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ marginLeft: 20 }}
                  onPress={() => {
                    setItemToDelete(item.id);
                    setDeleteModalVisible(true);
                  }}
                >
                  <TrashIcons width={20} height={20} color="#C8C8C8" />
                </TouchableOpacity>
              </View>
            </View>
            <Text className="text-[12px] text-[#bcbcbc] mt-1">
              {unitOfMeasure || 'Per item'}
            </Text>

            {/* Harga */}
            <View
              className="flex-row items-center justify-between"
              style={{ marginTop: 4 }}
            >
              <Text className="text-[12px] font-bold text-black mr-2">
                {formatPrice(price)}
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
            <Text className="text-[12px] text-[#bcbcbc] mt-1">
              Stock: {item.product.available_stock}
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
      </View>
    );
  };

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#ffffff"
        translucent={false}
      />
      <SafeAreaView
        edges={['top', 'right', 'left', 'bottom']}
        className="flex-1 bg-[#F8F8F8]"
      >
        <View className="flex-row justify-between bg-white items-center p-4 ">
          <TouchableOpacity onPress={() => router.replace('/(tabs)/ecommerce')}>
            <BackIcons width={24} height={24} />
          </TouchableOpacity>
          <Text className="text-xl font-semibold">Cart</Text>
          <TouchableOpacity onPress={handleWhistlist}>
            <LoveIcons width={24} height={24} color={'#000000'} />
          </TouchableOpacity>
        </View>

        {/* Loading State */}
        {isLoading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#169953" />
          </View>
        ) : cartData.length === 0 ? (
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
              Come on, hurry up and find your favorite {'\n'} products before
              they run out!
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

        {/* Delete Modal */}
        <ModalDelete
          isVisible={isDeleteModalVisible}
          onClose={() => {
            setDeleteModalVisible(false);
            setItemToDelete(null);
          }}
          onConfirm={() => {
            if (itemToDelete) {
              setCartData(prev => prev.filter(item => item.id !== itemToDelete));
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

        {/* Checkout Button */}
        <ModalCheckout
          isVisible={selectedItems.length > 0}
          onConfirm={() => {
            console.log('Checkout confirmed');
            setSelectedItems([]);
          }}
          totalItems={selectedItems.length}
          subtotal={calculateSubtotal()}
        />
      </SafeAreaView>
    </>
  );
};
export default CartScreen;
