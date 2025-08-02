import BackIcons from '@/assets/icons/global/back-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  FlatList,
  TextInput,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import api from '@/utils/api/api';
import { useUserLocation } from '@/store/location/location';
import { useInfiniteQuery } from '@tanstack/react-query';

type City = {
  id: number;
  name: string;
};

type CityResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: City[];
};

const fetchCities = async ({
  pageParam = '/location/cities/',
  queryKey,
}: any) => {
  const [, searchQuery] = queryKey;
  const url = pageParam.includes('?')
    ? `${pageParam}&search=${encodeURIComponent(searchQuery)}`
    : `${pageParam}?search=${encodeURIComponent(searchQuery)}`;

  const res = await api.get(url);
  return res.data;
};

export default function LocationCityScreen() {
  const insets = useSafeAreaInsets();
  const { selectedCountry, setSelectedCountry } = useUserLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [displayedCities, setDisplayedCities] = useState<City[]>([]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['countries', searchQuery],
    queryFn: fetchCities,
    initialPageParam: '/location/countries/',
    getNextPageParam: lastPage => {
      if (!lastPage?.next) return undefined;
      return lastPage.next.replace(/^https?:\/\/[^/]+/, '');
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data) {
      const flatData = data.pages.flatMap(page => page.results);

      let result = [...flatData];
      // Jangan tambahkan selectedCity jika sedang mencari (ada input pencarian)
      if (!searchQuery && selectedCountry) {
        const exists = result.find(c => c.id === selectedCountry.id);
        if (!exists) {
          result = [selectedCountry, ...result];
        } else {
          result = [
            selectedCountry,
            ...result.filter(c => c.id !== selectedCountry.id),
          ];
        }
      }

      setDisplayedCities(result);
    }
  }, [data, selectedCountry]);

  const handleSelect = (item: City) => {
    setSelectedCountry({
      ...item,
      createdAt: new Date().toISOString(),
    });
    router.back();
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <View className="px-4">
        {/* Header */}
        <View className="flex-row items-center mb-4">
          <TouchableOpacity className="mr-3" onPress={() => router.back()}>
            <BackIcons size={20} />
          </TouchableOpacity>
          <Text style={{ fontSize: 20, fontWeight: '600', color: '#1F1F1F' }}>
            Location
          </Text>
        </View>

        {/* Search Input */}
        <TextInput
          placeholder="Search city..."
          value={searchQuery}
          onChangeText={text => {
            setSearchQuery(text);
          }}
          onSubmitEditing={() => {
            setDisplayedCities([]); // reset local state
            refetch(); // refetch based on query
          }}
          style={{
            padding: 12,
            borderWidth: 1,
            borderColor: '#ddd',
            borderRadius: 8,
            marginBottom: 12,
          }}
        />

        {/* City List */}
        {isError ? (
          <Text style={{ color: 'red' }}>Error loading cities</Text>
        ) : isLoading ? (
          <ActivityIndicator size="large" color="#999" />
        ) : (
          <FlatList
            data={displayedCities}
            keyExtractor={item => item.id.toString()}
            onEndReached={() => {
              if (hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
              }
            }}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              isFetchingNextPage ? (
                <ActivityIndicator size="small" color="#999" className="my-2" />
              ) : null
            }
            renderItem={({ item }) => (
              <TouchableOpacity
                className="py-3 border-b border-gray-200"
                onPress={() => handleSelect(item)}
              >
                <Text className="text-base text-gray-800">{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
