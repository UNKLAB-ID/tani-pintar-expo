import CartIcons from '@/assets/icons/e-commerce/cart-icons';
import BackIcons from '@/assets/icons/global/back-icons';
import RecomendationCard from '@/components/ui/e-commerce/card-recomendation';
import { router } from 'expo-router';
import {
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const datadummy = [
  {
    id: '1',
    image: require('@/assets/images/trash/image25.png'),
    category: 'Pupuk',
    title: 'PUPUK NPK MUTIARA 16–16–16 1 KG',
    location: 'Bandung, Indonesia',
    rating: 4.8,
    sold: 350,
    price: 'Rp19.535',
    originalPrice: 'Rp24.192',
    discount: '20%',
    isOfficial: false,
  },
  {
    id: '2',
    image: require('@/assets/images/trash/image18.png'),
    category: 'Alat penyemprot',
    title: 'H&L Semprotan Sprayer Manual [2 Liter]',
    location: 'Kota Tangerang, Indonesia',
    rating: 4.6,
    sold: 500,
    price: 'Rp28.800',
    originalPrice: 'Rp36.000',
    discount: '20%',
    isOfficial: true,
  },
];

const WishlistScreen = () => {
  const handleBack = () => router.push('/(tabs)/ecommerce');
  const handleBackCart = () => router.push('/e-commerce/cart');

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <SafeAreaView edges={['top', 'right', 'left']} className=" bg-[#F8F8F8]">
        {/* Header */}
        <View className="flex-row justify-between mb-3 bg-white items-center p-4">
          <TouchableOpacity onPress={handleBack}>
            <BackIcons width={24} height={24} />
          </TouchableOpacity>
          <Text className="text-xl font-semibold">Wishlist</Text>
          <TouchableOpacity onPress={handleBackCart}>
            <CartIcons width={24} height={24} color={'#000000'} />
          </TouchableOpacity>
        </View>

        {/* Main content */}
        <ScrollView>
          {datadummy.length === 0 ? (
            <View className="flex-1 justify-center items-center mt-20">
              <Image
                source={require('@/assets/images/Empty-Cart.png')}
                className="w-[200px] h-[200px] mb-4"
                resizeMode="contain"
              />
              <Text className="text-[16px] font-semibold text-gray-700">
                No Wishlist Yet
              </Text>
              <Text className="text-[13px] text-gray-500 text-center mt-1 px-10">
                You {`haven't`} added any products to your wishlist.
              </Text>
            </View>
          ) : (
            datadummy.map(item => (
              <View
                key={item.id}
                className="flex-row bg-white  mb-1  py-3 px-3"
              >
                {/* Image */}
                <Image
                  source={item.image}
                  className="w-[80px] h-[80px] rounded-md"
                  resizeMode="contain"
                />

                {/* Info */}
                <View className="flex-1 ml-3 justify-between">
                  <Text className="text-xs text-green-600 font-semibold">
                    {item.category}
                  </Text>
                  <Text
                    className="text-[13px] font-bold text-black"
                    numberOfLines={2}
                  >
                    {item.title}
                  </Text>
                  <Text className="text-[11px] text-gray-500">
                    📍 {item.location}
                  </Text>
                  <Text className="text-[11px] text-yellow-600 mt-1">
                    ⭐ {item.rating} • Sold {item.sold}
                  </Text>
                  <View className="flex-row items-center mt-1">
                    <Text className="text-[14px] font-semibold text-black mr-2">
                      {item.price}
                    </Text>
                    <Text className="text-[12px] line-through text-[#bcbcbc]">
                      {item.originalPrice}
                    </Text>
                    <View className="ml-2 bg-red-500 px-2 rounded">
                      <Text className="text-[10px] text-white font-bold">
                        {item.discount}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Cart Icon */}
                <TouchableOpacity className="justify-center items-center ml-2">
                  <CartIcons width={28} height={28} color="#0AAD55" />
                </TouchableOpacity>
              </View>
            ))
          )}
          <View className="mt-2">
            <RecomendationCard />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default WishlistScreen;
