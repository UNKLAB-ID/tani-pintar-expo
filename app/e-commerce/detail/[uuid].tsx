import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  FlatList,
  StatusBar,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import api from '@/utils/api/api';
//icons
import CartIcons from '@/assets/icons/e-commerce/cart-icons';
import BackIcons from '@/assets/icons/global/back-icons';
import Share2Icons from '@/assets/icons/e-commerce/share-detail-icons';
import MenuVerticalIcons from '@/assets/icons/e-commerce/menu-dots-vertikal-icons';
import ButtonPlusPrimaryIcons from '@/assets/icons/e-commerce/button-plus-primary-icons';
import MessageIcons from '@/assets/icons/global/message-icons';
//ui
import ProductDetailCard from '@/components/ui/e-commerce/detail/card-product-detail';
import AddToCartModal from '@/components/ui/e-commerce/detail/modal-detail';
import ProductSpecifications from '@/components/ui/e-commerce/detail/product-specifications';
import ProductDescription from '@/components/ui/e-commerce/detail/product-description';
import StoreInfo from '@/components/ui/e-commerce/detail/store-info';
import OtherProductCard from '@/components/ui/e-commerce/detail/card-other-product';

const products = [
  {
    id: 1,
    name: 'INSEKTISIDA GRACIA 103 EC - Perlindungan Optimal',
    price: 765000,
    discount: 15,
    originalPrice: 900000,
    sold: 60,
    rating: 4.8,
    totalReview: 30,
    photoReview: 10,
    images: [
      { id: 1, image: require('@/assets/images/trash/image25.png') },
      { id: 2, image: require('@/assets/images/trash/image18.png') },
      { id: 3, image: require('@/assets/images/trash/Banner-Promotion.png') },
    ],
    variants: [
      { size: '100 ml', stock: 10 },
      { size: '200 ml', stock: 5 },
      { size: '50 ml', stock: 2 },
    ],
    defaultVariant: '100 ml',
  },
];

const ProductSpesifikasi = {
  name: 'Sprayer 2-in-1',
  specifications: {
    brand: 'H&L',
    category: 'Other Garden Supplies',

    function: 'Spray Machine',
    dimensions: '30×30×30',
    weight: '7000',
  },
};

