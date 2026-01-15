import React, { useEffect, useState, useCallback } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { useInfiniteQuery } from '@tanstack/react-query';
import api from '@/utils/api/api';
import { formatPrice } from '@/utils/format-currency/currency';
import {
  searchHistory,
  SearchHistoryItem,
} from '@/utils/storage/searchHistory';
//components
import SearchHeader from '@/components/ui/e-commerce/search/search-header';
import ProductCard from '@/components/ui/e-commerce/card-product';
import AddressSelector from '@/components/ui/e-commerce/search/address-selector';
import CardSearchStore from '@/components/ui/e-commerce/search/list-search-store';
import FilterChip from '@/components/ui/e-commerce/search/filter-chip';
//icons
import ChevronUpDown from '@/assets/icons/e-commerce/chevron-up-down-icon';
import { X, Clock } from 'lucide-react-native';

const ListSearchProduct = () => {
  const [activeTab, setActiveTab] = useState('Related');
  const [priceOrder, setPriceOrder] = useState<'asc' | 'desc' | null>(null);
  const { query: paramQuery } = useLocalSearchParams();
  const queryString = Array.isArray(paramQuery)
    ? paramQuery[0]
    : paramQuery || '';
  const [query, setQuery] = useState(queryString);
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);

  // Load search history on mount and when navigating back
  useEffect(() => {
    loadHistory();
  }, [queryString]);

  const loadHistory = async () => {
    const items = await searchHistory.getHistory();
    setHistory(items);
  };

  const handleHistoryItemPress = async (historyQuery: string) => {
    setQuery(historyQuery);
    await searchHistory.addToHistory(historyQuery);
    await loadHistory();
  };

  const handleRemoveHistoryItem = async (historyQuery: string) => {
    await searchHistory.removeFromHistory(historyQuery);
    await loadHistory();
  };

  const handleClearHistory = async () => {
    await searchHistory.clearHistory();
    setHistory([]);
  };

  // Show history only when there's no active search query
  const showHistory = history.length > 0 && !query.trim();

  const fetchListProduct = async ({ pageParam }: { pageParam?: string }) => {
    const endpoint = pageParam || '/ecommerce/products/';
    const response = await api.get(endpoint);
    return response.data;
  };

  // Query
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
  } = useInfiniteQuery({
    queryKey: ['listProduct'],
    queryFn: fetchListProduct,
    initialPageParam: '/ecommerce/products/',
    getNextPageParam: lastPage => {
      if (!lastPage.next) return null;
      return lastPage.next.replace(/^https?:\/\/[^/]+/, '');
    },
    refetchOnWindowFocus: false,
  });

  const allProduct = data?.pages.flatMap(page => page.results) || [];

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage]);
  const topTabs = ['Related', 'Best Seller', 'Price'];
  const filters = ['Filter', 'Instan', 'COD', 'Promo', 'Rating'];

  const handleTabPress = (tab: string) => {
    if (tab === 'Price') {
      // toggle ascending/descending
      if (priceOrder === 'asc') {
        setPriceOrder('desc');
      } else if (priceOrder === 'desc') {
        setPriceOrder(null);
        setActiveTab('Related');
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
      <SearchHeader
        query={query}
        setQuery={setQuery}
        onBack={() => router.replace('/e-commerce/search')}
      />
      <AddressSelector
        address="Mambaus Solihin"
        onSelect={() => {
          /* Handle address selection */
        }}
      />

      {/* Search History */}
      {showHistory && (
        <View className="px-4 py-3 bg-white">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-[15px] font-semibold text-gray-800">
              Search History
            </Text>
            <TouchableOpacity onPress={handleClearHistory}>
              <Text className="text-[13px] text-red-500">Clear All</Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row flex-wrap">
            {history.map((item, index) => (
              <View
                key={`history-${index}`}
                className="flex-row items-center bg-gray-100 rounded-full px-3 py-2 mr-2 mb-2"
              >
                <Clock size={14} color="#787878" />
                <TouchableOpacity
                  onPress={() => handleHistoryItemPress(item.query)}
                  className="ml-2"
                >
                  <Text className="text-[13px] text-gray-700">{item.query}</Text>
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

      <View
        style={{ borderBottomWidth: 1, borderColor: '#E9E9E9', marginTop: showHistory ? 0 : 16 }}
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

      <View
        style={{
          flexDirection: 'row',
          paddingVertical: 12,
          paddingHorizontal: 16,
        }}
      >
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {filters.map((item, index) => (
            <FilterChip key={index} label={item} />
          ))}
        </ScrollView>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        onScrollEndDrag={handleLoadMore}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 8,
          paddingBottom: 80,
        }}
      >
        <CardSearchStore
          logo="data:image/png;base64,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"
          store="H&L Official"
          rating={4.6}
          reviews={500}
          location="Kota Tangerang"
          onPress={() => console.log('Go to store detail')}
        />

        <View className="flex-row flex-wrap justify-between">
          {allProduct.map(item => {
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
