import React, { useRef, useState } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  FlatList,
} from 'react-native';

import CartIcons from '@/assets/icons/e-commerce/cart-icons';
import BackIcons from '@/assets/icons/global/back-icons';
import Share2Icons from '@/assets/icons/e-commerce/share-detail-icons';
import MenuVerticalIcons from '@/assets/icons/e-commerce/menu-dots-vertikal-icons';
import ProductDetailCard from '@/components/ui/e-commerce/detail/card-product-detail';
import { router } from 'expo-router';
import ProductSpecifications from '@/components/ui/e-commerce/detail/product-specifications';
import ProductDescription from '@/components/ui/e-commerce/detail/product-description';
import StoreInfo from '@/components/ui/e-commerce/detail/store-info';
import OtherProductCard from '@/components/ui/e-commerce/detail/card-other-product';
import ButtonPlusPrimaryIcons from '@/assets/icons/e-commerce/button-plus-primary-icons';
import MessageIcons from '@/assets/icons/global/message-icons';

const { width } = Dimensions.get('window');
const imageProduct = [
  { id: 1, image: require('@/assets/images/trash/image25.png') },
  { id: 2, image: require('@/assets/images/trash/bottle.png') },
  { id: 3, image: require('@/assets/images/trash/Banner-Promotion.png') },
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

const productDeskripsi = {
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
};

const product = {
  name: 'Alat Penyemprot Hama H&L – Alat penyemprot listrik manual 2 in 1 berkapasitas 16 liter',
  price: 765000,
  discount: 15,
  originalPrice: 900000,
  sold: 60,
  rating: 4.8,
  totalReview: 30,
  photoReview: 10,
};

const toko = {
  name: 'H&L Official',
  location: 'Kota Tangerang',
  rating: 4.6,
  totalReview: 500,
  image: require('@/assets/images/trash/bottle.png'),
};

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

export default function ProductDetailScreen() {
  const flatListRef = useRef<FlatList>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(1);

  const productImagesWithBuffer = [
    { ...imageProduct[imageProduct.length - 1], id: 999 },
    ...imageProduct,
    { ...imageProduct[0], id: 1000 },
  ];

  const onScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const width = e.nativeEvent.layoutMeasurement.width;
    let index = Math.round(offsetX / width);

    let realIndex = index - 1;
    if (index === 0) realIndex = imageProduct.length - 1;
    else if (index === productImagesWithBuffer.length - 1) realIndex = 0;

    setActiveIndex(realIndex);

    if (index === 0) {
      flatListRef.current?.scrollToIndex({
        index: imageProduct.length,
        animated: false,
      });
    } else if (index === productImagesWithBuffer.length - 1) {
      flatListRef.current?.scrollToIndex({ index: 1, animated: false });
    }
  };

  const handleBack = () => {
    router.push('/(tabs)/ecommerce');
  };

  return (
    <SafeAreaView className="bg-[#f8f8f8] flex-1">
      <ScrollView>
        {/* Header */}
        <View className="flex-row bg-white items-center justify-between px-3 pb-5 pt-6">
          <TouchableOpacity className="ml-4" onPress={handleBack}>
            <BackIcons width={20} height={20} color="#7D7D7D" />
          </TouchableOpacity>

          <View className="flex-row items-center ">
            <TouchableOpacity>
              <CartIcons width={26} height={26} colorIcon="#7D7D7D" />
            </TouchableOpacity>
            <TouchableOpacity className="ml-4">
              <Share2Icons width={26} height={26} />
            </TouchableOpacity>
            <TouchableOpacity className="ml-4">
              <MenuVerticalIcons width={26} height={26} />
            </TouchableOpacity>
          </View>
        </View>

        <ProductDetailCard
          product={product}
          imageProduct={productImagesWithBuffer}
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
          <ProductDescription description={productDeskripsi.description} />
        </View>
        <View className="bg-white h-[148px] w-[390px] px-4 pt-4 pb-4 mt-4">
          <StoreInfo toko={toko} />
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
          <View className="mt-4 flex-row space-x-3">
            <TouchableOpacity className="border border-[#169953] w-[40px] h-[40px] mr-2 ml-3 rounded-2xl flex-row justify-center items-center py-2">
              <View>
                <MessageIcons width={18} height={18} color={'#169953'} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 w-[146px] h-[40px] border border-[#169953] rounded-2xl flex-row justify-center items-center py-2">
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
      </ScrollView>
    </SafeAreaView>
  );
}