const productDeskripsi = [
  {
    id: 1,
    description: `Kode Barang : SPRAYEL16LT

Deskripsi H&L Alat Semprot Hama - Sprayer 2 in 1 manual elektrik 18 liter Merk H&L
Deskripsi :
*Capacity : 16 Liter
*Battery :12V 8A
*Motor : 3.6 lpm 90psi
*Battery : approx, 4 hours
Kegunaan :
* Cocok untuk penyemprotan segala jenis tanaman, praktis, mudah dalam penggunaan dan perawatan.
* Tangki semprot dengan sistem automatic maupun manual pakai engkol/handle samping, tarikan ringan sehingga tidak mudah capek.
* Kapasitas 18 liter.
* Mudah perawatan, lebih awet, dan bisa dipakai setiap saat.
* Sebelum dipakai bisa dicharge karena menggunakan baterai (Automatic), bisa manual dengan diengkol/handle samping.
* Terbuat dari bahan plastik murni dan tebal. Kualitas tidak perlu diragukan karena produksi pabrikan besar.
Konsultasikan kebutuhan alat teknik anda di SOSMED kami untuk mengetahui produk baru dan promo nya`,
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

export const otherProducts = [
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
  {
    id: '5',
    image: require('@/assets/images/trash/Banner-Promotion.png'),
    name: 'Sprayer Elektrik...',
    price: 'Rp4.180.000',
    discount: '15%',
  },
];

const ProductDetailScreen = () => {
  const [dataProduct, setDataProduct] = useState<any[]>([]);
  const flatListRef = useRef<FlatList>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const product = products[0];
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants[0]?.size || ''
  );
  const [quantity, setQuantity] = useState(1);
  const { uuid } = useLocalSearchParams<{ uuid: string }>();

  const fecthDetailProduct = async (uuid: any) => {
    // console.log('🚀 Fetching product detail dengan uuid:', uuid);
    const response = await api.get(`/ecommerce/products/${uuid}`);
    // console.log('✅ API Response:', response.data);
    return response.data;
  };

  // ...
  const {
    data: detailProduct,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['detailProduct', uuid], // uuid harus di-pass dari route params
    queryFn: () => fecthDetailProduct(uuid),
    enabled: !!uuid, // supaya query jalan hanya kalau ada uuid
    refetchOnWindowFocus: false,
  });

  // mapping data API biar sesuai props ProductDetailCard
  const mappedProduct = detailProduct
    ? {
        id: detailProduct.uuid,
        name: detailProduct.name,
        price: 100000, // sementara hardcode (API belum ada harga)
        discount: 0,
        originalPrice: 0,
        sold: 0,
        rating: 0,
        totalReview: 0,
        photoReview: 0,
        images: detailProduct.images?.map((img: any, idx: number) => ({
          id: img.id || idx,
          image: { uri: img.image }, // penting: pakai { uri }
        })),
      }
    : null;

  if (isLoading) {
    return <Text className="text-center mt-10">Loading...</Text>;
  }

  if (!mappedProduct) {
    return <Text className="text-center mt-10">Produk tidak ditemukan</Text>;
  }

  const onScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const layoutWidth = e.nativeEvent.layoutMeasurement.width;
    const index = Math.round(offsetX / layoutWidth);

    const realIndex =
      index === 0
        ? product.images.length - 1
        : index === product.images.length + 1
          ? 0
          : index - 1;

    setActiveIndex(realIndex);

    // Auto-loop dengan cek aman
    try {
      if (flatListRef.current) {
        if (index === 0) {
          flatListRef.current.scrollToIndex({
            index: product.images.length,
            animated: false,
          });
        } else if (index === product.images.length + 1) {
          flatListRef.current.scrollToIndex({
            index: 1,
            animated: false,
          });
        }
      }
    } catch (err) {
      console.warn('scrollToIndex error:', err);
    }
  };

  const handleCheckout = () => {
    router.push('/e-commerce/checkout');
  };

  // console.log('🟢 mappedProduct:', mappedProduct);
  // useEffect(() => {
  //   console.log('🔎 detailProduct dari API:', detailProduct);
  // }, [detailProduct]);

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
        <View className="flex-row bg-white items-center justify-between  px-3 pb-5 pt-4">
          <TouchableOpacity className="ml-4" onPress={() => router.back()}>
            <BackIcons width={20} height={20} color="#7D7D7D" />
          </TouchableOpacity>

          <View className="flex-row items-center ">
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
        <ScrollView>
          <ProductDetailCard
            product={mappedProduct}
            activeIndex={activeIndex}
            flatListRef={flatListRef}
            onScrollEnd={onScrollEnd}
          />

          {/* Product Specification Section */}
          <View className="mt-4 px-4 bg-white pb-6">
            <Text className="text-[16px] font-semibold mb-3 text-black">
              Product Specifications
            </Text>
            <ProductSpecifications data={ProductSpesifikasi.specifications} />
          </View>

          <View className="bg-white  ">
            <View className=" px-4 py-3 flex-row">
              <Text className="font-semibold text-[16px]">Product Details</Text>
            </View>
            <ProductDescription
              description={productDeskripsi[0]?.description || ''}
            />
          </View>
          <View className="bg-white h-[148px] w-[390px] px-4 pt-4 pb-4 mt-4">
            <StoreInfo
              toko={storeList[0]}
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

        <View className="border-t border-gray-200 bg-white px-4 py-3">
          <View className="mt-4 flex-row space-x-3 ">
            <TouchableOpacity className="border border-[#169953] w-[40px] h-[40px] mr-2 ml-3 rounded-2xl flex-row justify-center items-center py-2">
              <View>
                <MessageIcons width={18} height={18} color={'#169953'} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              className="flex-1 w-[146px] h-[40px] border border-[#169953] rounded-2xl flex-row justify-center items-center py-2"
            >
              <View className="flex-row items-center ">
                <View className="mt-3">
                  <ButtonPlusPrimaryIcons width={24} height={24} />
                </View>
                <Text className="text-[#169953] font-semibold text-[16px]">
                  Add to Cart
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleCheckout}
              className="flex-1 bg-[#169953] w-[148px] h-[40px] mr-2 ml-3 rounded-2xl flex-row justify-center items-center py-2"
            >
              <Text className="text-white font-semibold text-[14px]">
                Checkout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <AddToCartModal
          visible={isModalVisible}
          onClose={() => setModalVisible(false)}
          image={product.images[0].image}
          name={product.name}
          price={`Rp${product.price.toLocaleString()}`}
          variants={product.variants}
          selectedVariant={selectedVariant}
          setSelectedVariant={setSelectedVariant}
          quantity={quantity}
          setQuantity={setQuantity}
        />
      </SafeAreaView>
    </>
  );
};

export default ProductDetailScreen;
