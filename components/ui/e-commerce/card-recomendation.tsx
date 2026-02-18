import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ImageSourcePropType,
} from 'react-native';
import StarIcons from '@/assets/icons/e-commerce/stars-icons';
import Location2Icons from '@/assets/icons/e-commerce/locations2-icons';
import ButtonPlusPrimaryIcons from '@/assets/icons/e-commerce/button-plus-primary-icons';
import { formatPrice } from '@/utils/format-currency/currency';
import { router } from 'expo-router';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import api from '@/utils/api/api';

interface Product {
  uuid: string;
  name: string;
  image?: ImageSourcePropType;
  prices?: { price: number }[];
  discount?: number;
  rating?: number;
  lokasi?: { name: string };
}

interface RecommendedProduct {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  location: string;
  image: ImageSourcePropType;
}

interface RecomendationCardProps {
  products?: RecommendedProduct[];
  title?: string;
  className?: string;
  useApi?: boolean;
}

const RecomendationCard: React.FC<RecomendationCardProps> = ({
  products: propProducts,
  title = 'Recommended Product',
  className = '',
  useApi = true,
}) => {
  // Fetch recommended products from API
  const { data: apiProducts, isLoading } = useQuery({
    queryKey: ['recommendedProductsCard'],
    queryFn: async () => {
      const res = await api.get('/ecommerce/products/?page_size=4');
      if (res.success && res.data?.results) {
        return res.data.results.map((item: Product) => ({
          id: item.uuid,
          name: item.name,
          price: item.prices?.[0]?.price || 0,
          originalPrice: item.prices?.[0]?.price
            ? Math.round(item.prices[0].price * 1.1)
            : 0,
          discount: item.discount || 10,
          rating: item.rating || 4.5,
          location: item.lokasi?.name || 'Indonesia',
          image: item.image
            ? { uri: item.image }
            : require('../../../assets/images/trash/image18.png'),
        }));
      }
      return [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: useApi && !propProducts,
  });

  // Use propProducts if provided, otherwise use API data
  const displayProducts =
    propProducts && propProducts.length > 0 ? propProducts : apiProducts || [];

  const handleLoadMore = () => {
    router.push('/e-commerce');
  };

  const handleProductPress = (productId: string) => {
    router.push({
      pathname: '/e-commerce/detail/[uuid]',
      params: { uuid: productId },
    });
  };

  return (
    <SafeAreaView edges={['bottom']}>
      <View
        className="bg-white pt-4 pb-4"
        style={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
      >
        <Text
          className="font-semibold text-black mb-4 ml-4"
          style={{ fontSize: 18 }}
        >
          {title}
        </Text>

        {isLoading && useApi && !propProducts ? (
          <View className="py-8 items-center">
            <ActivityIndicator size="large" color="#169953" />
          </View>
        ) : (
          <View className="flex-row flex-wrap mx-3 justify-between">
            {displayProducts.slice(0, 4).map((product: RecommendedProduct) => (
              <TouchableOpacity
                key={product.id}
                className="mb-2 bg-white rounded-lg"
                onPress={() => handleProductPress(product.id)}
                activeOpacity={0.7}
              >
                <Image
                  source={product.image}
                  className="w-[171px] h-[160px] rounded-xl"
                  resizeMode="contain"
                />
                <Text className="text-[16px] font-medium mt-1 text-black">
                  {product.name.length > 23
                    ? product.name.slice(0, 20) + '...'
                    : product.name}
                </Text>

                <Text className="text-[20px] text-black font-semibold mt-1">
                  {formatPrice(product.price)}
                </Text>

                <View className="flex-row items-center space-x-2 mt-1">
                  <Text className="text-[16px] line-through text-[#bcbcbc]">
                    {formatPrice(product.originalPrice)}
                  </Text>
                  <View
                    className="bg-red-600  rounded-xl"
                    style={{ marginLeft: 10, paddingHorizontal: 8 }}
                  >
                    <Text className="text-white text-[16px] font-semibold">
                      {product.discount} %
                    </Text>
                  </View>
                </View>

                <View className="flex-row items-center mt-1">
                  <StarIcons width={12} height={12} />
                  <Text className="ml-1 text-[12px] text-[#555]">
                    {product.rating} / 5.0
                  </Text>
                </View>
                <Text className="text-[11px] text-[#6f6f6f] mt-1">
                  <Location2Icons width={12.44} height={12.44} />{' '}
                  {product.location}
                </Text>

                <TouchableOpacity className="border-2 border-primary rounded-xl mt-2 items-center">
                  <View className="flex-row items-center ">
                    <View className="mt-3">
                      <ButtonPlusPrimaryIcons width={24} height={24} />
                    </View>
                    <Text className="text-primary font-semibold text-[16px]">
                      Add to Cart
                    </Text>
                  </View>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View className="items-center mt-4 ">
          <TouchableOpacity
            className="border-2 items-center bg-primary border-primary rounded-2xl p-2"
            style={{ width: 131, height: 38 }}
            onPress={handleLoadMore}
          >
            <Text className="text-white font-semibold text-[16px]">
              Load More...
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RecomendationCard;
