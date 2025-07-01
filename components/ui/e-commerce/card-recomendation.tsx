import { View, Text, Image, TouchableOpacity } from 'react-native';
import StarIcons from '@/assets/icons/e-commerce/stars-icons';
import Location2Icons from '@/assets/icons/e-commerce/locations2-icons';
import ButtonPlusPrimaryIcons from '@/assets/icons/e-commerce/button-plus-primary-icons';
import { useState } from 'react';
import { formatPrice } from '@/utils/format-currency/currency';
import { router } from 'expo-router';

const products = [
  {
    id: '1',
    name: 'Insektisida dan Akarisida',
    price: 32200,
    originalPrice: 35000,
    discount: 8,
    rating: 4.5,
    location: 'Yogyakarta',
    image: require('@/assets/images/trash/image18.png'),
  },
  {
    id: '2',
    name: 'BELI 3 GRATIS 1 Pupuk Buah',
    price: 16000,
    originalPrice: 20000,
    discount: 20,
    rating: 4.6,
    location: 'Sumedang',
    image: require('@/assets/images/trash/image25.png'),
  },
  {
    id: '3',
    name: 'Fungisida Quilt 200SC',
    price: 82237,
    originalPrice: 96750,
    discount: 15,
    rating: 4.9,
    location: 'Sumenep',
    image: require('@/assets/images/trash/image18.png'),
  },
  {
    id: '4',
    name: 'Simodis 100EC Insektisida',
    price: 152000,
    originalPrice: 160000,
    discount: 5,
    rating: 4.6,
    location: 'Bandung',
    image: require('@/assets/images/trash/image25.png'),
  },
];

interface RecomendationCardProps {
  products?: typeof products;
  title?: string;
}

const RecomendationCard: React.FC<RecomendationCardProps> = ({
  products: propProducts = products,
  title = 'Produk Rekomendasi',
}) => {
  const [visibleCount, setVisibleCount] = useState(4);

  const handleLoadMore = () => {
    router.push('/(tabs)/ecommerce');
  };

  const handleAddToCart = (product: (typeof products)[0]) => {
    console.log('Added to cart:', product);
    // bisa diubah jadi dispatch atau setState nanti
  };
  return (
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

      <View className="flex-row flex-wrap mx-3 justify-between">
        {propProducts.map(product => (
          <View key={product.id} className=" mb-2 bg-white rounded-lg">
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
              <Location2Icons width={12.44} height={12.44} /> {product.location}
            </Text>

            <TouchableOpacity
              className="border-2 border-primary rounded-xl mt-2 items-center"
              onPress={() => handleAddToCart(product)}
            >
              <View className="flex-row items-center ">
                <View className="mt-3">
                  <ButtonPlusPrimaryIcons width={24} height={24} />
                </View>
                <Text className="text-primary font-semibold text-[16px]">
                  Add to Cart
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <View className="items-center mt-4">
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
  );
};

export default RecomendationCard;
