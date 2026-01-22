import {
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import CartIcons from '@/assets/icons/e-commerce/cart-icons';
import BackIcons from '@/assets/icons/global/back-icons';
import RecomendationCard from '@/components/ui/e-commerce/card-recomendation';
import StarIcons from '@/assets/icons/e-commerce/stars-icons';
import LocationRedIcon from '@/assets/icons/e-commerce/locations-red-icons';
import TrashIcon from '@/assets/icons/e-commerce/trash-icons';
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
  const { source } = useLocalSearchParams<{ source?: string }>();

  const handleBack = () => {
    if (source === 'profile') {
      router.replace('/(tabs)/profile');
    } else {
      router.replace('/(tabs)/ecommerce');
    }
  };
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
        <ScrollView
          className=" bg-white"
          contentContainerStyle={{ paddingBottom: 100 }}
        >
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
                className="relative flex-row bg-white mb-1 p-3"
              >
                {/* Image */}
                <Image
                  source={item.image}
                  className="w-[114px] h-[114px] rounded-md"
                  resizeMode="contain"
                />

                {/* Info */}
                <View className="flex-1 ml-3 justify-between">
                  {/* Category */}
                  <Text className="text-[16px] text-[#169953] font-semibold">
                    {item.category}
                  </Text>

                  {/* Title */}
                  <Text
                    className="text-[12px] font-semibold text-black"
                    numberOfLines={2}
                  >
                    {item.title}
                  </Text>

                  {/* Location */}
                  <View className="flex-row items-center mt-1">
                    <LocationRedIcon width={16} height={16} />
                    <Text className="text-[12px] text-gray-500 ml-1">
                      {item.location}
                    </Text>
                  </View>

                  {/* Rating */}
                  <View className="flex-row items-center mt-1">
                    <StarIcons width={16} height={16} />
                    <Text className="text-[12px] text-[#7D7D7D] ml-1">
                      {item.rating} • Sold {item.sold}
                    </Text>
                  </View>

                  {/* Price, Discount & Cart */}
                  <View className="flex-row items-center mt-2">
                    {/* Harga */}
                    <View className="flex-col mr-2">
                      <Text className="text-[16px] font-semibold text-black">
                        {item.price}
                      </Text>
                      <Text className="text-[14px] mt-1 line-through text-[#bcbcbc]">
                        {item.originalPrice}
                      </Text>
                    </View>

                    {/* Diskon */}
                    <View className="bg-[#FF0808] px-2 p-1 rounded-2xl justify-center">
                      <Text className="text-[10px] text-white font-bold">
                        {item.discount}
                      </Text>
                    </View>

                    {/* CartIcon mentok kanan bawah sejajar diskon */}
                    <TouchableOpacity className="ml-auto rounded-full p-3 bg-primary">
                      <CartIcons width={18} height={18} color="#fff" />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* TrashIcon mentok kanan atas sejajar category */}
                <TouchableOpacity className="absolute right-3 top-3">
                  <TrashIcon width={24} height={24} />
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
