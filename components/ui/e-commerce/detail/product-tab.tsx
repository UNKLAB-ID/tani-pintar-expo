import { formatPrice } from '@/utils/format-currency/currency';
import {
  ChevronDownIcon,
  SlidersHorizontal,
  Clock8Icon,
  LayoutGridIcon,
  Star,
} from 'lucide-react-native';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2;

const ProductTab = () => {
  const products = [
    {
      id: 1,
      name: 'H&L Semprotan Sprayer Manual [2 Liter]',
      price: 28800,
      originalPrice: 36000,
      discount: 20,
      image: require('@/assets/images/trash/image25.png'),
      rating: 4.6,
      sold: 500,
    },

    {
      id: 2,
      name: 'H&L Semprotan Sprayer Manual [2 Liter]',
      price: 200000,
      originalPrice: 250000,
      discount: 15,
      image: require('@/assets/images/trash/image25.png'),
      rating: 4.8,
      sold: 89,
    },
    {
      id: 3,
      name: 'H&L Semprotan Sprayer Manual [2 Liter]',
      price: 200000,
      originalPrice: 250000,
      discount: 15,
      image: require('@/assets/images/trash/image25.png'),
      rating: 4.8,
      sold: 89,
    },
    {
      id: 4,
      name: 'H&L Semprotan Sprayer Manual [2 Liter]',
      price: 200000,
      originalPrice: 250000,
      discount: 15,
      image: require('@/assets/images/trash/image25.png'),
      rating: 4.8,
      sold: 89,
    },
  ];

  // Dummy countdown (misal 12 jam)
  const [timeLeft, setTimeLeft] = useState(12 * 60 * 60); // 12 jam = 43200 detik

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Format HH:MM:SS
  const formatTime = (seconds: any) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-4">
        <View className="flex-row gap-x-3">
          <TouchableOpacity className="border border-[#D3D3D3] flex-row py-2 px-4 rounded-full">
            <SlidersHorizontal size={20} color="#000" />
            <Text className="text-[14px] ml-2">Filter</Text>
          </TouchableOpacity>
          <TouchableOpacity className="border border-[#D3D3D3] flex-row py-2 px-4 rounded-full">
            <Text className="text-[14px] ml-2">Recomendation</Text>
            <ChevronDownIcon size={20} color="#000" />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-between my-3">
          <Text className="text-[16px] font-semibold text-[#787878]">
            {products.length} Product{products.length > 1 ? 's' : ''}
          </Text>
          <TouchableOpacity>
            <LayoutGridIcon size={24} color="#787878" />
          </TouchableOpacity>
        </View>

        <View className="flex-row flex-wrap justify-between">
          {products.map(product => (
            <TouchableOpacity
              key={product.id}
              className="bg-white mb-4 rounded-lg"
              style={{ width: cardWidth }}
            >
              {/* Product Image */}
              <Image
                source={product.image}
                className="rounded-lg"
                style={{
                  width: '100%',
                  height: 176,
                }}
                resizeMode="cover"
              />

              {/* Product Title */}
              <Text
                className="text-[14px] font-semibold mt-2"
                numberOfLines={2}
              >
                {product.name}
              </Text>

              {/* Price Section */}
              <View className="flex-row items-center mt-1">
                <Text className="mr-1 text-[16px] font-bold">
                  {formatPrice(Number(product.price))}
                </Text>

                <Text className="text-[12px] text-gray-400 line-through">
                  {formatPrice(Number(product.originalPrice))}
                </Text>
                <View className="p-1 bg-[#FF0808] rounded-md ml-1">
                  <Text className="text-[12px] text-white font-semibold">
                    {product.discount}%
                  </Text>
                </View>
              </View>

              {/* Flash Sale Countdown */}
              <View className="flex-row items-center mt-1">
                <View
                  className="flex-row items-center rounded-md overflow-hidden"
                  style={{
                    borderWidth: 1,
                    borderColor: '#FF3939',
                  }}
                >
                  {/* Kotak icon */}
                  <View
                    className="items-center justify-center bg-[#FFE5E5]"
                    style={{
                      paddingHorizontal: 6,
                      paddingVertical: 2,
                      borderRightWidth: 1,
                      borderColor: '#FF3939',
                      backgroundColor: '#FFF0F0',
                    }}
                  >
                    <Clock8Icon size={12} color="#FF3939" />
                  </View>

                  {/* Waktu */}
                  <Text
                    style={{ color: '#FF3939' }}
                    className="text-[14px] font-semibold px-2"
                  >
                    {formatTime(timeLeft)}
                  </Text>
                </View>
              </View>

              <View className="flex-row items-center mt-1">
                <Star size={16} color="#facc15" fill="#facc15" />
                <Text className="text-[14px] text-gray-500">
                  {product.rating} • {product.sold} sold
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default ProductTab;
