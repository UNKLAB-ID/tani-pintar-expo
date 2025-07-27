import {
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import InputSearchPrimary from '@/components/ui/component-globals/input-seach-primary';
import MessageIcons from '@/assets/icons/global/message-icons';
import CartIcons from '@/assets/icons/e-commerce/cart-icons';
import ArrowRightIcons from '@/assets/icons/e-commerce/arrow-right-icons';
import FlashSaleCard from '@/components/ui/e-commerce/card-flashsale';
import ProductCard from '@/components/ui/e-commerce/card-product';
import MainCategoryCard from '@/components/ui/e-commerce/main-category';
import LocationInfo from '@/components/ui/e-commerce/location-info';
import VoucherIcons from '@/assets/icons/global/voucher-icons';
import Wallet2Icons from '@/assets/icons/global/wallet2-icons';
import WalletIcons from '@/assets/icons/global/wallet-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const realBanners = [
  {
    id: 1,

    image: require('@/assets/images/trash/Banner-Promotion.png'),
  },
  {
    id: 2,

    image: require('@/assets/images/trash/Banner-Promotion.png'),
  },
  {
    id: 3,

    image: require('@/assets/images/trash/Banner-Promotion.png'),
  },
];

const userAddress = {
  id: 1,
  label: 'Rumah',
  street: 'Jl. Pangeran Diponegoro No. 45',
  city: 'Jakarta Pusat',
  province: 'DKI Jakarta',
  postalCode: '10110',
  country: 'Indonesia',
};

const productData = [
  {
    id: 1,
    name: 'Pupuk Organik Cair',
    price: 'Rp25.000',
    originalPrice: 'Rp35.000',
    image: require('@/assets/images/trash/bottle.png'),
    sold: 250,
    total: 2000,
    discount: '29%',
    rating: 5,
    location: 'jakarta',
  },
  {
    id: 2,
    name: 'Benih Sayur Kangkung',
    price: 'Rp10.000',
    originalPrice: 'Rp15.000',
    image: require('@/assets/images/trash/image18.png'),
    sold: 250,
    total: 500,
    discount: '33%',
    rating: 5,
    location: 'jakarta',
  },
  {
    id: 3,
    name: 'Alat Semprot Mini',
    price: 'Rp70.000',
    originalPrice: 'Rp90.000',
    image: require('@/assets/images/trash/image25.png'),
    sold: 250,
    total: 1100,
    rating: 5,
    location: 'jakarta',
  },
  {
    id: 4,
    name: 'Alat Mini',
    price: 'Rp70.000',
    originalPrice: 'Rp90.000',
    image: require('@/assets/images/trash/Product1.png'),
    sold: 250,
    total: 1100,
    discount: '22%',
    rating: 5,
    location: 'jakarta',
  },
];

const mainCategoryData = [
  {
    id: 1,
    icon: 'TopUpIcons',
    label: 'Top Up\n& Bayar',
  },
  {
    id: 2,
    icon: 'TopUpIcons',
    label: 'Alat\nPenyemprot',
  },
  {
    id: 3,
    icon: 'TopUpIcons',
    label: 'Obat\nHerbal',
  },
  {
    id: 4,
    icon: 'TopUpIcons',
    label: 'Jenis\nSayuran',
  },
];

const banners = [
  realBanners[realBanners.length - 1],
  ...realBanners,
  realBanners[0],
];

