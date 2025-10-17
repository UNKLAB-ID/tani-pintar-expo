import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  StatusBar,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import api from '@/utils/api/api';

// icons
import CartIcons from '@/assets/icons/e-commerce/cart-icons';
import BackIcons from '@/assets/icons/global/back-icons';
import Share2Icons from '@/assets/icons/e-commerce/share-detail-icons';
import MenuVerticalIcons from '@/assets/icons/e-commerce/menu-dots-vertikal-icons';
import ButtonPlusPrimaryIcons from '@/assets/icons/e-commerce/button-plus-primary-icons';
import MessageIcons from '@/assets/icons/global/message-icons';

// ui components
import ProductDetailCard from '@/components/ui/e-commerce/detail/card-product-detail';
import AddToCartModal from '@/components/ui/e-commerce/detail/modal-detail';
import ProductSpecifications from '@/components/ui/e-commerce/detail/product-specifications';
import ProductDescription from '@/components/ui/e-commerce/detail/product-description';
import StoreInfo from '@/components/ui/e-commerce/detail/store-info';
import OtherProductCard from '@/components/ui/e-commerce/detail/card-other-product';

// dummy fallback (safeguard)
const fallbackSpecs = {
  brand: 'N/A',
  category: 'Unknown',
  function: '-',
  dimensions: '-',
  weight: '-',
};

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

const otherProducts = [
  {
    id: '1',
    image: require('@/assets/images/trash/image25.png'),
    name: 'H&L Semprotan S...',
    price: 'Rp36.000',
    discount: '20%',
  },
  {
    id: '2',
    image: require('@/assets/images/trash/bottle.png'),
    name: 'Electric Sprayer...',
    price: 'Rp250.000',
    discount: '17%',
  },
  {
    id: '3',
    image: require('@/assets/images/trash/Banner-Promotion.png'),
    name: 'Sprayer Elektrik...',
    price: 'Rp480.000',
    discount: '15%',
  },
];

