import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams, useRouter } from 'expo-router';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import api from '@/utils/api/api';
import { formatPrice } from '@/utils/format-currency/currency';
//components
import SearchHeader from '@/components/ui/e-commerce/search/search-header';
import ProductCard from '@/components/ui/e-commerce/card-product';
//icons
import Location2Icons from '@/assets/icons/e-commerce/locations2-icons';
import ChevronDownIcon from '@/assets/icons/e-commerce/chevrondown-icons';
import ChevronUpDown from '@/assets/icons/e-commerce/chevron-up-down-icon';
import { FunnelIcon } from 'lucide-react-native';

const ListSearchProduct = () => {
  const [activeTab, setActiveTab] = useState('Related');
  const [priceOrder, setPriceOrder] = useState<'asc' | 'desc' | null>(null);
  const { query: paramQuery } = useLocalSearchParams();
  const queryString = Array.isArray(paramQuery)
    ? paramQuery[0]
    : paramQuery || '';
  const [query, setQuery] = useState(queryString);
  const [dataProduct, setDataProduct] = useState<any[]>([]);

  const fetchListProduct = async () => {
    const response = await api.get('/ecommerce/products/');
    return response.data;
  };

  // Query
  const {
    data: listProduct,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['listProduct'],
    queryFn: fetchListProduct,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (listProduct?.results) {
      setDataProduct(listProduct.results || []);
    }
  }, [listProduct]);

  const topTabs = ['Related', 'Best Seller', 'Price'];
  const filters = ['Filter', 'Instan', 'COD', 'Promo', 'Rating'];

  const handleTabPress = (tab: string) => {
    if (tab === 'Price') {
      // toggle ascending/descending
      if (priceOrder === 'asc') {
        setPriceOrder('desc');
      } else if (priceOrder === 'desc') {
        setPriceOrder(null);
        setActiveTab('Related'); // reset ke default kalau ditekan 3x
      } else {
        setPriceOrder('asc');
      }
      setActiveTab('Price');
    } else {
      setActiveTab(tab);
      setPriceOrder(null);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <SearchHeader query={query} setQuery={setQuery} />
      <View className="px-4 flex-row items-center">
        <Location2Icons width={24} height={24} />

        <Text style={{ color: '#afafaf', fontSize: 12 }}> Ship To</Text>
        <Text
          style={{
            fontWeight: 600,
            fontSize: 12,
            color: '#1f1f1f',
            marginLeft: 6,
          }}
        >
          Mambaus Solihin
        </Text>
        <View style={{ marginLeft: 10, marginTop: 6 }}>
          <ChevronDownIcon width={20} height={20} color="#1f1f1f" />
        </View>
      </View>
      {/* Tab Filter Atas */}
      <View
        style={{ borderBottomWidth: 1, borderColor: '#E9E9E9', marginTop: 16 }}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ paddingHorizontal: 12 }}
        >
          {topTabs.map(tab => (
            <TouchableOpacity
              key={tab}
              onPress={() => handleTabPress(tab)}
              style={{ marginLeft: 24 }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: activeTab === tab ? '600' : '400',
                    color: activeTab === tab ? '#169953' : '#787878',
                    marginRight: tab === 'Price' ? 4 : 0,
                  }}
                >
                  {tab}
                </Text>

                {tab === 'Price' && <ChevronUpDown width={18} height={18} />}
              </View>

              {activeTab === tab && (
                <View
                  style={{
                    height: 2,
                    backgroundColor: '#169953',
                    marginTop: 4,
                    borderRadius: 2,
                  }}
                />
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Filter Baris Kedua */}
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: 12,
          paddingHorizontal: 16,
        }}
      >
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {filters.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 16,
                paddingVertical: 8,
                marginRight: 8,
                backgroundColor: item === 'Filter' ? '#fff' : '#f4f4f4',
                borderWidth: 1,
                borderColor: item === 'Filter' ? '#E9E9E9' : '#fff',
                borderRadius: 8,
              }}
              onPress={() => console.log(item)}
            >
              {item === 'Filter' && (
                <FunnelIcon
                  width={14}
                  height={14}
                  color="#4B5563"
                  style={{ marginRight: 6 }}
                />
              )}
              <Text
                style={{
                  fontSize: 13,
                  color: item === 'Filter' ? '#4B5563' : '#169953',
                  fontWeight: '500',
                }}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Konten Produk  */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16, // kanan kiri seragam
          paddingTop: 8,
          paddingBottom: 80,
        }}
      >
        <View className="flex-row flex-wrap justify-between">
          {dataProduct.map(item => {
            return (
              <View key={item.uuid} className="w-1/2 px-1 mb-1">
                <ProductCard
                  image={{ uri: item.image }}
                  name={item.name}
                  discount={item.discount || ''}
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
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ListSearchProduct;