const EcommerceIndex = () => {
  const flatListRef = useRef<FlatList>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [timeLeftMs, setTimeLeftMs] = useState(3600 * 1000);
  const intervalRef = useRef<number | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    if (timeLeftMs <= 0) {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current!);
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeLeftMs(prev => {
        if (prev <= 100) {
          clearInterval(intervalRef.current);
          return 0;
        }
        return prev - 100;
      });
    }, 100);

    return () => {
      if (intervalRef.current !== undefined) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleFlashsale = () => {
    router.push('/e-commerce/flashsale');
  };
  const handleProductDetail = () => {
    router.push('/e-commerce/detail-product');
  };

  const handleMessage = () => {
    router.push('/e-commerce/message');
  };

  const handleCart = () => {
    router.push('/e-commerce/cart');
  };
  interface FormatTime {
    (ms: number): string;
  }

  const formatTime: FormatTime = ms => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((ms % 1000) / 100);

    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}.${milliseconds}`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = currentIndex + 1;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    setCurrentIndex(index);

    let realIndex = index - 1;
    if (index === 0) realIndex = realBanners.length - 1;
    else if (index === banners.length - 1) realIndex = 0;
    setActiveIndex(realIndex);
  };

  useEffect(() => {
    if (currentIndex === banners.length - 1) {
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({ index: 1, animated: false });
        setCurrentIndex(1);
      }, 300);
    } else if (currentIndex === 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({
          index: banners.length - 2,
          animated: false,
        });
        setCurrentIndex(banners.length - 2);
      }, 300);
    }
  }, [currentIndex]);

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#ffffff"
        translucent={false}
      />
      <SafeAreaView edges={['right', 'left']} className="flex-1 w-full ">
        <View className="px-5 py-3 pb-4 bg-white">
          <View className="flex-row items-center justify-between">
            <View className="w-[276px] relative">
              <InputSearchPrimary
                placeholder="Find what you’re looking for..."
                className="px-[12px]"
                coloricon="#000"
              />

              {/* Overlay Touchable di atas input */}
              <TouchableOpacity
                onPress={() => router.push('/e-commerce/search')}
                className="absolute inset-0"
                activeOpacity={1}
              />
            </View>
            <View className="flex-row">
              <TouchableOpacity className="mr-[9px]" onPress={handleMessage}>
                <MessageIcons width={28} height={28} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCart}>
                <CartIcons width={28} height={28} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 10,
            backgroundColor: 'white',
          }}
          showsVerticalScrollIndicator={false}
          bounces={true}
          alwaysBounceVertical={true}
        >
          {/* Location */}
          <LocationInfo address={`${userAddress.street}`} />
          <View className="mt-4 ">
            <FlatList
              ref={flatListRef}
              data={banners}
              keyExtractor={(_, i) => i.toString()}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={handleScrollEnd}
              initialScrollIndex={1}
              getItemLayout={(_, index) => ({
                length: width,
                offset: width * index,
                index,
              })}
              renderItem={({ item }) => (
                <View style={{ width, paddingHorizontal: 20 }}>
                  <TouchableOpacity
                    onPress={handleFlashsale}
                    activeOpacity={0.8}
                  >
                    <Image
                      source={item.image}
                      className="w-full h-[120px] rounded-2xl"
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
              )}
            />

            {/* Dot Indicator */}
            <View className="flex-row justify-center mt-2">
              {realBanners.map((_, index) => (
                <View
                  key={index}
                  className={`mx-[2px] rounded-full ${
                    index === activeIndex
                      ? 'bg-[#28a745] w-[20px]'
                      : 'bg-[#dcdcdc] w-[8px]'
                  } h-[8px]`}
                />
              ))}
            </View>
          </View>

          <View className="flex-row w-[355px] h-[83px] bg-[#F0F0F0] justify-center rounded-xl pt-3 pb-3 px-4 py-4 mx-5 mt-5 ">
            <View className="w-1/3 items-start">
              <View className="flex-row items-center mb-1 mt-1">
                <View style={{ marginRight: 3 }}>
                  <WalletIcons width={16} height={16} />
                </View>
                <Text className="text-[12px] font-medium text-black">
                  TaniPay
                </Text>
              </View>
              <View className="space-y-1">
                <Text className="text-[12px] font-bold text-black">
                  Rp20.000
                </Text>
                <Text
                  className="text-[10px] text-gray-500"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  Topup minimum...
                </Text>
              </View>
            </View>

            <View className="w-1/3">
              <View className="flex-row items-center mb-1 mt-1">
                <View style={{ marginRight: 3 }}>
                  <Wallet2Icons width={16} height={16} />
                </View>
                <Text className="text-[12px] font-medium text-black">
                  TaniPinjam
                </Text>
              </View>
              <View className="space-y-1">
                <Text className="text-[12px] font-bold text-[#28a745]">
                  ActivateNow
                </Text>
                <Text
                  className="text-[10px] text-gray-500"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  Limit up to Rp20...
                </Text>
              </View>
            </View>

            <View className="w-1/3">
              <View className="flex-row items-center mb-1 mt-1">
                <View style={{ marginRight: 3 }}>
                  <VoucherIcons width={16} height={16} />
                </View>
                <Text className="text-[12px] font-medium text-black">
                  Voucher
                </Text>
              </View>
              <View className="space-y-1">
                <Text className="text-[12px] font-bold text-black">
                  Voucher Discount
                </Text>
                <Text
                  className="text-[10px] text-[#28a745]"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  Free Delivery Service
                </Text>
              </View>
            </View>
          </View>

          {/* Kategori Utama */}
          <View className="mt-6 px-5">
            <View className="flex-row justify-between items-center space-x-4">
              {mainCategoryData.map(item => (
                <MainCategoryCard key={item.id} item={item} />
              ))}
            </View>
          </View>

          {/* card */}
          <LinearGradient colors={['#FFFFFF', '#F0F0F0']}>
            <View className="mt-6 px-5">
              <View className="flex-row justify-between items-center mb-4">
                <View className="flex-row items-center">
                  <Text className="font-bold text-green-600 text-[17px]">
                    Flash Sale
                  </Text>
                  <View className="ml-3 px-2.5 py-1 rounded-full  bg-red-500/10">
                    <Text className="text-red-500 font-semibold text-sm">
                      {formatTime(timeLeftMs)}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity onPress={handleFlashsale}>
                  <View className="flex-row items-center">
                    <Text
                      className="text-sm"
                      style={{ color: '#525252', marginLeft: 150 }}
                    >
                      See All
                    </Text>

                    <ArrowRightIcons width={20} height={20} />
                  </View>
                </TouchableOpacity>
              </View>

              {/* List Produk: Scroll Horizontal */}

              <FlatList
                data={productData}
                keyExtractor={item => item.id.toString()}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <View className="mr-2 pb-3">
                    <FlashSaleCard
                      image={item.image}
                      name={item.name}
                      price={item.price}
                      sold={item.sold}
                      total={item.total}
                      discount={item.discount}
                    />
                  </View>
                )}
              />
            </View>
          </LinearGradient>
          <View style={{ backgroundColor: '#F0F0F0' }} className="pt-6">
            <View className="bg-white rounded-t-xl pt-2 px-5">
              <View className="mb-4">
                <Text className="text-[16px] font-bold py-3">For You!</Text>
              </View>

              {/* List Produk: Grid 2 Kolom */}
              <View className="flex-row flex-wrap justify-between -mx-1">
                {productData.map(item => (
                  <View key={item.id} className="w-1/2 px-1 mb-1">
                    <ProductCard
                      image={item.image}
                      name={item.name}
                      discount={item.discount}
                      price={item.price}
                      rating={item.rating ?? 0}
                      sold={item.sold}
                      location={item.location}
                      onPress={handleProductDetail}
                    />
                  </View>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default EcommerceIndex;
