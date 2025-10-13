import {
  ChevronDownIcon,
  SlidersHorizontal,
  Clock8Icon,
  LayoutGridIcon,
  StretchHorizontal,
  RectangleVertical,
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
import { formatPrice } from '@/utils/format-currency/currency';
import ModaFilterStore from '../checkout/modal-filter-store';
import ModalShowRecomendation from '../checkout/modal-show-recomendation';

const { width } = Dimensions.get('window');
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

const ProductTab = () => {
  const [layoutMode, setLayoutMode] = useState<'grid4' | 'grid2' | 'list'>(
    'grid2'
  );
  const [timeLeft, setTimeLeft] = useState(12 * 60 * 60);
  const [showModal, setShowModal] = useState(false);
  const [showModalRecomendation, setShowModalRecomendation] = useState(false);

  // Timer countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  // Tentukan lebar card
  const getCardWidth = () => {
    if (layoutMode === 'grid4') return (width - 32) / 1;
    if (layoutMode === 'grid2') return (width - 48) / 2;
    return width - 32;
  };
  const getImageStyle = () => {
    switch (layoutMode) {
      case 'list':
        return { width: (width - 64) / 4, height: 90, borderRadius: 8 };
      case 'grid2':
        return { width: (width - 48) / 2, height: 160, borderRadius: 8 };
      case 'grid4':
        return { width: 366, height: 366, borderRadius: 8, marginRight: 12 };
      default:
        return {};
    }
  };

  // Hitung style card berdasarkan layout mode
  const getCardStyle = () => {
    switch (layoutMode) {
      case 'grid4':
        return {
          width: (width - 64) / 1,
          flexDirection: 'column' as const,
          alignItems: 'flex-start' as const,
          marginBottom: 16,
        };
      case 'grid2':
        return {
          width: (width - 48) / 2,
          flexDirection: 'column' as const,
          alignItems: 'flex-start' as const,
          marginBottom: 20,
        };
      case 'list':
        return {
          width: width - 32,
          flexDirection: 'row' as const,
          alignItems: 'center' as const,
          marginBottom: 20,
        };
      default:
        return {};
    }
  };

  // Ganti layout berurutan: grid4 → grid2 → list → grid4
  const handleSwitchLayout = () => {
    if (layoutMode === 'grid4') setLayoutMode('grid2');
    else if (layoutMode === 'grid2') setLayoutMode('list');
    else setLayoutMode('grid4');
  };

  // Tampilkan ikon sesuai layout AKTIF
  const renderLayoutIcon = () => {
    if (layoutMode === 'grid2') {
      return <LayoutGridIcon size={24} color="#000" />;
    } else if (layoutMode === 'grid4') {
      return <RectangleVertical size={24} color="#000" />;
    } else {
      return <StretchHorizontal size={24} color="#000" />;
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-4">
        {/* Filter & Sort */}
        <View className="flex-row gap-x-3">
          <TouchableOpacity
            onPress={() => setShowModal(true)}
            className="border border-[#D3D3D3] flex-row py-2 px-4 rounded-full"
          >
            <SlidersHorizontal size={20} color="#000" />
            <Text className="text-[14px] ml-2">Filter</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setShowModalRecomendation(true)}
            className="border border-[#D3D3D3] flex-row py-2 px-4 rounded-full"
          >
            <Text className="text-[14px] ml-2">Recomendation</Text>
            <ChevronDownIcon size={20} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Product Count & Layout Switcher */}
        <View className="flex-row justify-between items-center my-3">
          <Text className="text-[16px] font-semibold text-[#787878]">
            {products.length} Product{products.length > 1 ? 's' : ''}
          </Text>

          <TouchableOpacity onPress={handleSwitchLayout}>
            {renderLayoutIcon()}
          </TouchableOpacity>
        </View>

        {/* Product Grid */}
        <View
          className="flex-row flex-wrap justify-between"
          style={{
            justifyContent:
              layoutMode === 'list' ? 'flex-start' : 'space-between',
          }}
        >
          {products.map(product => (
            <TouchableOpacity
              key={product.id}
              className="bg-white rounded-lg"
              style={getCardStyle()}
              activeOpacity={0.8}
            >
              <Image
                source={product.image}
                style={getImageStyle()}
                resizeMode="cover"
              />

              <View
                style={{
                  flex: 1,
                  paddingRight: layoutMode === 'list' ? 10 : 0,
                }}
              >
                <Text
                  className="text-[14px] font-semibold mt-2"
                  numberOfLines={2}
                >
                  {product.name}
                </Text>

                <View className="flex-row items-center mt-1">
                  <Text className="mr-1 text-[16px] font-bold">
                    {formatPrice(product.price)}
                  </Text>
                  <Text className="text-[12px] text-gray-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </Text>
                  <View className="p-1 bg-[#FF0808] rounded-md ml-1">
                    <Text className="text-[12px] text-white font-semibold">
                      {product.discount}%
                    </Text>
                  </View>
                </View>

                <View className="flex-row items-center mt-1">
                  <View
                    className="flex-row items-center rounded-md overflow-hidden"
                    style={{
                      borderWidth: 1,
                      borderColor: '#FF3939',
                    }}
                  >
                    <View
                      className="items-center justify-center"
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
                  <Text className="text-[14px] text-gray-500 ml-1">
                    {product.rating} • {product.sold} sold
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <ModaFilterStore
        visible={showModal}
        onReset={() => {
          // Add your reset logic here
        }}
        onClose={() => setShowModal(false)}
      />
      <ModalShowRecomendation
        visible={showModalRecomendation}
        onClose={() => setShowModalRecomendation(false)}
      />
    </ScrollView>
  );
};

export default ProductTab;