const ProductDetailScreen = () => {
  const { uuid } = useLocalSearchParams<{ uuid: string }>();
  const flatListRef = useRef<FlatList>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState('');
  const [quantity, setQuantity] = useState(1);

  // ✅ fetcher function
  const fetchDetailProduct = async (uuid: string) => {
    const response = await api.get(`/ecommerce/products/${uuid}`);
    return response.data;
  };

  const {
    data: detailProduct,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['detailProduct', uuid],
    queryFn: () => fetchDetailProduct(uuid),
    enabled: !!uuid,
    refetchOnWindowFocus: false,
  });

  const mappedProduct = detailProduct
    ? {
        id: detailProduct.uuid,
        name: detailProduct.name || 'Unnamed Product',
        price: Number(detailProduct.prices?.[0]?.price) || 0,
        discount: Number(detailProduct.discount) || 0,
        originalPrice: Number(detailProduct.original_price) || 0,
        sold: detailProduct.sold || 0,
        rating: detailProduct.rating || 0,
        totalReview: detailProduct.total_review || 0,
        photoReview: detailProduct.photo_review || 0,
        variants: detailProduct.variants || [],
        specifications: {
          brand: detailProduct.user?.username || 'Unknown Seller',
          category: detailProduct.category?.name || 'Uncategorized',
          weight: `${detailProduct.weight || '-'} ${detailProduct.weight_unit || ''}`,
          dimensions: `${detailProduct.length || '0'} x ${detailProduct.width || '0'} x ${detailProduct.height || '0'}`,
          function: '-',
        },
        description: detailProduct.description || 'No description available.',
        store: detailProduct.store || storeList[0],
        images:
          detailProduct.images?.map((img: any, idx: number) => ({
            id: img.id || idx,
            image: { uri: img.image },
          })) || [],
      }
    : null;

  // ✅ handle default variant after data fetched
  // useEffect(() => {
  //   if (mappedProduct?.variants?.length > 0) {
  //     setSelectedVariant(mappedProduct.variants[0]?.name || '');
  //   }
  // }, [mappedProduct]);

  // handle scroll for image slider
  const onScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const layoutWidth = e.nativeEvent.layoutMeasurement.width;
    const index = Math.round(offsetX / layoutWidth);
    setActiveIndex(index);
  };

  const handleCheckout = () => {
    router.push('/e-commerce/checkout');
  };
  console.log('🟢 mappedProduct:', mappedProduct);
  useEffect(() => {
    console.log('🔎 detailProduct dari API:', detailProduct);
  }, [detailProduct]);

  if (isLoading) {
    return <Text className="text-center mt-10">Loading...</Text>;
  }

  if (error) {
    return (
      <Text className="text-center mt-10 text-red-500">
        Error loading product details.
      </Text>
    );
  }

  if (!mappedProduct) {
    return <Text className="text-center mt-10">Produk tidak ditemukan</Text>;
  }

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#ffffff"
        translucent={false}
      />
      <SafeAreaView
        style={{ flex: 1, backgroundColor: '#f8f8f8' }}
        edges={['top', 'bottom', 'left', 'right']}
      >
        {/* Header */}
        <View className="flex-row bg-white items-center justify-between px-3 pb-5 pt-4">
          <TouchableOpacity className="ml-4" onPress={() => router.back()}>
            <BackIcons width={20} height={20} color="#7D7D7D" />
          </TouchableOpacity>

          <View className="flex-row items-center">
            <TouchableOpacity onPress={() => router.push('/e-commerce/cart')}>
              <CartIcons width={26} height={26} color="#7D7D7D" />
            </TouchableOpacity>
            <TouchableOpacity className="ml-4">
              <Share2Icons width={24} height={24} color="#7D7D7D" />
            </TouchableOpacity>
            <TouchableOpacity className="ml-4">
              <MenuVerticalIcons width={26} height={26} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <ProductDetailCard
            product={mappedProduct}
            activeIndex={activeIndex}
            flatListRef={flatListRef}
            onScrollEnd={onScrollEnd}
          />

          {/* Product Specification */}
          <View className="mt-4 px-4 bg-white pb-6">
            <Text className="text-[16px] font-semibold mb-3 text-black">
              Product Specifications
            </Text>
            <ProductSpecifications data={mappedProduct.specifications} />
          </View>

          {/* Product Description */}
          <View className="bg-white mt-4">
            <View className="px-4 py-3 flex-row">
              <Text className="font-semibold text-[16px]">Product Details</Text>
            </View>
            <ProductDescription description={mappedProduct.description} />
          </View>

          {/* Store Info */}
          <View className="bg-white h-[148px] w-full px-4 pt-4 pb-4 mt-4">
            <StoreInfo
              toko={mappedProduct.store}
              onPress={() => router.push('/e-commerce/store')}
            />

            <View className="mt-4 flex-row justify-around">
              <TouchableOpacity className="border border-[#169953] w-[173px] h-[40px] rounded-xl px-6 py-2 flex-1 mr-2 items-center">
                <Text className="text-[#169953] text-[16px] font-semibold">
                  + Follow
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="border border-[#169953] px-6 py-2 rounded-xl flex-1 ml-2 items-center">
                <Text className="text-[#169953] text-[16px] font-semibold">
                  Chat seller
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Other Products */}
          <View className="bg-white px-4 py-3 mt-4">
            <View className="flex-row justify-between items-center mb-3">
              <Text className="font-semibold text-[16px]">
                Other products in this shop
              </Text>
              <TouchableOpacity>
                <Text className="text-[#169953] text-[14px] font-semibold">
                  See All
                </Text>
              </TouchableOpacity>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {otherProducts.map(item => (
                <OtherProductCard
                  key={item.id}
                  image={item.image}
                  name={item.name}
                  price={item.price}
                  discount={item.discount}
                />
              ))}
            </ScrollView>
          </View>
        </ScrollView>

        {/* Bottom Bar */}
        <View className="border-t border-gray-200 bg-white px-4 py-3">
          <View className="mt-4 flex-row space-x-3">
            <TouchableOpacity className="border border-[#169953] w-[40px] h-[40px] mr-2 ml-3 rounded-2xl justify-center items-center">
              <MessageIcons width={18} height={18} color={'#169953'} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              className="flex-1 h-[40px] border border-[#169953] rounded-2xl flex-row justify-center items-center py-2"
            >
              <View className="flex-row items-center">
                <View className="mt-1 mr-1">
                  <ButtonPlusPrimaryIcons width={20} height={20} />
                </View>
                <Text className="text-[#169953] font-semibold text-[16px]">
                  Add to Cart
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleCheckout}
              className="flex-1 bg-[#169953] h-[40px] mr-2 ml-3 rounded-2xl flex-row justify-center items-center py-2"
            >
              <Text className="text-white font-semibold text-[14px]">
                Checkout
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Modal Add to Cart */}
        <AddToCartModal
          visible={isModalVisible}
          onClose={() => setModalVisible(false)}
          image={mappedProduct.images[0]?.image}
          name={mappedProduct.name}
          price={`Rp${mappedProduct.price.toLocaleString('id-ID')}`}
          variants={mappedProduct.variants}
          selectedVariant={selectedVariant}
          setSelectedVariant={setSelectedVariant}
          quantity={quantity}
          setQuantity={setQuantity}
          productUuid={mappedProduct.id}
        />
      </SafeAreaView>
    </>
  );
};

export default ProductDetailScreen;
