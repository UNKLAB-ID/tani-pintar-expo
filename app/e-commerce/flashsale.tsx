import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { router, useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import api from '@/utils/api/api';
import { formatPrice } from '@/utils/format-currency/currency';
import { useTranslate } from '@/i18n';
//icons
import ShareSquareIcons from '@/assets/icons/e-commerce/share-icons';
import BackIcons from '@/assets/icons/global/back-icons';
//components
import FlashSaleTabCard from '@/components/ui/e-commerce/flashsale/card-tab-flashsale';
import InputSearchFlashSale from '@/components/ui/e-commerce/flashsale/input-seach-primary';

// Types
interface FlashSaleProduct {
  uuid: string;
  name: string;
  image?: string;
  prices?: { price: number }[];
  discount?: number;
  sold_count?: number;
  stock?: number;
}

interface Category {
  id: number;
  name: string;
}

const realBanners = [
  {
    id: 1,
    image: require('@/assets/images/trash/Flash-Sale.png'),
  },
];

// Fallback image for products without image
const fallbackImage = require('@/assets/images/trash/image25.png');

const INITIAL_TIME = 60 * 60;

const handleBackHome = () => {
  router.push('/ecommerce');
};

const FlashSaleScreen = () => {
  const t = useTranslate();
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [remainingTime, setRemainingTime] = useState(INITIAL_TIME);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch categories from API
  const { data: categoriesData, isLoading: isLoadingCategories } = useQuery({
    queryKey: ['flashsaleCategories'],
    queryFn: async () => {
      const res = await api.get('/ecommerce/categories/');
      if (res.success && res.data?.results) {
        return res.data.results as Category[];
      }
      return [];
    },
  });

  // Build categories with "All Category" option
  const categories: Category[] = [
    { id: 0, name: t('allCategory') },
    ...(categoriesData || []),
  ];

  // Fetch flash sale products from API
  const { data: productsData, isLoading: isLoadingProducts } = useQuery({
    queryKey: ['flashsaleProducts', activeCategory, searchQuery],
    queryFn: async () => {
      let endpoint = '/ecommerce/products/?has_discount=true';

      // Filter by category if selected (not "All Category")
      if (activeCategory && activeCategory !== 0) {
        endpoint += `&category=${activeCategory}`;
      }

      // Filter by search query
      if (searchQuery.trim()) {
        endpoint += `&search=${encodeURIComponent(searchQuery)}`;
      }

      const res = await api.get(endpoint);
      if (res.success && res.data?.results) {
        return res.data.results as FlashSaleProduct[];
      }
      return [];
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(prev => {
        if (prev <= 1) {
          return INITIAL_TIME;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, '0');
    const mins = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  };

  // Transform API product data to card format
  const getProductPrice = (product: FlashSaleProduct) => {
    const price = product.prices?.[0]?.price || 0;
    return formatPrice(price);
  };

  const getProductDiscount = (product: FlashSaleProduct) => {
    if (product.discount && product.discount > 0) {
      return `${product.discount}%`;
    }
    return undefined;
  };

  return (
    <>
      <StatusBar
        backgroundColor="#169953"
        barStyle="light-content"
        translucent={false}
      />
      <SafeAreaView
        className="flex-1 pt-3  bg-primary"
        edges={['top', 'left', 'right']}
      >
        <View className="bg-primary flex-row items-center justify-center space-x-2 py-2 px-5">
          <TouchableOpacity onPress={handleBackHome} className="p-1 mr-2">
            <BackIcons width={20} height={20} color="#FFF" />
          </TouchableOpacity>
          <InputSearchFlashSale
            coloricon="#AAA"
            placeholder={t('searchDiscountedItems')}
            className="bg-white px-[12px] h-[40px] flex-1 rounded-md"
            iconPosition="right"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity className="p-2">
            <ShareSquareIcons
              width={24}
              height={24}
              style={{ marginBottom: 4 }}
            />
          </TouchableOpacity>
        </View>

        {/*content */}
        <View style={{ flex: 1 }}>
          <ScrollView
            contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
            className="bg-white rounded-t-xl flex-1"
          >
            {/* Banner */}
            <Image
              source={realBanners[0].image}
              resizeMode="cover"
              className="w-full h-[136px] rounded-xl my-3"
            />

            {/* Title & Countdown */}
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-[16px] font-semibold text-black">
                {t('endedIn')}
              </Text>
              <View className="bg-red-600 px-3 py-1 rounded-full">
                <Text className="text-white font-bold text-sm">
                  {formatTime(remainingTime)}
                </Text>
              </View>
            </View>

            {/* Categories */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-3"
              contentContainerStyle={{ paddingRight: 10 }}
            >
              {isLoadingCategories ? (
                <ActivityIndicator size="small" color="#169953" />
              ) : (
                categories.map((cat: Category, index: number) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() =>
                      setActiveCategory(cat.id === 0 ? null : cat.id)
                    }
                    className={`h-[40px] p-16 px-5 py-1 rounded-full mr-2 border ${
                      (activeCategory === null && cat.id === 0) ||
                      activeCategory === cat.id
                        ? 'bg-primary border-primary'
                        : 'border-gray-300 bg-white'
                    }`}
                  >
                    <Text
                      className={`text-[12px] text-center font-bold mt-2 ${
                        (activeCategory === null && cat.id === 0) ||
                        activeCategory === cat.id
                          ? 'text-white'
                          : 'text-black'
                      }`}
                    >
                      {cat.name}
                    </Text>
                  </TouchableOpacity>
                ))
              )}
            </ScrollView>

            {/* Product List */}
            {isLoadingProducts ? (
              <View className="flex-1 items-center justify-center py-10">
                <ActivityIndicator size="large" color="#169953" />
              </View>
            ) : productsData && productsData.length > 0 ? (
              <FlatList
                data={productsData}
                keyExtractor={item => item.uuid}
                scrollEnabled={false}
                renderItem={({ item }) => (
                  <View className="mb-4">
                    <FlashSaleTabCard
                      image={item.image ? { uri: item.image } : fallbackImage}
                      name={item.name}
                      discount={getProductDiscount(item)}
                      price={getProductPrice(item)}
                      sold={item.sold_count || 0}
                      total={item.stock || 100}
                      onPress={() =>
                        router.push(`/e-commerce/detail/${item.uuid}`)
                      }
                    />
                  </View>
                )}
              />
            ) : (
              <View className="flex-1 items-center justify-center py-10">
                <Text className="text-gray-500">
                  {t('noFlashSaleProducts')}
                </Text>
              </View>
            )}
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};

export default FlashSaleScreen;
