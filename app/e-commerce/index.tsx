import {
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  TouchableOpacity,
  StatusBar,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { useRef, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import api from '@/utils/api/api';
import { formatPrice } from '@/utils/format-currency/currency';
import { useInfiniteQuery } from '@tanstack/react-query';

// components
import InputSearchPrimary from '@/components/ui/component-globals/input-seach-primary';
import FlashSaleCard from '@/components/ui/e-commerce/card-flashsale';
import ProductCard from '@/components/ui/e-commerce/card-product';
import MainCategoryCard from '@/components/ui/e-commerce/main-category';
import LocationInfo from '@/components/ui/e-commerce/location-info';
// icons
import MessageIcons from '@/assets/icons/global/message-icons';
import CartIcons from '@/assets/icons/e-commerce/cart-icons';
import ArrowRightIcons from '@/assets/icons/e-commerce/arrow-right-icons';
import WalletVoucherSection from '@/components/ui/e-commerce/wallet-voucher-section';

const { width } = Dimensions.get('window');

const realBanners = [
  { id: 1, image: require('@/assets/images/trash/Banner-Promotion.png') },
  { id: 2, image: require('@/assets/images/trash/Banner-Promotion.png') },
  { id: 3, image: require('@/assets/images/trash/Banner-Promotion.png') },
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
type CategoryRoute =
  | '/e-commerce/category/topup'
  | '/e-commerce/category/sprayer'
  | '/e-commerce/category/herbal'
  | '/e-commerce/category/vegetable';

interface MainCategoryItem {
  id: number;
  icon: string;
  label: string;
  route: CategoryRoute;
}

const mainCategoryData: MainCategoryItem[] = [
  {
    id: 1,
    icon: 'TopUpIcons',
    label: 'Top Up\n& Bayar',
    route: '/e-commerce/category/topup',
  },
  {
    id: 2,
    icon: 'TopUpIcons',
    label: 'Alat\nPenyemprot',
    route: '/e-commerce/category/sprayer',
  },
  {
    id: 3,
    icon: 'TopUpIcons',
    label: 'Obat\nHerbal',
    route: '/e-commerce/category/herbal',
  },
  {
    id: 4,
    icon: 'TopUpIcons',
    label: 'Jenis\nSayuran',
    route: '/e-commerce/category/vegetable',
  },
];

const banners = [
  realBanners[realBanners.length - 1],
  ...realBanners,
  realBanners[0],
];

const EcommerceIndex = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [timeLeftMs, setTimeLeftMs] = useState(3600 * 1000);
  const flatListBannerRef = useRef<FlatList>(null);
  const router = useRouter();

  const fetchListProduct = async ({ pageParam }: { pageParam?: string }) => {
    const endpoint = pageParam || '/ecommerce/products/';
    const response = await api.get(endpoint);
    return response.data;
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
  } = useInfiniteQuery({
    queryKey: ['listProduct'],
    queryFn: fetchListProduct,
    initialPageParam: '/ecommerce/products/',
    getNextPageParam: lastPage => {
      if (!lastPage?.next) return undefined;
      return lastPage.next.replace(/^https?:\/\/[^/]+/, '');
    },
    refetchOnWindowFocus: false,
  });

  const allProducts = data?.pages.flatMap(page => page.results) || [];

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeftMs(prev => (prev > 0 ? prev - 1000 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = currentIndex + 1;
      flatListBannerRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
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
        flatListBannerRef.current?.scrollToIndex({ index: 1, animated: false });
        setCurrentIndex(1);
      }, 300);
    } else if (currentIndex === 0) {
      setTimeout(() => {
        flatListBannerRef.current?.scrollToIndex({
          index: banners.length - 2,
          animated: false,
        });
        setCurrentIndex(banners.length - 2);
      }, 300);
    }
  }, [currentIndex]);

  const handleFlashsale = () => router.push('/e-commerce/flashsale');
  const handleMessage = () => router.push('/message/message');
  const handleCart = () => router.push('/e-commerce/cart');

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage]);

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#ffffff"
        translucent={false}
      />
      <SafeAreaView
        edges={['top', 'right', 'left']}
        className="flex-1 bg-white"
      >
        <FlatList
          data={allProducts}
          keyExtractor={(item, index) => item.uuid || index.toString()}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          refreshControl={
            <RefreshControl
              refreshing={isRefetching}
              onRefresh={refetch}
              colors={['#28a745']}
            />
          }
          ListHeaderComponent={
            <>
              {/* Header Search */}
              <View className="px-5 py-3 pb-4 bg-white">
                <View className="flex-row items-center justify-between">
                  <View className="w-[276px] relative">
                    <InputSearchPrimary
                      placeholder="Find what you’re looking for..."
                      className="px-[12px]"
                      coloricon="#000"
                    />
                    <TouchableOpacity
                      onPress={() => router.push('/e-commerce/search')}
                      className="absolute inset-0"
                      activeOpacity={1}
                    />
                  </View>
                  <View className="flex-row">
                    <TouchableOpacity
                      className="mr-[9px]"
                      onPress={handleMessage}
                    >
                      <MessageIcons width={28} height={28} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleCart}>
                      <CartIcons width={28} height={28} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              {/* Location */}
              <LocationInfo address={`${userAddress.street}`} />

              {/* Banner Slider */}
              <View className="mt-4">
                <FlatList
                  ref={flatListBannerRef}
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

              {/* Wallet & Voucher Section */}
              <WalletVoucherSection />

              {/* Main Category */}
              <View className="mt-6 px-5">
                <View className="flex-row justify-between items-center space-x-4">
                  {mainCategoryData.map(item => (
                    <MainCategoryCard
                      key={item.id}
                      item={item}
                      onPress={() => router.push(item.route as never)}
                    />
                  ))}
                </View>
              </View>

              {/* Flash Sale */}
              <LinearGradient colors={['#FFFFFF', '#F0F0F0']}>
                <View className="mt-6 px-5">
                  <View className="flex-row justify-between items-center mb-4">
                    <View className="flex-row items-center">
                      <Text className="font-bold text-green-600 text-[17px]">
                        Flash Sale
                      </Text>
                      <View className="ml-3 px-2.5 py-1 rounded-full bg-red-500/10">
                        <Text className="text-red-500 font-semibold text-sm">
                          {formatTime(timeLeftMs)}
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity onPress={handleFlashsale}>
                      <View className="flex-row items-center">
                        <Text className="text-sm text-[#525252] mr-1">
                          See All
                        </Text>
                        <ArrowRightIcons width={20} height={20} />
                      </View>
                    </TouchableOpacity>
                  </View>
                  <FlatList
                    data={allProducts.slice(0, 6)}
                    horizontal
                    keyExtractor={(item, index) =>
                      item.uuid || index.toString()
                    }
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                      <View className="mr-2 pb-3">
                        <FlashSaleCard
                          image={{ uri: item.image }}
                          name={item.name}
                          price={formatPrice(item.prices?.[0]?.price)}
                          sold={item.available_stock}
                          total={item.available_stock}
                          discount="10%"
                        />
                      </View>
                    )}
                  />
                </View>
              </LinearGradient>

              <View className="bg-white rounded-t-xl pt-2 px-5 mt-4">
                <Text className="text-[16px] font-bold py-3">For You!</Text>
              </View>
            </>
          }
          renderItem={({ item }) => (
            <View className="w-1/2 px-2 mb-2">
              <ProductCard
                image={{ uri: item.image }}
                name={item.name}
                discount="10%"
                price={formatPrice(item.prices?.[0]?.price)}
                rating={5}
                sold={item.available_stock}
                location={item.lokasi?.name ?? 'Unknown'}
                onPress={() =>
                  router.push({
                    pathname: '/e-commerce/detail/[uuid]',
                    params: { uuid: item.uuid },
                  })
                }
              />
            </View>
          )}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          ListFooterComponent={
            isFetchingNextPage ? (
              <View className="py-6">
                <ActivityIndicator size="small" color="#28a745" />
              </View>
            ) : null
          }
        />
      </SafeAreaView>
    </>
  );
};

export default EcommerceIndex;
