import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ActivityIndicator,
  ImageSourcePropType,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import api from '@/utils/api/api';
//icons
import SearchIconPrimary from '@/assets/icons/global/search-icons';
//components
import OtherOption from '@/components/ui/e-commerce/other-option';
import EmptyState from '@/components/ui/e-commerce/search/empty-state';
import SearchHeader from '@/components/ui/e-commerce/search/search-header';
import RecomendationCard from '@/components/ui/e-commerce/card-recomendation';
import {
  searchHistory as searchHistoryUtil,
  SearchHistoryItem,
} from '@/utils/storage/searchHistory';
import { X, Clock } from 'lucide-react-native';

interface Product {
  uuid: string;
  name: string;
  image?: ImageSourcePropType;
  prices?: { price: number }[];
  discount?: number;
  rating?: number;
  lokasi?: { name: string };
}

// Debounce hook
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);

  // Debounce search query
  const debouncedQuery = useDebounce(query, 300);

  // Load search history on mount
  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const items = await searchHistoryUtil.getHistory();
    setHistory(items);
  };

  const handleRemoveHistoryItem = async (historyQuery: string) => {
    await searchHistoryUtil.removeFromHistory(historyQuery);
    await loadHistory();
  };

  const handleClearHistory = async () => {
    await searchHistoryUtil.clearHistory();
    setHistory([]);
  };

  const handleHistoryItemPress = (historyQuery: string) => {
    setQuery(historyQuery);
  };

  // Fetch product suggestions from API
  const { data: suggestions, isLoading } = useQuery({
    queryKey: ['productSuggestions', debouncedQuery],
    queryFn: async () => {
      if (!debouncedQuery.trim()) return [];
      const res = await api.get(
        `/ecommerce/products/?search=${encodeURIComponent(debouncedQuery)}&page_size=10`
      );
      if (res.success && res.data?.results) {
        return res.data.results as Product[];
      }
      return [];
    },
    enabled: debouncedQuery.trim().length > 0,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  // Fetch recommended products (popular/trending)
  const { data: recommendedProducts } = useQuery({
    queryKey: ['recommendedProducts'],
    queryFn: async () => {
      const res = await api.get('/ecommerce/products/?page_size=3');
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
            : require('../../assets/images/trash/image18.png'),
        }));
      }
      return [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Fetch popular products for Other Options section
  const { data: popularProducts, isLoading: popularLoading } = useQuery({
    queryKey: ['popularProducts'],
    queryFn: async () => {
      const res = await api.get('/ecommerce/products/?page_size=4');
      if (res.success && res.data?.results) {
        return res.data.results.map((item: Product) => ({
          id: item.uuid,
          title: item.name,
          seller: item.lokasi?.name || 'Tani Pintar',
          image: item.image
            ? { uri: item.image }
            : require('@/assets/images/trash/image18.png'),
        }));
      }
      return [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: '#f8f8f8' }}
      edges={['top', 'left', 'right']}
    >
      <View className="bg-[#f8f8f8] ">
        <SearchHeader
          query={query}
          setQuery={setQuery}
          onBack={() => router.replace('/(tabs)/ecommerce')}
        />
      </View>

      {/* Suggestion List */}
      <ScrollView className="flex-1">
        {/* Recent Search */}
        {query.trim() === '' && history.length > 0 && (
          <View className="bg-white py-4 px-2 rounded-xl mt-3">
            <View className="flex-row justify-between items-center mb-3 px-2">
              <Text className="text-black text-base font-semibold">
                Search History
              </Text>
              <TouchableOpacity onPress={handleClearHistory}>
                <Text className="text-red-500 text-[13px]">Clear All</Text>
              </TouchableOpacity>
            </View>

            <View className="flex flex-wrap flex-row gap-2 px-2">
              {history.map((item, idx) => (
                <View
                  key={idx}
                  className="flex-row items-center bg-[#F4F4F4] px-3 py-2 rounded-2xl"
                >
                  <Clock size={14} color="#787878" />
                  <TouchableOpacity
                    onPress={() => handleHistoryItemPress(item.query)}
                    className="ml-2"
                  >
                    <Text className="text-black text-[14px]">{item.query}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleRemoveHistoryItem(item.query)}
                    className="ml-2"
                  >
                    <X size={14} color="#787878" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        )}
        {query.trim() === '' && (
          <View className="mt-4">
            <OtherOption
              items={popularProducts}
              isLoading={popularLoading}
              title="Popular Products"
            />
          </View>
        )}

        {/* Hasil pencarian */}
        {query.trim() !== '' && (
          <View className="mt-4">
            {isLoading ? (
              <View className="py-4 items-center">
                <ActivityIndicator size="small" color="#169953" />
              </View>
            ) : suggestions && suggestions.length > 0 ? (
              <FlatList
                data={suggestions}
                keyExtractor={item => item.uuid}
                scrollEnabled={false}
                renderItem={({ item }) => {
                  const name = item.name;
                  const lowerName = name.toLowerCase();
                  const lowerQuery = query.toLowerCase();
                  const startIndex = lowerName.indexOf(lowerQuery);

                  let beforeMatch = name;
                  let matchText = '';
                  let afterMatch = '';

                  if (startIndex !== -1) {
                    beforeMatch = name.slice(0, startIndex);
                    matchText = name.slice(
                      startIndex,
                      startIndex + query.length
                    );
                    afterMatch = name.slice(startIndex + query.length);
                  }

                  return (
                    <TouchableOpacity
                      className="flex-row items-center py-3 px-4 bg-white border-b border-gray-100"
                      onPress={() =>
                        router.push({
                          pathname: '/e-commerce/search/list-search-product',
                          params: { query: item.name },
                        })
                      }
                    >
                      <SearchIconPrimary className="mr-4" />
                      <Text className="text-[14px] text-[#1F1F1F] ml-2 flex-1">
                        {beforeMatch}
                        <Text className="font-bold text-[#169953]">
                          {matchText}
                        </Text>
                        {afterMatch}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            ) : !isLoading && debouncedQuery.trim() ? (
              <EmptyState
                onPressButton={() => {
                  setQuery('');
                }}
              />
            ) : null}
          </View>
        )}

        {/* Recommendation */}
        {query.trim() !== '' &&
          suggestions &&
          suggestions.length > 0 &&
          recommendedProducts &&
          recommendedProducts.length > 0 && (
            <View className="mt-4">
              <RecomendationCard
                products={recommendedProducts}
                title="Recommended for You"
              />
            </View>
          )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchPage;
