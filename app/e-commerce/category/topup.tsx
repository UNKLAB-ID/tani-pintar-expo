import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Href, useRouter } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import type { ComponentType } from 'react';

import InputSearchPrimary from '@/components/ui/component-globals/input-seach-primary';
import BackIcons from '@/assets/icons/global/back-icons';
import ProductCard from '@/components/ui/e-commerce/card-product';

import api from '@/utils/api/api';
import { formatPrice } from '@/utils/format-currency/currency';

import ReceiptIcon from '@/assets/icons/e-commerce/receipt-main-category-icon';
import PulsaCategoryIcon from '@/assets/icons/e-commerce/pulsa-phone-icon';
import DataPackageCategoryIcon from '@/assets/icons/e-commerce/data-package-icon';
import PDAMCategoryIcon from '@/assets/icons/e-commerce/pdam-category-icon';
import PLNCategoryIcon from '@/assets/icons/e-commerce/pln-category-icon';
import BPJSCategoryIcon from '@/assets/icons/e-commerce/bpjs-category-icon';
import EwalletCategoryIcon from '@/assets/icons/e-commerce/ewallet-category-icon';
import EmoneyCategoryIcon from '@/assets/icons/e-commerce/emoney-category-icon';
import EducationCategoryIcon from '@/assets/icons/e-commerce/education-category-icon';
import PbbCategoryIcon from '@/assets/icons/e-commerce/pbb-category-icon';
import TvInternetCategoryIcon from '@/assets/icons/e-commerce/tv-net-category-icon';

interface ServiceItem {
  id: number;
  label: string;
  Icon: ComponentType<{ width?: number; height?: number }>;
  Route?: Href;
}

const services: ServiceItem[] = [
  {
    id: 1,
    label: 'Pulsa',
    Icon: PulsaCategoryIcon,
    Route: '/payment/topup/pulsa',
  },
  { id: 2, label: 'Data Package', Icon: DataPackageCategoryIcon },
  { id: 3, label: 'PDAM', Icon: PDAMCategoryIcon },
  { id: 4, label: 'PLN', Icon: PLNCategoryIcon, Route: '/payment/topup/pln' },
  { id: 5, label: 'BPJS', Icon: BPJSCategoryIcon },
  { id: 6, label: 'E-Wallet', Icon: EwalletCategoryIcon },
  { id: 7, label: 'Electronic Money', Icon: EmoneyCategoryIcon },
  { id: 8, label: 'Education', Icon: EducationCategoryIcon },
  { id: 9, label: 'PBB', Icon: PbbCategoryIcon },
  { id: 10, label: 'Cable TV & Internet Bills', Icon: TvInternetCategoryIcon },
];

const banners = [
  { id: 1, image: require('@/assets/images/trash/Banner.png') },
  { id: 2, image: require('@/assets/images/trash/Banner-Promotion.png') },
  { id: 3, image: require('@/assets/images/trash/Banner-Promotion.png') },
];

const { width } = Dimensions.get('window');

/* =======================
   COMPONENT
======================= */
export default function TopUpMainCategory() {
  const router = useRouter();
  const bannerRef = useRef<FlatList>(null);
  const [activeBanner, setActiveBanner] = useState(0);

  /* =======================
     AUTO SCROLL BANNER
  ======================= */
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex =
        activeBanner === banners.length - 1 ? 0 : activeBanner + 1;

      bannerRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });

      setActiveBanner(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [activeBanner]);

  /* =======================
     FETCH PRODUCT
  ======================= */
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
    queryKey: ['listProduct', 'topup'],
    queryFn: fetchListProduct,
    initialPageParam: '/ecommerce/products/',
    getNextPageParam: lastPage =>
      lastPage?.next
        ? lastPage.next.replace(/^https?:\/\/[^/]+/, '')
        : undefined,
    refetchOnWindowFocus: false,
  });

  const allProducts = data?.pages.flatMap(page => page.results) || [];

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* HEADER */}
      <View className="bg-white px-4 pt-2 pb-3">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()}>
            <BackIcons width={22} height={22} />
          </TouchableOpacity>

          <View className="flex-1 mx-3">
            <InputSearchPrimary
              placeholder="Search E-Money / Topup / Other"
              className="px-[14px]"
              coloricon="#9CA3AF"
            />
          </View>

          <TouchableOpacity>
            <ReceiptIcon width={22} height={22} />
          </TouchableOpacity>
        </View>
      </View>

      {/* MAIN LIST */}
      <FlatList
        data={allProducts}
        keyExtractor={(item, index) => item.uuid || index.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
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
            {/* BANNER */}
            <View className="mt-2">
              <FlatList
                ref={bannerRef}
                data={banners}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.id.toString()}
                getItemLayout={(_, index) => ({
                  length: width,
                  offset: width * index,
                  index,
                })}
                onMomentumScrollEnd={e => {
                  const index = Math.round(
                    e.nativeEvent.contentOffset.x / width
                  );
                  setActiveBanner(index);
                }}
                renderItem={({ item }) => (
                  <View style={{ width }} className="px-4">
                    <Image
                      source={item.image}
                      style={{
                        width: '100%',
                        height: 130,
                        borderRadius: 16,
                      }}
                      resizeMode="cover"
                    />
                  </View>
                )}
              />

              {/* INDICATOR */}
              <View className="flex-row justify-start mt-3 px-4">
                {banners.map((_, index) => (
                  <View
                    key={index}
                    className={`h-[6px] mx-[3px] rounded-full ${
                      index === activeBanner
                        ? 'bg-primary w-[30px]'
                        : 'bg-gray-300 w-[6px]'
                    }`}
                  />
                ))}
              </View>
            </View>

            {/* SERVICES GRID */}
            <View className="mt-6">
              <View className="flex-row flex-wrap">
                {services.map(({ id, label, Icon, Route }) => (
                  <TouchableOpacity
                    key={id}
                    className="w-[20%] items-center mb-5"
                    onPress={() => {
                      if (Route) {
                        router.push(Route);
                      }
                    }}
                  >
                    <View className="w-12 h-12 items-center justify-center mb-1 overflow-visible">
                      <Icon width={30} height={30} />
                    </View>
                    <Text className="text-xs text-center leading-4">
                      {label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* FLASH SALE */}
            <View className="mt-6 bg-[#6EEB83] rounded-xl p-3">
              <View className="flex-row items-center justify-between mb-3">
                <View className="flex-row items-center">
                  <Text className="font-bold text-white text-[16px]">
                    Flash Sale
                  </Text>
                  <View className="ml-2 px-2 py-0.5 bg-white/80 rounded-md">
                    <Text className="text-green-700 text-xs font-semibold">
                      12:00:00
                    </Text>
                  </View>
                </View>
              </View>

              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={[1, 2, 3, 4]}
                keyExtractor={(_, i) => `flash-${i}`}
                renderItem={() => (
                  <View className="bg-white rounded-lg p-2 mr-3 w-[150px]">
                    <Text
                      className="text-[12px] font-medium mb-1"
                      numberOfLines={2}
                    >
                      Flazz TapCash - Rp100.000 Flash...
                    </Text>
                    <Text className="font-bold text-[14px]">Rp100.980</Text>
                  </View>
                )}
              />
            </View>

            {/* SECTION TITLE */}
            <View className="mt-4 mb-2">
              <Text className="text-[16px] font-bold">For You!</Text>
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
        ListFooterComponent={
          isFetchingNextPage ? (
            <View className="py-6">
              <ActivityIndicator size="small" color="#28a745" />
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
}
